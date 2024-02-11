erd:
	mmdc -s 3 -b '#242424' -i doc/diagram/erd.mmd -o "./erd.png"

dep:
	pnpm i

dev: watch

build:
	pnpm next build

lint:
	pnpm next lint

format:
	pnpm exec prettier -w .

format-check:
	pnpm exec prettier -c .

watch:
	pnpm next dev

watch-erd:
	./watch.sh erd
