# Spark⚡️Bot - Secrets vault plugins

<div align="center">
    <a href="https://bun.sh"><img alt="Runs on Bun" src="https://img.shields.io/badge/Runs%20on%20Bun-%23E37AB4?style=flat&logo=bun&logoColor=%23F9F1E1&logoSize=auto&labelColor=%232F2F2F" height=30></a>&nbsp;
    <a href="https://discord.js.org"><img alt=" Built with discord.js" src="https://github.com/SparkBotDev/.github/raw/main/assets/images/discordjs-badge.svg" height=30></a>&nbsp;
    <a href="https://github.com/xojs/xo"><img alt="XO code style" src="https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray" height=30></a>&nbsp;
</div>
<div align="center">
    <img src="https://github.com/SparkBotDev/.github/raw/main/assets/images/readme-banner.png" alt="">
</div>

[Spark⚡️Bot](https://github.com/SparkBotDev/SparkBot) has an extensible plugin interface that allows developers to integrate their preferred tooling and libraries. This repository contains the officially developed secrets vault plugins. Each plugin has a readme containing instructions on how to use it with Spark⚡️Bot.

We are very interested in extending the plugins available for Spark⚡️Bot. If you develop a plugin for a secrets management system, we would love for you to submit a PR to this repo, either adding a link to your plugin below or adding the plugin here as an official plugin.

<div align="center">
    <a href="https://discord.gg/J3FYK8VmrA"><img alt="Get help on Discord" src="https://img.shields.io/discord/1250847505566929037?logo=discord&logoColor=white&label=Get%20Help&labelColor=%235761E1&color=%2350545B" height=30></a>
</div>

## Plugin list

### Official

- [@sparkbot/plugin-secrets](./packages/base/#readme) - Default plugin, reads values from environment variables.

### 3rd party

## Contributing

Contributions make Spark⚡️Bot even more dynamic and powerful. Whether you're an experienced developer or just starting out, your ideas, code, and feedback are invaluable. Join our community and help us shape the future of Discord bot development. Together, we can ignite sparks of innovation and elevate the Discord experience for everyone.

Creating a secrets vault plugin requires extending the SecretsVault class from the @sparkbot/plugin-secrets package. When Spark⚡️Bot initializes your class it passes in an options object from the config, and expects a method `get(key: string) => Promise<string>` which returns the value of a requested key.

This project is released under the terms of the MIT License, which allows for freedom in use and modification. We encourage collaboration and welcome contributions from the community to make Spark⚡️Bot even better!
