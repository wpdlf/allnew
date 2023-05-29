import json
import requests

api_key = 'd1aaf217ce7e1570cb1b6395961af876'

def addr_to_lat_lon(addr):
    url = 'https://dapi.kakao.com/v2/local/search/address.json?query={address}'.format(address=addr)
    headers = {"Authorization": "KakaoAK " + api_key}
    result = json.loads(str(requests.get(url, headers=headers).text))
    print(result)
    print('-' * 50)
    match_first = result['documents'][0]['address']
    return float(match_first['x']), float(match_first['y'])

print(addr_to_lat_lon('서울 강남구 자곡로3길 21 LH강남힐스테이트'))