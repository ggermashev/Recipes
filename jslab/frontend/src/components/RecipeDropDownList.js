import {useMemo, useState, useEffect} from "react";
import {DropDownList} from "@progress/kendo-react-dropdowns";

async function getRecipes() {
    const response = await fetch('/api/recepts/')
    const json = await response.json()
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

function getCategoryById(categories, id) {
    for (let c of categories) {
        if (c.id === id) {
            return c.name
        }
    }
    return null;
}

export const RecipeDropDownList = () => {


    const [data, setData] = useState([])
    const [category, setCategory] = useState("Все")
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
        getRecipes().then(
            val => {
                setData(val)
            }
        )
    }, [])

    useEffect(() => {
        getRecipes().then(
            val => {
                if (category !== 'Все') {
                    setData(val.filter(v => getCategoryById(categories, v.category) === category))
                }
                else {
                    setData(val)
                }
            }
        )
    }, [category])

    // const filteredData = useMemo(() => {
    //     if (!category || category === "Все") return data;
    //
    //     return data.filter((item) => item.category === category);
    // }, [category]);


    return (
        <section className="k-my-8">
            <form className="k-form k-mb-4">
                <label className="k-label k-mb-3">Тип блюда</label>
                <DropDownList
                    data={categories.map(c => c.name)}
                    onChange={(e) => setCategory(e.value)}
                />
            </form>

            <section className="k-listgroup">
                <ul>
                    {data.map((item) => {
                        return (
                            <li key={item.id} className="k-listgroup-item">
                                <a href={"/recipe/"+item.id}>{item.name}</a>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </section>
    );


};
