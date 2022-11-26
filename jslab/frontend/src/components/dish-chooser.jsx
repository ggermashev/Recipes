import React, {useEffect, useState} from "react";
import {getDishList} from "./dish-data";

export const DishChooser = (params) => {
    const [search, setSearch] = useState("");
    const [dishList, setDishList] = useState([]);
    const handleChange = (event) => {
        setSearch(event.target.value);
    };
    useEffect(() => {
        getDishList().then((list) => {
            // console.log("effect", list.name);
            setDishList(list.map(l => l.name));
        });
    }, []);

    const filteredList = search
        ? dishList.filter((dish) =>
            dish.name.toUpperCase().startsWith(search.toUpperCase())
        )
        : dishList.slice(0, 40);
    console.log("filteredList", dishList, filteredList, search);
    return (
        <div>
            <input
                type="search"
                placeholder="Поиск по названию блюда"
                class="form-control"
                list="datalistOptions"
                value={search}
                onChange={handleChange}
            />
            <datalist id="datalistOptions">
                {filteredList.map((dish, index) => (
                    <option key={index} value={`${dish.name}`}/>
                ))}
            </datalist>
        </div>
    );
};
