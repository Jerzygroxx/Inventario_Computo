FROM node:22-alpine AS build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
RUN apk add --no-cache gettext
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD sh -c "sed -i 's/__BACKEND_HOST__/'"\$BACKEND_HOST"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
