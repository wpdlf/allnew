folium.Circle([latitude, longtitude], radius=radius * 10, color='blue', fill_color='red', fill=False, popup=popup).add_to(map_osm)


if radius > 70:
    color = 'black'
elif radius > 60:
    color = 'red'
elif radius > 50:
    color = 'yellow'
else:
    color = 'green'