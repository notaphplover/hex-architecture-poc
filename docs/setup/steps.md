# Setting up the project.

This document explains how to set up the project.

## Requirements

1. Install NodeJs ^16. Consider [nvm](https://github.com/nvm-sh/nvm) if you are interested in managing multiple nodeJs versions.
2. Install pnpm ^7. Consider adding it to you node binary as a global dependency: `npm i -g pnpm`.

## Steps to setup the local environment:

1. Clone this project.
2. Setup a `.env` file in the root of the project. Consider `.env.example` as reference.
3. Install its dependencies: `pnpm ci`.
4. Build source code: `pnpm run build`.
5. launch the azure functions: `func start --port <YOUR-FAVOURITE-PORT>`. If your CosmosDb database has a self signed certificate, consider allowing insecure HTTPS connections through the node `NODE_TLS_REJECT_UNAUTHORIZED` env variable: `NODE_TLS_REJECT_UNAUTHORIZED=0 func start --port <YOUR-FAVOURITE-PORT>`.
