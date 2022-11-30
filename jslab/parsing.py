import time

from bs4 import BeautifulSoup
import requests
import sqlite3
import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

def get_recepts():
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()
    driver = webdriver.Chrome(ChromeDriverManager().install())
    link = 'https://www.russianfood.com/recipes/'
    driver.get(link)
    window_before = driver.current_window_handle
    hrefs = driver.find_elements(By.XPATH, "//dd/a[contains(@href,'/recipes/bytype')]")
    for h in hrefs:
        print(h.text)

