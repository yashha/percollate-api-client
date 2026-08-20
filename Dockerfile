FROM node:26-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
	pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM nginx:stable-alpine AS runtime

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx \
	&& touch /var/run/nginx.pid \
	&& chown nginx:nginx /var/run/nginx.pid

USER nginx
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
