FROM mcr.microsoft.com/devcontainers/typescript-node:dev-22

WORKDIR /workspaces

RUN corepack enable && corepack prepare pnpm --activate

RUN apt-get update && apt-get install -y git curl vim
