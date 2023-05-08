input = int(input("Input the number : "))

class Factorial(object):
    result = 0
    def __init__(self, input):
        self.input = input

    def factorial(self):
        if self.input == 0:
            return 1
        n = self.input
        self.input -= 1
        return n * self.factorial()

facto = Factorial(input)
print(f'{input} factorial = {facto.factorial()}')