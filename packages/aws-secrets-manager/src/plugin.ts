import { SecretsVault } from '@sparkbot/plugin-secrets';
import {
	SecretsManagerClient,
	GetSecretValueCommand,
	type GetSecretValueCommandOutput,
} from '@aws-sdk/client-secrets-manager';
import * as v from 'valibot';

const SecretsSchema = v.record(v.string(), v.string());

export class SecretsVaultPlugin extends SecretsVault {
	secrets: Promise<GetSecretValueCommandOutput>;

	constructor(override readonly options: { secretName: string }) {
		super();
		const client = new SecretsManagerClient({
			region: 'us-east-1',
		});
		this.secrets = client.send(
			new GetSecretValueCommand({
				SecretId: options.secretName, // eslint-disable-line @typescript-eslint/naming-convention
				VersionStage: 'AWSCURRENT', // eslint-disable-line @typescript-eslint/naming-convention
			}),
		);
	}

	async get(key: string) {
		let secrets: GetSecretValueCommandOutput;
		try {
			secrets = await this.secrets;
		} catch (exception) {
			throw new Error('AWS Secrets Manager Error', { cause: exception });
		}

		if (secrets.SecretString) {
			const parsedSecrets = v.safeParse(
				SecretsSchema,
				JSON.parse(secrets.SecretString),
			);
			if (parsedSecrets.success && parsedSecrets.output[key]) {
				return parsedSecrets.output[key];
			}

			throw new Error('Invalid Secret Format');
		}

		throw new Error('Invalid Secret Format');
	}
}

export default SecretsVaultPlugin;
