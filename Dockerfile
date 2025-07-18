# ----- Build Stage -----
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# ----- Serve Stage -----
FROM python:3.11-alpine
WORKDIR /app
COPY --from=build /app/build ./build
EXPOSE 8080
CMD ["sh", "-c", "echo Starting Python HTTP server on port $PORT && python3 -m http.server $PORT --directory build"]
