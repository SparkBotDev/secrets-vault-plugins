import { SecretsVault } from './interface.ts';

export class SecretsVaultPlugin extends SecretsVault {
	async get(key: string) {
		const value = Bun.env[key];
		if (value) return value;

		throw new Error(
			`Key ${key} cannot be retrieved from environment variables.`,
		);
	}
}

export default SecretsVaultPlugin;
