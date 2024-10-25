###################################################
# Stage: base
FROM node:20 AS base
WORKDIR /usr/local/app

################## CLIENT STAGES ##################
###################################################
# Stage: client-base
FROM base AS client-base

# Copy package.json and yarn.lock files
COPY ./package.json ./yarn.lock ./

# Install dependencies
RUN yarn install 

# Verify installation
RUN ls -la ./node_modules/.bin

# Copy the rest of the application files
COPY ./.eslintrc.cjs ./index.html ./vite.config.js ./
COPY ./public ./public
COPY ./src ./src

###################################################
# Stage: client-dev
FROM client-base AS client-dev
RUN yarn add vite
# Start the development server
CMD ["yarn", "start:dev"]
