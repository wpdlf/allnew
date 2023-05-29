import json, pandas as pd
import matplotlib.pyplot as plt
# import googlemaps
from geopy.geocoders import Nominatim
import os
import sys
import urllib.request
import json
from pprint import pprint

# 바탕화면에 저장된 메모장에서 client id, pw 가져오기
# labels에 id, pw가 리스트 형태로 저장
# file_path = 'C:/Users/BTC-N11/Desktop/papago_api.txt'
# labels = open(file_path).read().splitlines()

client_id = "HfVmgn5t2ERUmJngZKdN"  # 개발자센터에서 발급받은 Client ID 값
client_secret = "lBR7c4nAy7"  # 개발자센터에서 발급받은 Client Secret 값

def ToEn(koText):
    encText = urllib.parse.quote(koText)
    data = "source=ko&target=en&text=" + encText
    url = "https://openapi.naver.com/v1/papago/n2mt"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    if (rescode == 200):
        response_body = response.read()
        result = response_body.decode('utf-8')
        d = json.loads(result)
        # print('--- Korean to English --- ')
        # print('번역전 : ', koText)
        # print('번역후 : ', d['message']['result']['translatedText'])

    else:
        print("Error Code:" + rescode)

def ToKo(egText):
    kocText = urllib.parse.quote(egText)
    data = "source=en&target=ko&text=" + kocText
    url = "https://openapi.naver.com/v1/papago/n2mt"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    if (rescode == 200):
        response_body = response.read()
        result = response_body.decode('utf-8')
        d = json.loads(result)
        # print('--- English to Korean --- ')
        # print('번역전 : ', egText)
        # print('번역후 : ', d['message']['result']['translatedText'])
        return d['message']['result']['translatedText']

    else:
        print("Error Code:" + rescode)

with open('sensor_data_exam.json') as f:
    js = json.loads(f.read())

full_df = pd.DataFrame(js['DATA'])
pd.set_option('display.max_rows', None)

my_df = full_df[['autonomous_district', 'administrative_district', 'region', 'max_noise', 'min_noise', 'avg_noise', 'sensing_time']].replace('', 0).replace('Doksan-dong1', 'Doksan1-dong').replace('Dangsan-dong1', 'Dangsan1-dong').replace('Dangsan-dong2', 'Dangsan2-dong')

myframe = my_df.loc[(my_df.autonomous_district == 'Gangnam-gu') | (my_df.autonomous_district == 'Gwanak-gu') | (my_df.autonomous_district == 'Geumcheon-gu') | (my_df.autonomous_district == 'Yeongdeungpo-gu')]

# 강남구의 전체 동
gangnam_dongs = my_df.loc[(my_df.autonomous_district == 'Gangnam-gu')][['administrative_district']].drop_duplicates()
gangnam_dongs_list = gangnam_dongs.values

# 금천구의 전체 동
geumcheon_dongs = my_df.loc[(my_df.autonomous_district == 'Geumcheon-gu')][['administrative_district']].drop_duplicates()
geumcheon_dongs_list = geumcheon_dongs.values

# 영등포구의 전체 동
yeongdeungpo_dongs = my_df.loc[(my_df.autonomous_district == 'Yeongdeungpo-gu')][['administrative_district']].drop_duplicates()
yeongdeungpo_dongs_list = yeongdeungpo_dongs.values

# 강남구 모든 동의 최대소음
my_df2_gangnam = my_df.loc[(my_df.autonomous_district == 'Gangnam-gu')][['administrative_district', 'max_noise']].replace('', 0)

# 금천구 모든 동의 최대소음
my_df2_geumcheon = my_df.loc[(my_df.autonomous_district == 'Geumcheon-gu')][['administrative_district', 'max_noise']].replace('', 0)

# 영등포구 모든 동의 최대소음
my_df2_yeongdeungpo = my_df.loc[(my_df.autonomous_district == 'Yeongdeungpo-gu')][['administrative_district', 'max_noise']].replace('', 0)


#######################################################소음 평균 구하기 및 좌표변환#######################################################


gangnam_noise_mean = []
gangnam_noise_mean_real = []
gangnam_dong_list_real = []
for i in range(len(gangnam_dongs_list)):
    result = my_df2_gangnam.groupby('administrative_district').get_group(f'{gangnam_dongs_list[i][0]}')
    result.set_index('administrative_district', inplace=True)
    gangnam_noise_mean.append(result.astype(float).mean().values)
    gangnam_noise_mean_real.append(round(gangnam_noise_mean[i][0]))
    # gangnam_dong_list_real.append(ToKo(gangnam_dongs_list[i][0]))
    gangnam_dong_list_real.append(gangnam_dongs_list[i][0])

geumcheon_noise_mean = []
geumcheon_noise_mean_real = []
geumcheon_dong_list_real = []
for i in range(len(geumcheon_dongs_list)):
    result = my_df2_geumcheon.groupby('administrative_district').get_group(f'{geumcheon_dongs_list[i][0]}')
    result.set_index('administrative_district', inplace=True)
    geumcheon_noise_mean.append(result.astype(float).mean().values)
    geumcheon_noise_mean_real.append(round(geumcheon_noise_mean[i][0]))
    # geumcheon_dong_list_real.append(ToKo(geumcheon_dongs_list[i][0]))
    geumcheon_dong_list_real.append(geumcheon_dongs_list[i][0])

