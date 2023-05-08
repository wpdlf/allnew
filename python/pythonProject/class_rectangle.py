class Rectangle(object):
    count = 0

    def __init__(self, height, width):
        self.height = height
        self.width = width
        Rectangle.count += 1

    def __add__(self, other):
        obj = Rectangle(self.width + other.width, self.height + other.height)
        return obj

    def isSquare(sq_h, sq_w):
        return sq_h == sq_w

    def calcArea(self):
        return self.height * self.width

    def printCount(cls):
        print(cls.count)

