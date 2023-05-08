import prime_func

while True:
    num = int(input("Input number(0 : Quit) : "))
    if num == 0:
        break
    else:
        if prime_func.prime_func(num) == 1:
            print('{} is {}'.format(num, "prime number"))
        else:
            print('{} is {}'.format(num, "not prime number"))
