while True:
    n = input("input number (q : quit) : ")
    if n == 'q':
        print("Exit")
        break
    else:
        dan = int(n)
        if dan < 2 or dan > 9:
            print("Input 2 ~ 9 number!!")
        else:
            for i in range(1, 10):
                print(dan, "*", i, "=", (dan*i))