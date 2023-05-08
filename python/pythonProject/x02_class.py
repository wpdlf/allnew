import random

data = random.sample(range(1, 101), 10)
class findMax(object):
    def __init__(self, data):
        self.data = data
    def max(self):
        max_num = 0
        for i in range(len(self.data)):
            if max_num < self.data[i]:
                max_num = self.data[i]
        return max_num

print(data)
data1 = findMax(data)
print(f'Max number is : {data1.max()}')