def min(a, b):
    if a > b:
        return b
    else:
        return a

a = input("Inpit first number : ")
b = input("Input Second number : ")

print("{} vs {} : Min number = {}".format(a, b, min(a,b)))