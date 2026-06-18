FROM node:24.17.0-alpine AS builder

WORKDIR /build

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run docs:build

FROM nginx:1.29.3

COPY --from=builder /build/docs/.vitepress/dist /usr/share/nginx/html

COPY robots.txt /usr/share/nginx/html/robots.txt

COPY default.conf /etc/nginx/conf.d/default.conf
