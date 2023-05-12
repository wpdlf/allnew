from pandas import Series
import matplotlib.pyplot as plt

plt.rcParams['font.family'] = 'Malgun Gothic'

myindex = ['강감찬', '김유신', '이순신', '안익태', '윤동주']
members = Series(data=[30, 20, 40, 30, 60], index=myindex)
print(members)
print('-' * 50)

print('\n# values 속성을 이용 요소들의 값 확인')
print(members.values)
print('-' * 50)

print('\n# index 속성을 이용 색인 객체를 확인')
print(members.index)

members.plot(kind='bar', rot=0, ylim=[0, members.max() + 5], use_index=True, grid=False, table=False, color=['r', 'g', 'b', 'y', 'm'])
plt.xlabel("학생 이름")
plt.ylabel("점수")
plt.title("학생별 시험 점수")

# 백분율 관련 변수
ratio = 100 * members / members.sum()
print(ratio)
print('-' * 50)

for idx in range(members.size):
    value = str(members[idx]) + '건'
    ratioval = '%.1f%%' % (ratio[idx])

    plt.text(x=idx, y=members[idx] + 1, s=value, horizontalalignment='center')
    plt.text(x=idx, y=members[idx]/2, s=ratioval, horizontalalignment='center')

meanval = members.mean()
print(meanval)
print('-' * 50)

average = '평균 : %d건' % meanval
plt.axhline(y=meanval, color='r', linewidth=1, linestyle='dashed')
plt.text(x=0, y=meanval + 1, s=average, horizontalalignment='center')

filename = 'graph02.png'
plt.savefig(filename, dpi=400, bbox_inches='tight')
print(filename + ' Saved...')
plt.show()