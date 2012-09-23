build: bootstrap
	git checkout origin/master dist
	git checkout origin/master data.json
	git checkout origin/master lib/filename.js

bootstrap:
	./node_modules/.bin/boots --all -o bootstrap

preview:
	python -m SimpleHTTPServer

install:
	npm install boots

.PHONY: build install bootstrap preview
