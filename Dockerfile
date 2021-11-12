FROM node:14.0.0-alpine as builder

WORKDIR /code
ENV SASS_BINARY_SITE https://npm.taobao.org/mirrors/node-sass/
RUN npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass && \
    yarn config set registry https://registry.npm.taobao.org/
COPY package.json /code
RUN npm install

COPY . /code
RUN npm run build

FROM nginx:alpine
COPY --from=builder /code/dist /usr/share/nginx/html
COPY --from=builder /code/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /code/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
