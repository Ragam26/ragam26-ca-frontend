FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PORT=5000
ENV HOSTNAME=0.0.0.0

EXPOSE 5000

CMD ["npm", "start"]
