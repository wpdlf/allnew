import json, pandas as pd
import matplotlib.pyplot as plt
# import googlemaps
from geopy.geocoders import Nominatim

plt.rcParams['font.family'] = 'Malgun Gothic'

with open('sensor_data_exam.json') as f:
    js = json.loads(f.read())
# print(js['DATA'])

full_df = pd.DataFrame(js['DATA'])
pd.set_option('display.max_rows', None)

# print(df[['autonomous_district', 'administrative_district', 'max_noise', 'min_noise', 'avg_noise', 'sensing_time']])

my_df = full_df[['autonomous_district', 'administrative_district', 'region', 'max_noise', 'min_noise', 'avg_noise', 'sensing_time']].replace('', 0)

print(my_df)
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


sensing_time_rough = my_df[['sensing_time']].values
for i in range(1, 32):
    for _ in range(len(sensing_time_rough)):
        if sensing_time_rough[_][0].replace("-", "")[:8] == f'202305{i}':
            my_df.loc[_, 'sensing_time'] = f'202305{i}'

print(my_df[my_df['autonomous_district'] == 'Gangnam-gu'].head(18914))
print('-' * 50)

myframe = my_df[my_df['autonomous_district'] == 'Gangnam-gu']

newframe = myframe.groupby('sensing_time').get_group('20230517')

print(newframe.groupby('administrative_district').get_group('Yeoksam1-dong').drop_duplicates())
print(len(newframe.groupby('administrative_district').get_group('Yeoksam1-dong').drop_duplicates()))

myf = newframe.groupby('administrative_district').get_group('Yeoksam1-dong').drop_duplicates()
myf_roads_and_parks = myf.groupby('region').get_group('roads_and_parks')
myf_residential_area = myf.groupby('region').get_group('residential_area')
myf_main_street = myf.groupby('region').get_group('main_street')
print(myf)
print(len(myf))




address = myframe['administrative_district'].str.replace('1', '').str.replace('2', '').str.replace('3', '').str.replace('4', '')
print(address)

geo_local = Nominatim(user_agent='South Korea')
def geocoding(address):
    try:
        geo = geo_local.geocode(address)
        x_y = [geo.latitude, geo.longitude]
        return x_y
    except:
        return [0,0]

latitude = []
longitude = []

for i in address:
    latitude.append(geocoding(i)[0])
    longitude.append(geocoding(i)[1])

addr_df = pd.DataFrame({'동': myframe['administrative_district'], 'lat': latitude, 'lng': longitude})
print(addr_df)