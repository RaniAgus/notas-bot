FROM oven/bun:1 AS base

FROM base AS build

WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile --production
COPY . ./

RUN bun build src/index.ts \
  --compile \
  --target=bun-linux-x64-modern \
  --minify \
  --sourcemap \
  --outfile notas-bot

FROM cgr.dev/chainguard/glibc-dynamic AS release

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/notas-bot ./

ENTRYPOINT ["./notas-bot"]
