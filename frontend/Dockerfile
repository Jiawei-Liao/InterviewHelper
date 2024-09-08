FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install @mui/material @emotion/react @emotion/styled @babel/plugin-proposal-private-property-in-object

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD ["start"]