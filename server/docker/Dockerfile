FROM node:21 
WORKDIR /app
ENV DATABASE_URL=$DATABASE_URL
COPY ./package*.json ./
COPY ./tsconfig.json ./
RUN npm install 
COPY ./ ./ 

RUN npm run build 
RUN npx prisma generate
CMD [ "npm", "run", "start:dev" ]