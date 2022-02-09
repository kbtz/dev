#!/bin/bash
# uses inkscape, 7z and svgo

SET=menu
PWD0=${PWD}
CWD=${BASH_SOURCE%/*}
SRC=$(realpath ${CWD}/${SET}.svg)
OUT=$(realpath ./src/file)/${SET}.icons.json

cd ${CWD}
set -e

rm -rf ${SET}; mkdir ${SET}
inkscape --export-type=tar ${SRC}

set +e
7z x -o${SET} ${SET}.tar; rm ${SET}.tar

cd ${SET}
set -e

cat <<JSON > svgo.config.json
{
	"plugins": [
		{
			"name": "preset-default",
			"params": {
				"overrides": {
					"removeViewBox": false
				}
			}
		}
	]
}
JSON

svgo \
	--folder . \
	--precision 0 \
	--pretty \
	--indent 2 \
	--final-newline

node <<JS > ${OUT}
const
	body = {
		viewBox: $(sed -nE 's,.*viewBox=("[^"]*").*,\1,p' ${SRC}),
		paths: {
			$(for ICON in *.svg; do
				echo ${ICON%.*}: [ \
				 $(sed -nE 's,.* d=("[^"]*").*,\1\,,p' ${ICON}) \
				],
			done)
		}
	},
	output = JSON.stringify(body, null, 2)

console.log(output)
JS

cd ..; rm -r ${SET}
cd ${PWD0}