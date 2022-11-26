import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { DishChooser } from "./dish-chooser";
import { IngredientsChooser } from "./ingredinets-chooser";
//import { DropdownList } from "./type-dish";
//import Dropdown from "./Dropdown";
import "@progress/kendo-theme-default/dist/all.css";
import { RecipeDropDownList } from "./RecipeDropDownList";

export default function App() {
  return (
    <div className="App">
      <DishChooser />
      <IngredientsChooser />
      <RecipeDropDownList />
    </div>
  );
}
