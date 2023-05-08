import random

num = random.randint(4, 17)
ezin = []

def binary_digits(num):
    while True:
        ezin.append(num % 2)
        if num // 2 == 0:
            break
        num = num // 2

    for i in range(len(ezin)-1, -1, -1):
        print(ezin[i], end=" ")

print(f'{num} binary number is :', end=" ")
binary_digits(num)
