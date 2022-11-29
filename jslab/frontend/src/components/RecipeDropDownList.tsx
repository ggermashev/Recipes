import {useMemo, useState, useEffect} from "react";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import './css/RecipeList.css';

async function getRecipes() {
    const response = await fetch('/api/recepts/')
    const json = await response.json()
    return json
}

async function addLike(user: string, recept: string) {
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

    const [data, setData] = useState([])

    useEffect(() => {
        getRecipes().then(
            val => {
                setData(val)
            }
        )
    }, [])

    useEffect(() => {
        getRecipes().then(
            val => {
                // @ts-ignore
                setData(_.slice(val.filter((v: { name: string; }) => v.name.toLowerCase().includes(props.name.toLowerCase()))
                    .filter((v: { country: string; }) => (getCountryById(props.countries, v.country) === props.country || props.country === 'Все страны'))
                    .filter((v: { category: string; }) => (getCategoryById(props.categories, v.category) === props.category) || props.category === 'Все категории')
                    .filter((v: { ingredients: string; }) => hasIngredients(props.ingredients, v.ingredients)), 0, 100)
                )
            }
        )
    }, [props.category, props.country, props.name, props.ingredients])

    return (

        <div className="container-fluid">
            <ul>
                {data.map((item: { id: string, name: string, category: string, country: string, ingredients: string, likes: string, owner: string }) => {
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
                                                <p className="content">{getCategoryById(props.categories, item.category)}</p>
                                            </div>
                                            <div className="col col-6">
                                                <h3>Кол-во лайков: {item.likes}</h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col col-6">
                                                <h3>Кухня:</h3>
                                                <p className="content">{getCountryById(props.countries, item.country)} </p>
                                            </div>
                                            <div className="col col-6">
                                                <h3>
                                                    <button className="btn-play" onClick={() => {
                                                        console.log('click')
                                                        addLike(item.owner, item.id).then(
                                                            val => {
                                                                getRecipes().then(
                                                                    val => {
                                                                        setData(val)
                                                                    }
                                                                )
                                                            }
                                                        )
                                                    }}>
                                                        <i className="btnplaylist"></i>
                                                    </button>
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col col-6">
                                                <h3>Ингредиенты:</h3> <p
                                                className="content">{item.ingredients}</p>
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
