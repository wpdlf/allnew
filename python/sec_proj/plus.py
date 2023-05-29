async def saveMap(sigudong):   
    global foli_map
    if sigudong is None:
        return "지역 이름을 입력하세요."
    elif sigudong in my_gu:
        for data in mycoll.find():
            if data['autonomous_district'] == f'{sigudong}구':
                info.append(data)

        # geo_local = Nominatim(user_agent='South Korea')
        # geo = geo_local.geocode(info[0]['autonomous_district'])
        # x_y = [geo.latitude, geo.longitude]

        # foli_map = folium.Map(location=[x_y[0], x_y[1]], zoom_start=14)
        for data in info:
            latitude = data['lat']
            longtitude = data['lng']
            dong_name = data['administrative_district']
            radius = data['noise']
            folium.Circle([latitude, longtitude], radius=radius * 10, color='red', fill_color='red', fill=False, popup=dong_name).add_to(foli_map)
            print('circle2')
        return foli_map.save('public/result.html')
    elif len(sigudong) == 2 and sigudong[0] in my_dong and sigudong[1] in my_dong:
        geo_local = Nominatim(user_agent='South Korea')
        geo = geo_local.geocode(sigudong)
        x_y = [geo.latitude, geo.longitude]
        radius = mycoll.find({'administrative_district': {"$regex": f"^{sigudong}"}})['noise']

        # foli_map = folium.Map(location=[x_y[0], x_y[1]], zoom_start=14) #범인은 너였다..
        folium.Circle([x_y[0], x_y[1]], radius=radius * 10, color='red', fill_color='red', fill=False, popup=f'{sigudong}동').add_to(foli_map)
        print('circle2')
        return foli_map.save('public/result.html')
    else:
        return "입력값을 다시 확인해주세요!" 
    # foli_map.save('public/result.html')
    # print('file saved...')