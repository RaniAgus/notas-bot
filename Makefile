TAG := raniagus/notas-bot
IDS != docker ps | grep $(TAG) | awk '{ print $$1 }'

all: build run

build:
	docker build . --rm -t $(TAG)

run:
	docker run --rm --init --env-file=./.env -p3000:3000 --name=notas_bot $(TAG)

down:
	-docker rmi $(TAG)
	-docker image prune

exec:
	docker exec -it $(word 1,$(IDS)) /bin/ash

logs:
	docker logs $(word 1,$(IDS)) -f

.PHONY: all build run stop down exec logs
