# Spark⚡️Bot - Azure KeyVault secrets vault plugin

<div align="center">
    <a href="https://bun.sh"><img alt="Runs on Bun" src="https://img.shields.io/badge/Runs%20on%20Bun-%23E37AB4?style=flat&logo=bun&logoColor=%23F9F1E1&logoSize=auto&labelColor=%232F2F2F" height=30></a>&nbsp;
    <a href="https://discord.js.org"><img alt=" Built with discord.js" src="https://github.com/SparkBotDev/.github/raw/main/assets/images/discordjs-badge.svg" height=30></a>&nbsp;
    <a href="https://valibot.dev"><img alt="Validates with Valibot" src="https://github.com/SparkBotDev/.github/raw/main/assets/images/valibot-badge.svg" height=30></a>&nbsp;
    <a href="https://github.com/xojs/xo"><img alt="XO code style" src="https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray" height=30></a>&nbsp;
</div>
<div align="center">
    <img src="https://github.com/SparkBotDev/.github/raw/main/assets/images/readme-banner.png" alt="">
</div>

@sparkbot/plugin-secrets-azure implements Azure KeyVault storage for [Spark⚡️Bot](https://github.com/SparkBotDev/SparkBot) secrets management.

<div align="center">
    <a href="https://discord.gg/J3FYK8VmrA"><img alt="Get help on Discord" src="https://img.shields.io/discord/1250847505566929037?logo=discord&logoColor=white&label=Get%20Help&labelColor=%235761E1&color=%2350545B" height=30></a>
</div>

## Usage

1. Install the plugin `bun add @sparkbot/plugin-secrets-azure`
2. Update `sparkbot.config.ts`:

```ts
secretsVaultPlugin: {
	prod: {
		module: '@sparkbot/plugin-secrets-azure',
		options: { vaultURL: 'https://YOUR-VAULT-NAME.vault.azure.net/ },
	},
	dev: {
		module: '@sparkbot/plugin-secrets',
	},
},
```

> [!NOTE]
> Per Microsoft engineers, the Vault URL is not a secret.
