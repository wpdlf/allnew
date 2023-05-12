myfile01 = open('sample02.txt', 'rt', encoding='UTF-8')
linelist = myfile01.readlines()
myfile01.close()

myfile02 = open('result02.txt', 'wt', encoding='UTF-8')

for i in range(len(linelist)):
    name_age = linelist[i].split()

    if int(name_age[1]) < 20:
        print(f'{name_age[0]}/{name_age[1]}/미성년자')
        text = name_age[0] + '/' + name_age[1] + '/미성년자'
        myfile02.write(text + '\n')
    else:
        print(f'{name_age[0]}/{name_age[1]}/성인')
        text = name_age[0] + '/' + name_age[1] + '/성인'
        myfile02.write(text + '\n')
