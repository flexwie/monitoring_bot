FROM node:18 as build
ARG target
USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm install

RUN npm run build:prisma
RUN npm run build -- ${target}

FROM node:18-alpine as prod
ARG target
ENV NODE_ENV production
ENV TARGET ${target}
USER node

RUN echo $TARGET

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist