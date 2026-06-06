# BUILDER STAGE
FROM node:20-alpine AS builder

ARG APP_NAME

WORKDIR /app

RUN npm install -g pnpm@8.15.0

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all share packages package.json files
COPY packages/shared-store/package.json packages/shared-store/
COPY packages/shared-assets/package.json packages/shared-assets/
COPY packages/shared-api/package.json packages/shared-api/
COPY packages/shared-types/package.json packages/shared-types/
COPY packages/shared-utils/package.json packages/shared-utils/
COPY packages/shared-hooks/package.json packages/shared-hooks/
COPY packages/ui/package.json packages/ui/
COPY packages/icons/package.json packages/icons/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/tailwind-config/package.json packages/tailwind-config/
COPY packages/eslint-config/package.json packages/eslint-config/

# Copy shell package.json file
COPY apps/${APP_NAME}/package.json apps/${APP_NAME}/

# Install dependencies with verbose output
RUN pnpm install

# Copy source code
COPY apps/${APP_NAME} apps/${APP_NAME}
COPY packages packages

# Build
RUN pnpm turbo run build --filter=${APP_NAME}


# Production Stage
FROM nginx:alpine AS production

ARG APP_NAME

# RUN apk add --no-cache curl

# Copy built assets
COPY --from=builder /app/apps/${APP_NAME}/dist /usr/share/nginx/html
COPY apps/${APP_NAME}/nginx.conf /etc/nginx/conf.d/default.conf


# Copy shared package assets (if any)
RUN mkdir -p /usr/share/nginx/html/assets

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]