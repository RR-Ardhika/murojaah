APP_NAME = murojaah
OUTPUT_DIR = dist
ROOT_DIR = $(realpath .)

.PHONY: erd
erd:
	mmdc -s 3 -b '#242424' -i doc/diagram/erd.mmd -o "./erd.png"

.PHONY: dep
dep:
	pnpm i

.PHONY: dev
dev:
	-$(MAKE) stop
	$(MAKE) clean
	NODE_ENV=development pnpm next dev

.PHONY: run
run: dev

.PHONY: clean
clean:
	rm -rf $(OUTPUT_DIR)

.PHONY: build
build: clean
	pnpm next build

.PHONY: start
start:
	docker run -d -p 3000:80 \
		-v $(ROOT_DIR)/dist:/usr/share/nginx/html \
		-v $(ROOT_DIR)/nginx.conf:/etc/nginx/conf.d/default.conf \
		--name $(APP_NAME) --rm nginx

.PHONY: stop
stop:
	docker container stop $(APP_NAME)

.PHONY: prod
prod:
	-$(MAKE) stop
	$(MAKE) build
	$(MAKE) start

.PHONY: lint
lint:
	pnpm next lint

.PHONY: lint-fix
lint-fix:
	pnpm next lint --fix

.PHONY: format
format:
	pnpm exec prettier -w .

.PHONY: format-check
format-check:
	pnpm exec prettier -c .

.PHONY: watch
watch: dev

.PHONY: watch-erd
watch-erd:
	./watch.sh erd
