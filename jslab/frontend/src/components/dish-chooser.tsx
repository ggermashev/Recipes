import React, {useEffect, useState} from "react";
import {getDishList} from "./dish-data";


export const DishChooser = (props: {name: string, setName(name: React.SetStateAction<string>): void}) => {
    // const [search, setSearch] = useState("");
    // const [dishList, setDishList] = useState([]);
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        props.setName(event.target.value)
    };
    // useEffect(() => {
    //     getDishList().then((list) => {
    //         // console.log("effect", list.name);
    //         setDishList(list.map(l => l.name));
    //     });
    // }, []);

    // const filteredList = search
    //     ? dishList.filter((dish) =>
    //         dish.name.toUpperCase().startsWith(search.toUpperCase())
    //     )
    //     : dishList.slice(0, 40);
    // console.log("filteredList", dishList, filteredList, search);
    return (
        <div className="searchDish">
            <input
                type="search"
                placeholder="Поиск по названию блюда"
                className="form-control"
                list="datalistOptions"
                value={props.name}
                onChange={handleChange}
            />
            {/*<datalist id="datalistOptions">*/}
            {/*    {filteredList.map((dish, index) => (*/}
            {/*        <option key={index} value={`${dish.name}`}/>*/}
            {/*    ))}*/}
            {/*</datalist>*/}
        </div>
    );
};
