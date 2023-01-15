FROM node:18 as build
ARG target
ARG db
ENV DATABASE_URL ${db}
USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm install

RUN npx prisma@dev generate
RUN npm run build -- ${target}

FROM node:18-alpine as prod
ARG target
# ENV NODE_ENV production
ENV TARGET ${target}
USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist