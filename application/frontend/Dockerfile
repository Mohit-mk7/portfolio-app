# Build Stage
FROM node:18-alpine as build

WORKDIR /app
COPY . .

# Accept env var during build
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm install
RUN npm run build

# Serve Stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
