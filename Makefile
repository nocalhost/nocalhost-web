.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## install dependencies
	@yarn

dev: ## run dev server
	@yarn start

build: ## build src to dist
	@yarn build

build-docker: ## build docker image
	@docker build -t nocalhost-web .

clean: ## remove build directory
	rm -fr build
