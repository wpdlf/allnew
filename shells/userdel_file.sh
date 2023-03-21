#!/bin/bash

input="user.dat"

while IFS=',' read -r username uid gid comment
do
	echo "Delete $username"
	userdel -r "$username"
done < $input
