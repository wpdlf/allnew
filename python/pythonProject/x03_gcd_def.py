a = int(input("Input First number : "))
b = int(input("Input Second number : "))

def gcd(a, b):
    print(f"gcd({a}, {b})")
    while True:
        namuzi = a % b
        a = b
        b = namuzi
        print(f"gcd({a}, {b})")

        if namuzi == 0:
            return a
            break

print(f"gcd({a}, {b}) of {a}, {b} : {gcd(a, b)}")