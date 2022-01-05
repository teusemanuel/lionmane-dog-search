# Build front end
FROM node:latest AS build

RUN npm install -g @angular/cli

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install
RUN ng build --configuration production

# Deploy front end on nginx
FROM nginx:alpine AS server
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/lionmane-dog-search-web /usr/share/nginx/html
