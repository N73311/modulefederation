# Multi-stage build for Module Federation
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
# Copy yarn.lock if it exists (will be regenerated if not)
COPY yarn.lock* ./

# Copy all package.json files
COPY packages/auth/package*.json ./packages/auth/
COPY packages/container/package*.json ./packages/container/
COPY packages/dashboard/package*.json ./packages/dashboard/
COPY packages/marketing/package*.json ./packages/marketing/

# Install all dependencies (yarn will create lock file if missing)
RUN yarn install --network-timeout 1000000

# Copy source code
COPY . .

# Build all packages
RUN cd packages/auth && npm run build
RUN cd packages/marketing && npm run build
RUN cd packages/dashboard && npm run build
RUN cd packages/container && npm run build

# Production stage - serve static files with nginx
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/packages/container/dist /usr/share/nginx/html
COPY --from=builder /app/packages/auth/dist /usr/share/nginx/html/auth
COPY --from=builder /app/packages/marketing/dist /usr/share/nginx/html/marketing
COPY --from=builder /app/packages/dashboard/dist /usr/share/nginx/html/dashboard

# Custom nginx config for module federation
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
        add_header Access-Control-Allow-Origin *; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80