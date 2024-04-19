FROM node:15

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install typescript -g

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
