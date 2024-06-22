/**
 * Defines the interface of a secrets vault plugin.
 */
export interface ISecretsVault {
	get: (key: string) => Promise<string>;
}

/**
 * Abstract class that a secrets plugin must extend.
 */
export abstract class SecretsVault implements ISecretsVault {
	constructor(protected options: object = {}) {}

	abstract get(key: string): Promise<string>;
}
