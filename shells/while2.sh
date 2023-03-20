#!/bin/bash

a=1

while [ $a != "0" ]; do
	echo -n "input : "
	read a

	if [ $a != "0" ]; then
		if [[ $a -gt 1 ]] && [[ $a -lt 10 ]]; then
			for ((k=1; k<=9; k++)) do
				echo " $a * $k = `expr $a \* $k `"
				done
		else
			echo "The number of inputs must be between 2 and 9."
		fi
	fi
done
echo Exit

