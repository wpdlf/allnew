#!/usr/bin/env python

numbers = [0, 1, 2, 3]
names = ["Kim", "Lee", "Park", "Choi"]
print(numbers[0])
print(names[2:])
print(numbers[-1])
print(numbers + names)

empty = []
print(empty)

names.append("Jeong")
print(names)

names.insert(1, "Gang")
print(names)

del names[1]
print(names)

names.remove("Jeong")
print(names)

value = names.pop()
print(value)

value = names.pop(1)
print(value)

numbers.extend([4, 5, 6, 4, 4, 5 ,6])
print(numbers)

print(numbers.count(4))

numbers.sort()
print(numbers)

numbers.reverse()
print(numbers)

numbers.clear()
print(numbers)

