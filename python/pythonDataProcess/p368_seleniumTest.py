import time
from selenium import webdriver
from selenium.webdriver.common.by import By

filename = '/Users/BTC-N11/Downloads/chromedriver'
driver = webdriver.Chrome(filename)
print(type(driver))
print('-' * 50)

print('Go Google~!!')
url = 'http://www.naver.com'
driver.get(url)

search_textbox = driver.find_element(By.NAME, 'query')

word = '옆집누나'
search_textbox.send_keys(word)

search_textbox.submit()

wait = 3
print(str(wait) + '동안 기다립니다.')
time.sleep(wait)

imagefile = 'xx_capture.png'
driver.save_screenshot(imagefile)
print(imagefile + '이미지 저장')

wait = 3
driver.implicitly_wait(wait)

driver.quit()
print('Browser Exit~!!')