import React, { useEffect, useState } from "react";
import { getIngredientsList } from "./ingredients-data";

export const IngredientsChooser = (props: {ingredients: string, setIngredient(ingr: React.SetStateAction<string>): void}) => {

  // const [searchs, setSearch] = useState("");
  // const [ingredientsList, setIngredientsList] = useState([]);

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    props.setIngredient(event.target.value);
  };

  // useEffect(() => {
  //   getIngredientsList().then((list) => {
  //     console.log("effect", list);
  //     setIngredientsList(list);
  //   });
  // }, []);

  // const filteredLists = searchs
  //   ? ingredientsList.filter((ingredients) =>
  //   ingredients.name.toUpperCase().startsWith(searchs.toUpperCase())
  //     )
  //   : ingredientsList.slice(0, 40);
  // console.log("filteredList", ingredientsList, filteredLists, searchs);
  return (
    <div className="searchIngr">
      <input
        type="search"
        placeholder="Ингредиенты(через ,)"
        className="form-control"
        list="datalistOptions"
        value={props.ingredients}
        onChange={handleChange}
      />
      {/*<datalist id="datalistOptions">*/}
      {/*  {filteredLists.map((ingredients, index) => (*/}
      {/*    <option key={index} value={`${ingredients.name}`} />*/}
      {/*  ))}*/}
      {/*</datalist>*/}
    </div>
  );
};
