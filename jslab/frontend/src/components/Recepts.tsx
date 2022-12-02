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
import './css/RecipeList.css';


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

async function getRecipes() {
    const response = await fetch('/api/recepts/')
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
    const [data, setData] = useState([])

    useEffect(() => {
        getRecipes().then(
            val => {
                // @ts-ignore
                setData(_.slice(val.sort((v1: { id: string, name: string, likes: number }, v2: { id: string, name: string, likes: number }) => v2.likes - v1.likes), 0, 10))
            }
        )
    }, [])

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
        <div className='container-fluid'>
            <div className="row">
                <div className='col col-12'>
                    <h1 className="text">Поиск рецептов</h1>

                    <div className="horizontal">
                        <div className="vertical">
                            <DishChooser name={name} setName={setName}/>
                            <IngredientsChooser ingredients={ingredients}
                                                setIngredient={setIngredients}/>
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

                </div>
            </div>
            <div className='row'>
                <div className='col col-8'>
                    <RecipeDropDownList categories={categories} category={category}
                                        countries={countries}
                                        country={country} name={name} ingredients={ingredients}/>
                </div>
                <div className='col col-4 rating'>
                    <p className="text-rating rating">Рейтинг рецептов</p>
                    <ul className='rating'>
                        {data.map((d: { id: string, name: string, likes: string }, index: number) => {
                            return (
                                <li className="items">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col col-4">
                                                <p className="rating">{index + 1} место -</p>
                                            </div>
                                            <div className="col col-4">
                                                <p className="rating">{d.name}</p>
                                            </div>
                                            <div className="col col-4">
                                                <p className="rating"><a className="more-info"
                                                    href={"/recipe/" + d.id}>Подробнее</a></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col col-12">
                                                <p className="rating">Лайков: {d.likes}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

        </div>


    );
}