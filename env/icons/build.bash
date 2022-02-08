#!/bin/bash
# uses inkscape, 7z and svgo
set -e

SRC=vectors
CWD=${BASH_SOURCE%/*}
OUT=$(realpath ./src/file/icons)

cd ${CWD}
rm -rf ${SRC}; mkdir ${SRC}
rm -rf ${OUT}; mkdir ${OUT}

inkscape --export-type=tar ${SRC}.svg 

set +e
7z x -o${SRC} ${SRC}.tar; rm ${SRC}.tar

svgo \
	--config svgo.config.js \
	--folder ${SRC} \
	--output ${OUT} \
	--precision 0 \
	--pretty \
	--indent 2 \
	--final-newline