yeongdeungpo_noise_mean = []
yeongdeungpo_noise_mean_real = []
yeongdeungpo_dong_list_real = []
for i in range(len(yeongdeungpo_dongs_list)):
    result = my_df2_yeongdeungpo.groupby('administrative_district').get_group(f'{yeongdeungpo_dongs_list[i][0]}')
    result.set_index('administrative_district', inplace=True)
    yeongdeungpo_noise_mean.append(result.astype(float).mean().values)
    yeongdeungpo_noise_mean_real.append(round(yeongdeungpo_noise_mean[i][0]))
    # yeongdeungpo_dong_list_real.append(ToKo(yeongdeungpo_dongs_list[i][0]))
    yeongdeungpo_dong_list_real.append(yeongdeungpo_dongs_list[i][0])

gangnam_df = pd.DataFrame({'동': gangnam_dong_list_real, '소음도': gangnam_noise_mean_real})
print(gangnam_df)
print('-' * 50)
geumcheon_df = pd.DataFrame({'동': geumcheon_dong_list_real, '소음도': geumcheon_noise_mean_real})
print(geumcheon_df)
print('-' * 50)
yeongdeungpo_df = pd.DataFrame({'동': yeongdeungpo_dong_list_real, '소음도': yeongdeungpo_noise_mean_real})
print(yeongdeungpo_df)
print('-' * 50)

gangnam_gu_list = ['강남구'] * len(gangnam_df)
geumcheon_gu_list = ['금천구'] * len(geumcheon_df)
yeongdeungpo_gu_list = ['영등포구'] * len(yeongdeungpo_df)

gangnam_soum_total = gangnam_df[['소음도']].sum().values
gangnam_avg = round(gangnam_soum_total[0] / len(gangnam_dongs))
print('강남 전체 소음 평균 :', gangnam_avg)

geumcheon_soum_total = geumcheon_df[['소음도']].sum().values
geumcheon_avg = round(geumcheon_soum_total[0] / len(geumcheon_dongs))
print('금천 전체 소음 평균 :', geumcheon_avg)

yeongdeungpo_soum_total = yeongdeungpo_df[['소음도']].sum().values
yeongdeungpo_avg = round(yeongdeungpo_soum_total[0] / len(yeongdeungpo_dongs))
print('영등포 전체 소음 평균 :', yeongdeungpo_avg)
print('-' * 50)


address_gangnam = gangnam_df['동']
address_geumcheon = geumcheon_df['동']
address_yeongdeungpo = yeongdeungpo_df['동']

geo_local = Nominatim(user_agent='South Korea')
def geocoding(address):
    try:
        geo = geo_local.geocode(address)
        x_y = [geo.latitude, geo.longitude]
        return x_y
    except:
        return [0,0]

latitude_gangnam = []
longitude_gangnam = []
latitude_geumcheon = []
longitude_geumcheon = []
latitude_yeongdeungpo = []
longitude_yeongdeungpo = []

for i in address_gangnam:
    latitude_gangnam.append(geocoding(i)[0])
    longitude_gangnam.append(geocoding(i)[1])

for j in address_geumcheon:
    latitude_geumcheon.append(geocoding(j)[0])
    longitude_geumcheon.append(geocoding(j)[1])

for k in address_yeongdeungpo:
    latitude_yeongdeungpo.append(geocoding(k)[0])
    longitude_yeongdeungpo.append(geocoding(k)[1])

addr_df_gangnam = pd.DataFrame({'autonomous_district': gangnam_gu_list, 'administrative_district': address_gangnam, 'noise': gangnam_noise_mean_real, 'lat': latitude_gangnam, 'lng': longitude_gangnam})
addr_df_gangnam.set_index(['autonomous_district', 'administrative_district'])
addr_df_geumcheon = pd.DataFrame({'autonomous_district': geumcheon_gu_list, 'administrative_district': address_geumcheon, 'noise': geumcheon_noise_mean_real, 'lat': latitude_geumcheon, 'lng': longitude_geumcheon})
addr_df_geumcheon.set_index(['autonomous_district', 'administrative_district'])
addr_df_yeongdeungpo = pd.DataFrame({'autonomous_district': yeongdeungpo_gu_list, 'administrative_district': address_yeongdeungpo, 'noise': yeongdeungpo_noise_mean_real, 'lat': latitude_yeongdeungpo, 'lng': longitude_yeongdeungpo})
addr_df_yeongdeungpo.set_index(['autonomous_district', 'administrative_district'])

gangnam_dict = addr_df_gangnam.to_dict(orient='index')
geumcheon_dict = addr_df_geumcheon.to_dict(orient='index')
yeongdeungpo_dict = addr_df_yeongdeungpo.to_dict(orient='index')

my_dicts = [gangnam_dict, geumcheon_dict, yeongdeungpo_dict]

for my_dict in my_dicts: 
    for key_num in range(len(my_dict)):
        if my_dict[key_num]['administrative_district'] == 'Dorim-dong':
            my_dict[key_num]['lat'] = 0
            my_dict[key_num]['lng'] = 0
        print(my_dict[key_num])

# print('# 강남구')
# print(addr_df_gangnam)
# print('-' * 50)
# print('# 금천구')
# print(addr_df_geumcheon)
# print('-' * 50)
# print('# 영등포구')
# print(addr_df_yeongdeungpo)
