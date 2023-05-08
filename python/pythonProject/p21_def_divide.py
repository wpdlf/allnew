a, b = map(int, input("Input two numbers : ").split())

def func(a, b):
    return (a // b, a % b)

print(f'Input number : {a} / {b}')
print(f'Quotient : {func(a, b)[0]}')
print(f'Remainder : {func(a, b)[1]}')
