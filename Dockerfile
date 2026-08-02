FROM node:22-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends openjdk-17-jre-headless \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY config ./config
COPY test ./test

CMD ["npm", "run", "test:docker"]
