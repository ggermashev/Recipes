import React, {useEffect, useState} from 'react';
import {getCategoryById, addLike, getLikes, getRecipes, getCountryById} from './RecipeDropDownList'
import './css/Favorites.css'
interface Recipe {
    id: string,
    name: string,
    description: string,
    ingredients: string,
    likes: string,
    last_updated: string,
    category: string,
    country: string,
    owner: string
}

function isUser() {
    const user = localStorage.getItem('key');
    if (user === null) {
        alert("Для просмотра избранных рецептов, войдите в аккаунт или зарегестрируйтесь")
        let reg = document.createElement('a');
        window.location.href = '/registration';
        reg.href = window.location.href;
        return '';
    } else {
    return user;
    }
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

async function GetArrayID() {
    let key = isUser();
    const request = await fetch(`/api/liked_recepts/${key}/`)
    return await request.json();
}

async function getRecipe(id: number) {
    const request = await fetch(`/api/recepts/${id}/`)
    let response = await request.json();
    return response;
}

export function Favorites() {
    const [likes, setLikes] = useState(['-1', '-2'])
    let [data, setData] = React.useState<Recipe []>([]);
    React.useEffect(() => {
        let tmp: Recipe [] = [];
        GetArrayID().then(
            value => {
                if (value.length === 0) {
                    setData([])
                }
                else {
                    for (let v of value) {
                        getRecipe(v.recept).then(
                            v => {
                                tmp.push(v);
                                let arr = [];
                                for (let t of tmp) {
                                    arr.push(t);
                                }
                                setData(arr);
                            }
                        )
                    }
                }
            }
        )
    }, [likes])
    let [limit, setLimit] = useState(100)
    const url1 = "https://cdn-icons-png.flaticon.com/512/32/32557.png"
    const url2 = "https://shutniks.com/wp-content/uploads/2020/02/kartinki_pro_lyubov_30_17152818.png"
    let urls = []
    for (let i = 0; i < limit; i++) {
        urls[i] = url1
    }

    const [categories, setCategories] = useState([])
    const [countries, setCountries] = useState([])

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
    const [warning, setWarning] = useState('')
    React.useEffect(() => {
        if (localStorage.getItem('key') !== null) {
            getLikes(localStorage.getItem('key')).then(
                val => {
                    let likes: string[] = []
                    for (let v of val) {
                        likes.push(v.recept)
                    }
                    setLikes(likes)
                }
            )
        }
    }, [])
    if (data.length === 0) {
        return <h1>У вас нет сохраненных рецептов</h1>
    }
    return (
        <div className="container-fluid">
            <ul>
                {data.map((item: { id: string, name: string, category: string, country: string, ingredients: string, likes: string, owner: string }, index) => {
                    return (
                        <div className="row">
                            <div className="col col-12">
                                <li key={item.id} className="items-1">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col col-12">
                                                <h1>{item.name}</h1>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col col-6">
                                                <h3>Категория:</h3>
                                                <p className="content-all">{getCategoryById(categories, item.category)}</p>
                                            </div>
                                            <div className="col col-6">
                                                <h3>Кол-во лайков: {item.likes}</h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col col-6">
                                                <h3>Кухня:</h3>
                                                <p className="content-all">{getCountryById(countries, item.country)} </p>
                                            </div>
                                            <div className="col col-6">
                                                <h3>
                                                    <button className="btn-play" onClick={() => {
                                                        if (localStorage.getItem('key') !== null) {
                                                            addLike(localStorage.getItem('key'), item.id).then(
                                                                val => {
                                                                    getLikes(localStorage.getItem('key')).then(
                                                                        val => {
                                                                            let likes: string[] = []
                                                                            for (let v of val) {
                                                                                likes.push(v.recept)
                                                                            }
                                                                            setLikes(likes)
                                                                        }
                                                                    )
                                                                    getRecipes().then(
                                                                        val => {
                                                                            setData(val)
                                                                        }
                                                                    )
                                                                }
                                                            )
                                                        } else {
                                                            setWarning('Только для зарегистрированных пользователей!')
                                                            setTimeout(() => {
                                                                setWarning('')
                                                            }, 2000)
                                                        }
                                                    }}>
                                                        <img className="btnplaylist"
                                                             src={likes.includes(item.id) ? url2 : url1}></img>
                                                    </button>
                                                </h3>
                                                <p className="warning">{warning}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col col-6">
                                                <h3>Ингредиенты:</h3> <p
                                                className="content-all">{item.ingredients}</p>
                                            </div>
                                            <div className="col col-6">
                                                <h3><a className="more-info" href={"/recipe/" + item.id}>Подробнее</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </div>
                    );
                })}
            </ul>
        </div>

    );
}