import pandas as pd

df = pd.read_csv('seoul.csv')
print(df)

result = df.loc[(df['시군구'] == ' 서울특별시 강남구 신사동')]
print(result)

result = df.loc[(df['시군구'] == ' 서울특별시 강남구 신사동') & (df['단지명'] == '삼지')]
print(result)


newdf = df.set_index(keys=['도로명'])
print(newdf)

result = newdf.loc['동일로']
count = len(result)
print(result)
print('count :', count)