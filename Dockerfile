# build environment
FROM node:12.18.1-alpine as build
WORKDIR /app
ARG GIT_COMMIT_SHA
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
ARG --from=build GIT_COMMIT_SHA
ENV GIT_COMMIT_SHA $GIT_COMMIT_SHA
COPY ./env.sh .
RUN chmod +x env.sh
EXPOSE 80
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]