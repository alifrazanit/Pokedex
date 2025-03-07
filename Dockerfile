# Stage 1: Build Angular App
FROM node:18 AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Setup Nginx untuk Serve Angular App
FROM nginx:alpine
COPY --from=build-stage /app/dist/pokedex /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]