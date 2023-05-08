def handler():
    print("Initialize Handler")
    while True:
        num1, num2 = (yield)
        print(f"{num1} + {num2} = {num1 + num2}")

listener = handler()
listener.__next__()
listener.send([5, 4])
listener.send([3, 6])