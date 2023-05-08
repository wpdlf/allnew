a = int(input("Input the First Number : "))
b = int(input("Input the Second Number : "))

#a, b = map(int, input("Input two Numbers : ").split())

max_value = a if a > b else b

print(f"Max is {max_value}")