build:
	git checkout master data.json
	git checkout master lib/filename.js

bootstrap:
	./node_modules/.bin/boots --all -o bootstrap

preview:
	python -m SimpleHTTPServer

install:
	npm install boots

.PHONY: build install bootstrap preview
