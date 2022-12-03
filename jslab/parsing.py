import time
import requests
import sqlite3
import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

def get_recipes_by_category_rsnfood():
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()
    driver = webdriver.Chrome(ChromeDriverManager().install())
    link = 'https://www.russianfood.com/recipes/'
    driver.get(link)
    window_before = driver.current_window_handle
    # hrefs = driver.find_elements(By.XPATH, "//dd/a[contains(@href,'/recipes/bytype')]")
    total = 289
    for i in range(100, total):
        driver.implicitly_wait(5)
        h = driver.find_elements(By.XPATH, "//dd/a[contains(@href,'/recipes/bytype')]")[i]
        driver.execute_script("arguments[0].scrollIntoView();", h)
        driver.execute_script("window.scrollBy(0,-50)", "")
        h.click()
        # time.sleep(1)
        driver.implicitly_wait(5)
        category = driver.find_element(By.XPATH, "//a[@class='resList']").text
        driver.implicitly_wait(5)
        # recipes = driver.find_elements(By.XPATH, "//a[contains(@href, '/recipes/recipe.php')]")
        window_catalog = driver.current_window_handle
        cur.execute(f"select id from shopper_category where name='{category}'")
        cat_id = cur.fetchone()[0]
        els = driver.find_elements(By.XPATH, "//div[@class='title ']/a[contains(@href, '/recipes/recipe.php')]")
        for j in range(min(5, len(els))):
            driver.implicitly_wait(5)
            rec = driver.find_elements(By.XPATH, "//div[@class='title ']/a[contains(@href, '/recipes/recipe.php')]")[j]
            driver.execute_script("arguments[0].scrollIntoView();", rec)
            driver.execute_script("window.scrollBy(0,-50)", "")
            rec.click()
            time.sleep(1)
            driver.implicitly_wait(5)
            title = driver.find_element(By.XPATH, "//h1[@class='title ']")
            ing = driver.find_elements(By.XPATH, "//tr[contains(@class,'ingr_tr')]/td/span")
            descr = driver.find_elements(By.XPATH, "//div[@class='step_n']")
            ingredients = []
            description = []
            for i in ing:
                ingredients.append(i.text)
            for d in descr:
                description.append(d.text)
            ingredients = ','.join(ingredients)
            description = ';'.join(description)
            print(title.text)
            cur.execute(f"insert into shopper_recept (name, description, ingredients, category_id, likes) values ('{title.text}', '{description}', '{ingredients}', '{cat_id}', '0')")
            conn.commit()
            driver.back()
            driver.switch_to.window(window_catalog)
        driver.back()
        driver.switch_to.window(window_before)
    cur.close()
    conn.close()


def get_recipes_by_country_rsnfood():
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()
    driver = webdriver.Chrome(ChromeDriverManager().install())
    link = 'https://www.russianfood.com/recipes/'
    driver.get(link)
    window_before = driver.current_window_handle
    # hrefs = driver.find_elements(By.XPATH, "//table[@class='sb_nations']/tbody/tr/td/a[contains(@href,'/recipes/bytype')]")
    total = 90
    for i in range(total):
        driver.implicitly_wait(150)
        h = driver.find_elements(By.XPATH, "//table[@class='sb_nations']/tbody/tr/td/a[contains(@href,'/recipes/bytype')]")[i]
        driver.execute_script("arguments[0].scrollIntoView();", h)
        driver.execute_script("window.scrollBy(0,-50)", "")
        h.click()
        # time.sleep(1)
        driver.implicitly_wait(50)
        country = driver.find_element(By.XPATH, "//div[@class='wrap']").text
        cur.execute(f"select id from shopper_country where name='{country}'")
        cnt_id = cur.fetchone()[0]
        driver.implicitly_wait(150)
        # recipes = driver.find_elements(By.XPATH, "//a[contains(@href, '/recipes/recipe.php')]")
        window_catalog = driver.current_window_handle
        els = driver.find_elements(By.XPATH, "//div[@class='title ']/a[contains(@href, '/recipes/recipe.php')]")
        for j in range(min(5, len(els))):
            driver.implicitly_wait(150)
            rec = driver.find_elements(By.XPATH, "//div[@class='title ']/a[contains(@href, '/recipes/recipe.php')]")[j]
            driver.execute_script("arguments[0].scrollIntoView();", rec)
            driver.execute_script("window.scrollBy(0,-50)", "")
            rec.click()
            # time.sleep(1)
            driver.implicitly_wait(150)
            title = driver.find_element(By.XPATH, "//h1[@class='title ']")
            ing = driver.find_elements(By.XPATH, "//tr[contains(@class,'ingr_tr')]/td/span")
            descr = driver.find_elements(By.XPATH, "//div[@class='step_n']")
            ingredients = []
            description = []
            for i in ing:
                ingredients.append(i.text)
            for d in descr:
                description.append(d.text)
            ingredients = ','.join(ingredients)
            description = ';'.join(description)
            print(title.text)
            cur.execute(f"insert into shopper_recept (name, description, ingredients, country_id) values ('{title.text}', '{description}', '{ingredients}', '{cnt_id}')")
            conn.commit()
            driver.back()
            driver.switch_to.window(window_catalog)
        driver.back()
        driver.switch_to.window(window_before)

    cur.close()
    conn.close()


def get_recipes_eda():
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()
    driver = webdriver.Chrome(ChromeDriverManager().install())
    link = 'https://www.russianfood.com/recipes/'
    driver.get(link)
    window_before = driver.current_window_handle
    for i in range(5):
        title = driver.find_elements(By.XPATH, "//span[@class='emotion-1j2opmb']")
        print(title.text)

