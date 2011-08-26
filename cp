#!/bin/bash
# Copyright(c) gert.cuykens@gmail.com

ADMIN='gert:passwd'
REV=`curl -sIX HEAD http://$ADMIN@localhost:5984/${1%/*}`
MIME=`file -ib $1`
REQ='PUT'

if [[ $REV =~ Etag:\ \"(.*)\" ]]; then
 curl -X $REQ http://$ADMIN@localhost:5984/$1?rev=${BASH_REMATCH[1]} -H "Content-Type: ${MIME%%;*}" --data-binary @$1
 else
 curl -X $REQ http://$ADMIN@localhost:5984/$1 -H "Content-Type: ${MIME%%;*}" --data-binary @$1
fi

