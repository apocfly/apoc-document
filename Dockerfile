FROM node:24.17.0-alpine AS builder

WORKDIR /build

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run docs:build

FROM nginx:1.29.3

COPY --from=builder /build/docs/.vitepress/dist /usr/share/nginx/html

COPY robots.txt /usr/share/nginx/html/robots.txt

COPY default.conf /etc/nginx/conf.d/default.conf
