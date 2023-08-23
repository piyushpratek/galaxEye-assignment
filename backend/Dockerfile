FROM node

WORKDIR /usr/app

COPY . .
RUN npm ci && npm run build

EXPOSE 5000

CMD ["npm", "start"]