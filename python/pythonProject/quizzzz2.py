import p27_generator

mynum = [1,2,3,4,5]
nums = []

for i in range(len(mynum)):
    nums.append(mynum[p27_generator.timer.__next__()])
    print(f'Square value of mynum[{i}] = {mynum[i]} : {mynum[i] ** 2}')