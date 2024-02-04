watch-erd:
	./watch.sh erd

erd:
	mmdc -s 3 -b '#242424' -i doc/diagram/erd.mmd -o "./erd.png"
