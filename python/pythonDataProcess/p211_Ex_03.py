import numpy as np
import pandas as pd
from pandas import DataFrame, Series

df = pd.read_csv('과일매출현황.csv', index_col=0)
print('\n# 원본 데이터프레임')
print(df)

print('\n# 누락데이터 채워 넣기')
df.loc[df['구입액'].isnull(), '구입액'] = 50.0
df.loc[df['수입량'].isnull(), '수입량'] = 20.0
print(df)

print('\n# 구입액과 수입량의 각 소계')
print(df.sum(axis=0))

print('\n# 과일별 소계')
print(df.sum(axis=1))

print('\n# 구입액과 수입량의 평균')
print(df.mean(axis=0))

print('\n# 과일별 평균')
print(df.mean(axis=1))
