import random

data = random.sample(range(1, 101), 10)

def findMax(data):
    max_num = 0
    for i in range(len(data)):
        if max_num < data[i]:
            max_num = data[i]
    return max_num

print(data)
print(f'Max number is : {findMax(data)}')