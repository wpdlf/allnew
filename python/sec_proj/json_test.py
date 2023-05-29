import json 

def get_Json_Data():
    filename = 'sensor_data_exam.json'
    myfile = open(filename, 'rt', encoding='utf-8')
    print( type(myfile) )
    print('-' * 40)
    
    myfile = myfile.read()
    print( type(myfile) )
    print('-' * 40)

    # jsonData : list 구조(요소 각각은 사전)
    jsonData = json.loads(myfile)
    print(type(jsonData))
    print('-' * 40)
    
    # 데이터가 들어있는 'DATA'부분 list형식 : [{ }, { }, { }, ...]
    myjson_list = jsonData['DATA']
    print(type(myjson_list))
    print(myjson_list[0]['autonomous_district'])



    # for i in myjson:
    #     myjson[i].pop('', None)


    for oneitem in myjson_list :
        # print(oneitem)
        # print(oneitem.keys())
        # print(oneitem.values())
        print('구 이름 :', oneitem['autonomous_district'])
        print('동 이름 :', oneitem['administrative_district'])
        print('형태 :', oneitem['region'])
        max_noise = oneitem['max_noise']
        min_noise = oneitem['min_noise']
        avg_noise = oneitem['avg_noise']
        print('측정일시 :', oneitem['sensing_time'])        
        
        print('최고 소음 :', max_noise)        
        print('최저 소음 :', min_noise)
        print('평균 소음 :', avg_noise)
        print('-' * 40)
        

if __name__ == '__main__':
    get_Json_Data()






# savedFilename = 'saved_DATA.json'
# with open(savedFilename, 'w', encoding='utf8') as outfile:
#     retJson = json.dumps(myjson_list, indent=4, sort_keys=True, ensure_ascii=False)
#     outfile.write(retJson)

# print(savedFilename + ' file saved..')