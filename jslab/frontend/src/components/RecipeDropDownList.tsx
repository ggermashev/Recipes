import {useMemo, useState, useEffect} from "react";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import './css/RecipeList.css';

async function getRecipes() {
    const response = await fetch('/api/recepts/')
    const json = await response.json()
    return json
}

async function addLike(user: string | null, recept: string) {
    const request = await fetch('/api/liked_recepts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({user: user, recept: recept})
    })
    const json = await request.json()
    return json
}

async function getLikes(user: string | null) {
    const request = await fetch(`/api/liked_recepts/${user}/`)
    const json = await request.json()
    return json
}


function getCategoryById(categories: { id: string, name: string }[], id: string) {
    if (id == '-1') return 'Все категории'
    for (let c of categories) {
        if (c.id === id) {
            return c.name
        }
    }
    return null;
}

function getCountryById(categories: { id: string, name: string }[], id: string) {
    if (id == '-1') return 'Все рецепты'
    for (let c of categories) {
        if (c.id === id) {
            return c.name
        }
    }
    return null;
}


function hasIngredients(need: string, has: string) {
    let need_arr = need.split(',')
    need_arr = need_arr.map(i => i.trim())
    const res = need_arr.map((s: string) => has.includes(s))
    let bool = true;
    for (let r of res) {
        if (r == false) {
            bool = false
        }
    }
    return bool
}

export const RecipeDropDownList = (props: {
    country: string, category: string,
    categories: { id: string, name: string }[],
    countries: { id: string, name: string }[],
    name: string, ingredients: string
}) => {


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
        getRecipes().then(
            val => {
                setData(val)
            }
        )
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
    }, [likes])


    useEffect(() => {
        getRecipes().then(
            val => {
                // @ts-ignore
                setData(_.slice(val.filter((v: { name: string; }) => v.name.toLowerCase().includes(props.name.toLowerCase()))
                    .filter((v: { country: string; }) => (getCountryById(props.countries, v.country) === props.country || props.country === 'Все страны'))
                    .filter((v: { category: string; }) => (getCategoryById(props.categories, v.category) === props.category) || props.category === 'Все категории')
                    .filter((v: { ingredients: string; }) => hasIngredients(props.ingredients, v.ingredients)), 0, limit)
                )
            }
        )
    }, [props.category, props.country, props.name, props.ingredients])

    return (

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
                                                <p className="content-all">{getCategoryById(props.categories, item.category)}</p>
                                            </div>
                                            <div className="col col-6">
                                                <h3>Кол-во лайков: {item.likes}</h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col col-6">
                                                <h3>Кухня:</h3>
                                                <p className="content-all">{getCountryById(props.countries, item.country)} </p>
                                            </div>
                                            <div className="col col-6">
                                                <h3>
                                                    <button className="btn-play" onClick={() => {
                                                        if (localStorage.getItem('key') !== null) {
                                                            addLike(localStorage.getItem('key'), item.id).then(
                                                                val => {
                                                                    getLikes(localStorage.getItem('key')).then(
                                                                        val => {
                                                                            // val = val.map((v: { recept: string }) => v.recept)
                                                                            // if (val.includes(item.id)) {
                                                                            //     urls = backgrounds
                                                                            //     urls[index] = url2
                                                                            //     setBackgrounds(urls)
                                                                            // } else {
                                                                            //     urls = backgrounds
                                                                            //     urls[index] = url1
                                                                            //     setBackground(url1)
                                                                            // }
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
                                                <h3><a href={"/recipe/" + item.id}>Подробнее</a></h3>
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


};
