#!/bin/bash

input="/etc/passwd"
cnt=1

while IFS=':' read -r username pw uid gid comment home shell
do
	echo "$cnt : $username - $uid - $gid - $home - $shell"
	let cnt+=1
done < $input
