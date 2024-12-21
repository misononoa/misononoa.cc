FROM mcr.microsoft.com/devcontainers/typescript-node:dev-22

WORKDIR /workspaces

RUN apt-get update && apt-get install -y git curl vim openssh-client
RUN npm -g install pnpm