import React, { useEffect, useState } from "react";
import { getIngredientsList } from "./ingredients-data";

export const IngredientsChooser = (params) => {
  const [searchs, setSearch] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    getIngredientsList().then((list) => {
      console.log("effect", list);
      setIngredientsList(list);
    });
  }, []);

  const filteredLists = searchs
    ? ingredientsList.filter((ingredients) =>
    ingredients.name.toUpperCase().startsWith(searchs.toUpperCase())
      )
    : ingredientsList.slice(0, 40);
  console.log("filteredList", ingredientsList, filteredLists, searchs);
  return (
    <div>
      <input
        type="search"
        placeholder="Поиск по названию ингредиента"
        class="form-control"
        list="datalistOptions"
        value={searchs}
        onChange={handleChange}
      />
      <datalist id="datalistOptions">
        {filteredLists.map((ingredients, index) => (
          <option key={index} value={`${ingredients.name}`} />
        ))}
      </datalist>
    </div>
  );
};
