# build environment
FROM node:12.18.1-alpine as build
WORKDIR /app
ARG GIT_COMMIT_SHA
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn config set "strict-ssl" false
RUN yarn
COPY . ./
RUN yarn build

# production environment
FROM nginx:1.21-alpine
ENV TZ="Asia/Shanghai"
COPY --from=build /app/build /usr/share/nginx/html
