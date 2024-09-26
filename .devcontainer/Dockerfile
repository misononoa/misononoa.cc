# Chat-GPTで生成(2024-09-07)

# ベースイメージ
FROM node:22-bookworm-slim

# 作業ディレクトリを設定
WORKDIR /workspace

# corepackを有効化してpnpmを使用可能にする
RUN corepack enable && corepack prepare pnpm --activate

# 必要なツールをインストール（例: git, curl）
RUN apt-get update && apt-get install -y git curl vim
