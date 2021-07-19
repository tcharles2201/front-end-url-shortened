build\:init:
	docker build -f Dockerfile.init -t my/react .	

init:
	docker run --rm -ti -v `pwd`:/app -w /app my/react create-react-app url_shortener

install:
	docker run --rm -ti -v `pwd`/url_shortener:/app -w /app my/react npm install $(filter-out $@,$(MAKECMDGOALS))

build\:production:
	docker build -t my/app:production --target production  .

build\:development:
	docker build -t my/app:development --target development  .

run\:production:
	docker run --rm -ti -p 80:80 my/app:production

run\:development:
	docker run --rm -ti -v `pwd`/url_shortener:/app -w /app -p 3000:3000 my/app:development
