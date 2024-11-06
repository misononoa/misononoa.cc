FROM node:22-bookworm-slim

WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm --activate

RUN apt-get update && apt-get install -y git curl vim
