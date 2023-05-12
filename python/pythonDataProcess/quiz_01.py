import pandas as pd
from bs4 import BeautifulSoup
import numpy as np
import matplotlib.pyplot as plt
from pandas import DataFrame as df

plt.rcParams['font.family'] = 'Malgun Gothic'

myencoding = 'utf-8'
myparser = 'html.parser'
filename = '5-10.html'

html = open(filename, encoding=myencoding)
soup = BeautifulSoup(html, myparser)

find_data = soup.select('tbody > tr > td')
data = []
for i in find_data:
    data.append(i.text)

print(data)
print('-' * 50)

myindex = data[0::3]
mydict = {
    '국어' : data[1::3],
    '영어' : data[2::3]
}

df = pd.DataFrame(mydict, index=myindex)
df.index.name = '이름'
print(df)
print('-' * 50)

df.astype(float).plot(kind='line', title='1학기 성적', figsize=(10, 6), legend=True)
plt.show()

save_filename = 'quiz_01.png'
plt.savefig(save_filename, dpi=400, bbox_inches='tight')
print(save_filename + 'Saved...')
