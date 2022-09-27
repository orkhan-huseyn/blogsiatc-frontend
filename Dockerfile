FROM node:alpine as react-build
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html