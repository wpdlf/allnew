import numpy as np
from pandas import Series, DataFrame

myindex = ['윤봉길', '김유신', '신사임당']
mylist = [30, 40, 50]

myindex2 = ['윤봉길', '김유신', '이순신']
mycolumns = ['용산구', '마포구', '서대문구']
mylist2 = list(3 * onedata for onedata in range(1, 10))

myindex3 = ['윤봉길', '김유신', '이완용']
mycolumns2 = ['용산구', '마포구', '은평구']
mylist3 = list(5 * onedata for onedata in range(1, 10))

myseries = Series(data=mylist, index=myindex)
print('\nmyseries')
print(myseries)

myframe = DataFrame(np.reshape(np.array(mylist2), (3, 3)), index=myindex2, columns=mycolumns)
print('\nmyframe')
print(myframe)

myframe2 = DataFrame(np.reshape(np.array(mylist3), (3, 3)), index=myindex3, columns=mycolumns2)
print('\nmyframe2')
print(myframe2)

print('\nDataframe + Series')
result = myframe.add(myseries, axis=0)
print(result)

print('\nDataframe + Dataframe')
result = myframe.add(myframe2, fill_value=20)
print(result)

print('\nDataframe - Dataframe')
result = myframe.sub(myframe2, fill_value=10)
print(result)