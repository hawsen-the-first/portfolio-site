ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS builder

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_STRAPI_URL=https://cms.reubenhawthornejensen.dev
ENV VITE_STRAPI_URL=${VITE_STRAPI_URL}

RUN pnpm run build

FROM caddy:2-alpine
COPY --from=builder /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
