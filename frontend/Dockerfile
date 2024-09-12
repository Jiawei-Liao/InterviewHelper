FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install @mui/material @emotion/react @emotion/styled firebase

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD ["start"]