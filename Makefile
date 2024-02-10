erd:
	mmdc -s 3 -b '#242424' -i doc/diagram/erd.mmd -o "./erd.png"

dev: watch

build:
	pnpm next build

lint:
	pnpm next lint

watch:
	pnpm next dev

watch-erd:
	./watch.sh erd
