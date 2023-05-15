import pandas as pd

afile = 'data03.csv'
bfile = 'data04.csv'

atable = pd.read_csv(afile, header=0, encoding='utf-8')
btable = pd.read_csv(bfile, header=0, encoding='utf-8')

print(atable)
print('-' * 50)
print(btable)
print('-' * 50)

atable['반'] = '일반'
btable['반'] = '이반'

mylist = []
mylist.append(atable)
mylist.append(btable)

result = pd.concat(objs=mylist, axis=0, ignore_index=True)
print(result)
print('-' * 50)
result = result.drop(index=7)
print(result)
filename = 'Ex_p352_01.csv'
result.to_csv(filename, encoding='utf-8')
print(filename + ' Saved...')