FROM node:16-alpine
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci 
COPY . .

CMD  npm run dev