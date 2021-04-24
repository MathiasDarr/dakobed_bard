FROM node:14-slim

RUN mkdir /dakobedui
WORKDIR /dakobedui

COPY .npmrc /dakobedui/.npmrc
COPY tsconfig.json /dakobedui/tsconfig.json
COPY package.json /dakobedui

RUN npm install


COPY public /dakobedui/public
COPY src /dakobedui/src

ENV REACT_APP_API_ENDPOINT /api/2/
# RUN npm run build
