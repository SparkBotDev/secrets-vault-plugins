import { SecretsVault } from '@sparkbot/plugin-secrets';
import {
	SecretsManagerClient,
	type BatchGetSecretValueCommandOutput,
	BatchGetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import * as v from 'valibot';
import type { AWSRegions } from './regions';

const SecretsSchema = v.record(
	v.string(),
	v.pipe(v.union([v.string(), v.number()]), v.transform(String)),
);

export class SecretsVaultPlugin extends SecretsVault {
	awsSecretsBatch: Promise<BatchGetSecretValueCommandOutput>;
	cachedSecrets = new Map<string, Map<string, string>>();
	isCached = false;

	constructor(
		override readonly options: { region: AWSRegions; secretIDs: string[] },
	) {
		super();
		const client = new SecretsManagerClient({
			region: options.region,
		});
		this.awsSecretsBatch = client.send(
			new BatchGetSecretValueCommand({
				SecretIdList: options.secretIDs, // eslint-disable-line @typescript-eslint/naming-convention
			}),
		);
	}

	async get(key: string): Promise<string> {
		const requestedKey = key.split('/').at(-1);
		const requestedSecret = key.split('/').slice(0, -1).join('/');
		if (!requestedKey || !requestedSecret)
			throw new Error('Invalid key format');

		// If secrets from AWS have already been cached use them.
		if (this.isCached) {
			if (this.cachedSecrets.has(requestedSecret)) {
				const value = this.cachedSecrets
					.get(requestedSecret)
					?.get(requestedKey);
				if (value) {
					return value;
				}
			}

			throw new Error(`Secret ${key} not found in secret cache`);
		}

		// Wait for the secrets to be fetched from AWS and then cache them.
		const awsSecrets = await this.awsSecretsBatch;
		if (awsSecrets.Errors && awsSecrets.Errors?.length > 0)
			throw new Error(
				`Error fetching secrets from AWS: ${JSON.stringify(awsSecrets.Errors)}`,
			);

		for (const awsSecret of awsSecrets.SecretValues ?? []) {
			if (awsSecret.Name && awsSecret.SecretString) {
				const values = v.parse(
					SecretsSchema,
					JSON.parse(awsSecret.SecretString),
				);

				this.cachedSecrets.set(awsSecret.Name, new Map(Object.entries(values)));
				this.isCached = true;
			}
		}

		if (this.cachedSecrets.has(requestedSecret)) {
			const value = this.cachedSecrets.get(requestedSecret)?.get(requestedKey);
			if (value) {
				return value;
			}
		}

		throw new Error(`Secret ${key} not found in secret cache`);
	}
}

export default SecretsVaultPlugin;
