.PHONY: erd
erd:
	mmdc -s 3 -b '#242424' -i doc/diagram/erd.mmd -o "./erd.png"

.PHONY: dep
dep:
	pnpm i

.PHONY: dev
dev: watch

.PHONY: build
build:
	pnpm next build

.PHONY: lint
lint:
	pnpm next lint

.PHONY: format
format:
	pnpm exec prettier -w .

.PHONY: format-check
format-check:
	pnpm exec prettier -c .

.PHONY: watch
watch:
	pnpm next dev

.PHONY: watch-erd
watch-erd:
	./watch.sh erd
