import React, {useState, useEffect} from "react";
import 'overlayscrollbars/overlayscrollbars.css';
import './css/Registartion.css';
import './css/AddRecipe.css';

async function add_recipe(name: string, category: string | null, country: string | null, description: string, ingredients: string, owner: string) {
    const request = await fetch('/api/recepts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({
            name: name,
            category: category,
            country: country,
            description: description,
            ingredients: ingredients,
            owner: owner
        })
    })
    const json = await request.json()
    return json
}

async function getUser(key: string | null) {
    if (key === null) return null;
    const request = await fetch(`/api/users/${key}/`)
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

function getIdByCountry(countries: {id: string, name: string}[], country: string) {
    for (let c of countries) {
        if (c.name == country) {
            return c.id
        }
    }
    return null;
}

function getIdByCategory(categories: {id: string, name: string}[], category: string) {
    for (let c of categories) {
        if (c.name == category) {
            return c.id
        }
    }
    return null;
}

export function AddRecipe() {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('Выберите категорию')
    const [country, setCountry] = useState('Выберите страну')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [likes, setLikes] = useState(0)
    const [owner, setOwner] = useState('')
    const [categories, setCategories] = useState([])
    const [countries, setCountries] = useState([])


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
        getUser(localStorage.getItem('key')).then(
            val => {
                setOwner(val.id)
            }
        )
    }, [])

    console.log(countries.map(c => c['name']))

    return (

        <div className="container-fluid text-center">
            <div className="row">
                <div className="col col-12">
                    <h1>Форма добавления рецепта</h1>
                </div>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                const id_country = getIdByCountry(countries, country)
                const id_category = getIdByCategory(categories, category)
                add_recipe(name, id_category, id_country, description, ingredients, owner).then(
                    value => {
                        window.location.href = '/recipes'
                    }
                )
            }} id="regform">
                <div className="row justify-content-center">
                    <div className="col col-sm-9 col-md-6 col-lg-4 col-xl-4">
                        <label className="form-label">Название</label>
                        <input type="text" value={name} onChange={e => {
                            setName(e.target.value)
                        }} className="form-control" id="name"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col col-sm-9 col-md-6 col-lg-4 col-xl-4">
                        <div className="dropdown drop">
                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false" id="category">{category}
                            </button>

                            <ul className="dropdown-menu dropdown-menu-light" id="categories">
                                {categories.map(c => <li><a className="dropdown-item" onClick={(e) => {
                                    setCategory(c['name'])
                                }} href="#">{c['name']}</a></li>)}
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col col-sm-9 col-md-6 col-lg-4 col-xl-4">
                        <div className="dropdown drop">
                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false" id="country">{country}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-light" id="countries">
                                {countries.map(c => <li><a className="dropdown-item" onClick={(e) => {
                                    setCountry(c['name'])
                                }} href="#">{c['name']}</a></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col col-sm-9 col-md-6 col-lg-4 col-xl-4">
                        <label className="form-label">Ингредиенты(Перечисление через ,)</label>
                        <input type="text" value={ingredients} onChange={e => {
                            setIngredients(e.target.value)
                        }} className="form-control" id="ingredients"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col col-sm-9 col-md-6 col-lg-4 col-xl-4">
                        <label className="form-label">Шаги приготовления(Разделение шагов через ;)</label>
                        <input type="text" value={description} onChange={e => {
                            setDescription(e.target.value)
                        }} className="form-control" id="description"/>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col col-sm-3 col-md-2 col-lg-2 col-xl-2">
                        <input type="submit" className="form-control subbtn" id="regsubmit"/>
                    </div>
                </div>
            </form>
        </div>
    )

}