import {DishChooser} from "./dish-chooser";
import {IngredientsChooser} from "./ingredinets-chooser";
import {RecipeDropDownList} from "./RecipeDropDownList";
import "bootstrap/dist/css/bootstrap.min.css";
import "@progress/kendo-theme-default/dist/all.css";
import {Dropdown} from "./Dropdown";
import './css/Recepts.css';
import 'react-dropdown/style.css';
import {DropDownList} from "@progress/kendo-react-dropdowns";
import {useEffect, useState} from "react";
import './css/Dropdown.css';


async function getCountries() {
    const response = await fetch('/api/countries/')
    const json = await response.json()
    return json
}

async function getCategories() {
    const response = await fetch('/api/categories/')
    const json = await response.json()
    return json
}

export function Recepts() {

    const [categories, setCategories] = useState([])
    const [countries, setCountries] = useState([])
    const [category, setCategory] = useState("Все категории")
    const [country, setCountry] = useState("Все страны")
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState('')

    useEffect(() => {
        getCategories().then(
            val => {
                val.unshift({id: '-1', name: 'Все категории'})
                setCategories(val)
            }
        )
    }, [])

    useEffect(() => {
        getCountries().then(
            val => {
                val.unshift({id: '-1', name: 'Все страны'})
                setCountries(val)
            }
        )
    }, [])


    const options = [
        {value: "green", label: "Green"},
        {value: "blue", label: "Blue"},
        {value: "red", label: "Red"},
        {value: "yellow", label: "Yellow"},
        {value: "orange", label: "Orange"},
        {value: "pink", label: "Pink"},
        {value: "purple", label: "Purple"},
        {value: "grey", label: "Grey"}
    ];
    return (
        <div className="App">
            <div className="recept">
                <h1 className="text">Поиск рецептов</h1>
                <div className="horizontal">
                    <div className="vertical">
                        <div className="horizontal">
                            <div className="vertical">
                                <DishChooser name={name} setName={setName}/>
                                <IngredientsChooser ingredients={ingredients} setIngredient={setIngredients}/>
                            </div>
                            <div className="vertical">
                                <p className="text">Тип блюда:</p>
                                <p className="text">Кухня:</p>
                            </div>
                            <div className="vertical">
                                <form className="Dropdown">
                                    <DropDownList
                                        data={categories.map((c: { name: string }) => c.name)}
                                        onChange={(e) => setCategory(e.value)}
                                    />
                                </form>
                                <form className="Dropdown">
                                    <DropDownList
                                        data={countries.map((c: { name: string }) => c.name)}
                                        onChange={(e) => setCountry(e.value)}
                                    />
                                </form>
                            </div>
                        </div>
                        <RecipeDropDownList categories={categories} category={category} countries={countries}
                                            country={country} name={name} ingredients={ingredients}/>
                    </div>
                    <div className="recipe-rating">
                        <p className="text-rating">Рейтинг рецептов</p>
                        <div className="hrecipe-rating">
                            <p className="p">1 Место</p>
                            <div className="vrecipe-rating">
                                <p className="p">!!!Название рецепта!!!</p>
                                <img className="image"
                                     src={("https://mishka-gastrobar.ru/wa-data/public/shop/products/75/00/75/images/131/131.750x0.jpg")}
                                     alt="fireSpot"/>
                            </div>
                        </div>
                        <div className="hrecipe-rating">
                            <p className="p">2 Место</p>
                            <div className="vrecipe-rating">
                                <p className="p">!!!Название рецепта!!!</p>
                                <img className="image"
                                     src={("https://mishka-gastrobar.ru/wa-data/public/shop/products/75/00/75/images/131/131.750x0.jpg")}
                                     alt="fireSpot"/>
                            </div>
                        </div>
                        <div className="hrecipe-rating">
                            <p className="p">3 Место</p>
                            <div className="vrecipe-rating">
                                <p className="p">!!!Название рецепта!!!</p>
                                <img className="image"
                                     src={("https://mishka-gastrobar.ru/wa-data/public/shop/products/75/00/75/images/131/131.750x0.jpg")}
                                     alt="fireSpot"/>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}