class Calculate(object):
    def __init__(self, first, second):
        self.first = first
        self.second = second

    def add(self):
        return self.first + self.second

    def sub(self):
        return self.first - self.second

    def mul(self):
        return self.first * self.second

    def div(self):
        if self.second == 0:
            self.second = 5
        return self.first / self.second

calc = Calculate(14, 0)

print(f'add result : {calc.add()}')
print(f'sub result : {calc.sub()}')
print(f'mul result : {calc.mul()}')
print(f'div result : %.3f' % calc.div())