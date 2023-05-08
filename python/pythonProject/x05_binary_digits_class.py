import random

num = random.randint(4, 17)

class Binary_digits(object):
    ezin = []
    result = []
    def __init__(self, num):
        self.num = num

    def covert(self):
        while True:
            self.ezin.append(self.num % 2)
            if self.num // 2 == 0:
                break
            self.num = self.num // 2

        for i in range(len(self.ezin)-1, -1, -1):
            self.result.append(self.ezin[i])
        return self.result

binary = Binary_digits(num)
print(f'{num} binary number is : {binary.covert()}')
