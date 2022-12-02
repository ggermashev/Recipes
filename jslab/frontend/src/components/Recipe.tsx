import React, {useState, useEffect} from "react";
import './css/Recipe.css';
import {inspect} from "util";

async function get_recipe(id: string) {
    const request = await fetch(`/api/recepts/${id}`)
    const json = await request.json()
    return json
}

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

async function pushBasket(key: string | null, product: string) {
    const request = await fetch('/api/basket/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({owner: key, product: product})
    })
}

function getCategoryById(categories: { id: string, name: string }[], id: string) {
    for (let c of categories) {
        if (c.id === id) {
            return c.name
        }
    }
    return null;
}

function getCountryById(countries: { id: string, name: string }[], id: string) {
    for (let c of countries) {
        if (c.id === id) {
            return c.name
        }
    }
    return null;
}


export function Recipe() {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [likes, setLikes] = useState('')
    const [owner, setOwner] = useState('')
    const [last_updated, setLastUpdated] = useState('')
    const [categories, setCategories] = useState([])
    const [countries, setCountries] = useState([])

    let d: number[] = []
    const [done, setDone] = useState(d)

    const id_arr = window.location.href.split('/')
    const id = id_arr[id_arr.length - 2]

    useEffect(() => {
        getCategories().then(
            val => {
                setCategories(val)
            }
        )
    }, [])

    useEffect(() => {
        getCountries().then(
            val => {
                setCountries(val)
            }
        )
    }, [])


    useEffect(() => {
        get_recipe(id).then(
            val => {
                setName(val.name)
                setCategory(val.category)
                setCountry(val.country)
                setDescription(val.description)
                setIngredients(val.ingredients)
                setLikes(val.likes)
                setOwner(val.owner)
                setLastUpdated(val.last_updated)
            }
        )
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-12">
                        <h1>{name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-6">
                        <h2>Ингредиенты</h2>
                        <h3>Добавлены: {done.map(d => ` ${d} `)}</h3>
                        <ul className="content">
                            {ingredients.split(',').map((i, index) => <li className="content">{index}) {i}
                                <button key={index} className="add btn btn-success btn-sm" onClick={(e) => {
                                    pushBasket(localStorage.getItem('key'), i)
                                    let arr: number [] = []
                                    for (let d of done) {
                                        arr.push(d)
                                    }
                                    arr.push(index)
                                    setDone(arr)
                                }}>+
                                </button>
                            </li>)}
                        </ul>
                    </div>
                    <div className="col col-6">
                        <h2>Фильтры</h2>
                        <p className="content">Категория: {getCategoryById(categories, category)}</p>
                        <p className="content">Кухня: {getCountryById(countries, country)}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-12">
                        <h2 className="description">Этапы приготовления</h2>
                        <ul>
                            {description.split(';').map(d => <li className="content">{d}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}