import { SecretsVault } from '@sparkbot/plugin-secrets';
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

export class SecretsVaultPlugin extends SecretsVault {
	client: SecretClient;

	constructor(override readonly options: { vaultURL: string }) {
		super();
		const credential = new DefaultAzureCredential();
		this.client = new SecretClient(options.vaultURL, credential);
	}

	async get(key: string) {
		const secret = await this.client.getSecret(key);
		if (secret.value) {
			return secret.value;
		}

		throw new Error(`Azure Key Vault is missing value for ${secret.name}`);
	}
}

export default SecretsVaultPlugin;
