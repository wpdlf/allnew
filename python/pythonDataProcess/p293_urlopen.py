import urllib.request

url = 'https://shared-comic.pstatic.net/thumb/webtoon/626907/thumbnail/title_thumbnail_20150407141027_t83x90.jpg'

savename = 'urldownload02.png'

# urlopen() 함수로 다운로드
result = urllib.request.urlopen(url)

# read() 함수로 바이너리 형식으로 변경
data = result.read()
print('# type(data) :', type(data))

# 파일로 저장
with open(savename, mode='wb') as f:
    f.write(data)
    print(savename + ' Saved...')