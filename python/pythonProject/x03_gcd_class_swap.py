a = int(input("Input First number : "))
b = int(input("Input Second number : "))

class Gcd(object):
    def __init__(self, a, b):
        self.a = a
        self.b = b

    def gcd(self):
        if self.a > self.b: self.a, self.b = b, a
        while True:
            namuzi = self.a % self.b
            self.a = self.b
            self.b = namuzi
            print(f"gcd({self.a}, {self.b})")

            if namuzi == 0:
                return self.a
                break
        print(f"gcd({self.a}, {self.b})")

result1 = Gcd(a, b)
print(f"gcd({a}, {b}) of {a}, {b} : {result1.gcd()}")