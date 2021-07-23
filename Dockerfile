FROM node as react
WORKDIR /app
ADD url_shortener/ /app

FROM react as staging
RUN rm -rf node_modules && npm install -g npm && npm install && npm run build

FROM nginx as production
RUN echo "hello world"
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=staging /app/build/ /usr/share/nginx/html

FROM react as development
CMD npm start
