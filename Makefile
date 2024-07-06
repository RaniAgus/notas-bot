TAG := raniagus/notas-bot
IDS != docker ps | grep $(TAG) | awk '{ print $$1 }'

all: build run

build:
	docker build . --rm -t $(TAG)

run:
	docker run -d --init --env-file=./.env --name=notas_bot $(TAG)

stop:
	-docker stop notas_bot
	-docker container rm notas_bot

down: stop
	-docker rmi $(TAG)
	-docker image prune

exec:
	docker exec -it $(word 1,$(IDS)) /bin/ash

logs:
	docker logs $(word 1,$(IDS)) -f

.PHONY: all build run stop down exec logs
