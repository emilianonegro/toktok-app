FROM node:16-alpine AS build
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/app/dist/tok-tok /usr/share/nginx/html
