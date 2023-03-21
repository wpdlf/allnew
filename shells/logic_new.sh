#!/bin/bash

opt1=$1
opt2=$2

if [ $# != 2 ]; then
	echo "Input two parameters!!"
elif [ $opt1 == 'test' -a $opt2 == 'aaa' ] || [ $opt1 == 'aaa' -a $opt2 == 'test' ]; then
	echo good
else 
	echo bad
fi

