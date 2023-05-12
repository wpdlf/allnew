import numpy as np
import pandas as pd
from pandas import Series, DataFrame

myindex = ['강감찬', '김유신', '이순신']
mycolumns = ['국어', '영어', '수학']

mydata = [
    [60.00, np.nan, 90.00],
    [np.nan, 80.00, 50.00],
    [40.00, 50.00, np.nan]
]

myframe = DataFrame(data=mydata, index=myindex, columns=mycolumns)
print('\nBefore')
print(myframe)

# myframe.loc[myframe['국어'].isnull(), '국어'] = myframe['국어'].mean()
# myframe.loc[myframe['영어'].isnull(), '영어'] = myframe['영어'].mean()
# myframe.loc[myframe['수학'].isnull(), '수학'] = myframe['수학'].mean()
#
print('\nAfter')
# print(myframe)

# mydict = {
#     '국어' : myframe['국어'].mean(),
#     '영어' : myframe['영어'].mean(),
#     '수학' : myframe['수학'].mean()
# }
#
# myframe.fillna(mydict, inplace=True)

fill_val = myframe.fillna(myframe.mean(axis=0))
print(fill_val)

print('-' * 40)
print(myframe.describe())