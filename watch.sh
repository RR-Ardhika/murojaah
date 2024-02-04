#!/bin/sh

APP_NAME=murojaah

case $1 in
  erd)
    clear
    make erd
    while inotifywait -r -e modify .
      do
        clear
        make erd
    done
    ;;
esac
