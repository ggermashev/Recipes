import React, {useState, useEffect} from "react";
// import './css/Profile.css';
import 'overlayscrollbars/overlayscrollbars.css';
import './css/Registartion.css';
import './css/Recepts.css';


async function getUser(key: string | null) {
    if (key === null) return null;
    const request = await fetch(`/api/users/${key}/`)
    const json = await request.json()
    return json
}

async function getRecipes() {
    const request = await fetch('/api/recepts/')
    const json = await request.json()
    return json
}

async function getLikes(user: string | null) {
    const request = await fetch(`/api/liked_recepts/${user}/`)
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

async function deleteRecipe(id: string) {
    const response = await fetch(`/api/recepts/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        }
    })
    const json = await response.json()
    return json
}

function getCategoryById(categories: { id: string, name: string }[], id: string) {
    if (id == '-1') return 'Все категории'
    for (let c of categories) {
        if (c.id === id) {
            return c.name
        }
    }
    return 'нет';
}

function getCountryById(categories: { id: string, name: string }[], id: string) {
    if (id == '-1') return 'Все рецепты'
    for (let c of categories) {
        if (c.id === id) {
            return c.name
        }
    }
    return 'нет';
}

export const Profile = () => {
    const [owner, setOwner] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [nickname, setNickname] = useState('')
    const [login, setLogin] = useState('')
    const [id, setId] = useState('')
    const [categories, setCategories] = useState([])
    const [countries, setCountries] = useState([])


    let [limit, setLimit] = useState(100)
    const [data, setData] = useState([])
    const [warning, setWarning] = useState('')
    const url1 = "https://cdn-icons-png.flaticon.com/512/32/32557.png"
    const url2 = "https://shutniks.com/wp-content/uploads/2020/02/kartinki_pro_lyubov_30_17152818.png"
    let urls = []
    for (let i = 0; i < limit; i++) {
        urls[i] = url1
    }
    let [backgrounds, setBackgrounds] = useState(urls)
    const [background, setBackground] = useState("url1")


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

    useEffect(() => {
        if (localStorage.getItem('key') === null) window.location.href = '/recipes'
        else {
            getUser(localStorage.getItem('key')).then(
                val => {
                    setOwner(val.id)
                    setName(val.name)
                    setSurname(val.surname)
                    setNickname(val.nickname)
                    setLogin(val.login)
                    setId(val.id)
                    getRecipes().then(
                        vals => {
                            setData(vals.filter((v: { owner: string; }) => v.owner == val.id))
                        }
                    )
                }
            )
        }
    }, [])

    const [likes, setLikes] = useState(['-1', '-2'])

    useEffect(() => {
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

    return (

        <div className="parent">
            <div><h1> Личный кабинет</h1></div>
            <div className="container-fluid text-center">
                <div className="row">
                    <div className="col">
                        {/* данные */}
                        <div>
                            <h2 className="text-center">Личные данные</h2>
                        </div>
                        <div className="container-fluid text-center">
                            <div className="row">
                                <div className="col">
                                    Логин:
                                </div>
                                <div className="col">
                                    <input type="text" value={login} className="form-control" id="name"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    Никнейм:
                                </div>
                                <div className="col">
                                    <input type="text" value={nickname} className="form-control" id="name"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    Имя:
                                </div>
                                <div className="col">
                                    <input type="text" value={name} className="form-control" id="name"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    Фамилия:
                                </div>
                                <div className="col">
                                    <input type="text" value={surname} className="form-control" id="name"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">

                        {/* рецепты */}

                        <div>
                            <h2 className="text-center">Мои рецепты</h2>
                        </div>


                        <div className="container-fluid">
                            <ul>
                                {data.map((item: { id: string, name: string, category: string, country: string, ingredients: string, likes: string, owner: string }, index) => {
                                    return (
                                        <div className="row">
                                            <div className="col col-12">
                                                <li key={item.id} className="items">
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
                                                                <h3><a className="more-info"
                                                                       href={"/recipe/" + item.id}>Подробнее</a></h3>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col col-6">
                                                                <h3>Ингредиенты:</h3> <p
                                                                className="content-all">{item.ingredients}</p>
                                                            </div>
                                                            <div className="col col-6">
                                                                <h3><a className="more-info"
                                                                       href={"/change_recipe/" + item.id}>Редактировать</a>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col col-6">
                                                                <h3>
                                                                    <button className="btn btn-danger" onClick={(e) => {
                                                                        deleteRecipe(item.id).then(
                                                                            vals => {
                                                                                setData(vals.filter((v: { owner: string; }) => v.owner == owner))
                                                                            }
                                                                        )
                                                                    }}>Удалить
                                                                    </button>
                                                                </h3>
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

                    </div>
                </div>
            </div>
        </div>
    )
}
