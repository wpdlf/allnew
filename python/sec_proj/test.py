import json, pandas as pd
import matplotlib.pyplot as plt

plt.rcParams['font.family'] = 'Malgun Gothic'

with open('sensor_data_exam.json') as f:
    js = json.loads(f.read())
# print(js['DATA'])

full_df = pd.DataFrame(js['DATA'])
pd.set_option('display.max_rows', None)

# print(df[['autonomous_district', 'administrative_district', 'max_noise', 'min_noise', 'avg_noise', 'sensing_time']])

my_df = full_df[['autonomous_district', 'administrative_district', 'region', 'max_noise', 'min_noise', 'avg_noise', 'sensing_time']]

result = my_df.set_index('autonomous_district')
df = my_df.replace('', 0)
# print(df)
print('-' * 50)

# print('# 강남구 max_noise 평균')
# print(df.iloc[:,1].astype(float).mean())
# print('-' * 50)

# print('# 강남구 min_noise 평균')
# print(df.iloc[:,2].astype(float).mean())
# print('-' * 50)

# print('# 강남구 avg_noise 평균')
# print(df.iloc[:,3].astype(float).mean())
# print('-' * 50)


sensing_time_rough = df[['sensing_time']].values
for i in range(1, 32):
    for _ in range(len(sensing_time_rough)):
        if sensing_time_rough[_][0].replace("-", "")[:8] == f'202305{i}':
            df.loc[_, 'sensing_time'] = f'202305{i}'

print(df[df['autonomous_district'] == 'Gangnam-gu'].head(18914))
print('-' * 50)

myframe = df[df['autonomous_district'] == 'Gangnam-gu']
newframe = myframe.groupby('sensing_time').get_group('20230517')

print(newframe.groupby('administrative_district').get_group('Yeoksam1-dong').drop_duplicates())

print(len(newframe.groupby('administrative_district').get_group('Yeoksam1-dong').drop_duplicates()))

myf = newframe.groupby('administrative_district').get_group('Yeoksam1-dong').drop_duplicates()
myf_roads_and_parks = myf.groupby('region').get_group('roads_and_parks')
myf_residential_area = myf.groupby('region').get_group('residential_area')
myf_main_street = myf.groupby('region').get_group('main_street')
print(myf2)
print(len(myf2))

# print(my_df)