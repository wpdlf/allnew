def counter():
    t = [0, 0]
    def increment():
        while True:
            t[1] += 7
            if t[1] > 100:
                break
            t[0] += 1
        return t[0]
    return increment

timer = counter()
print(timer())