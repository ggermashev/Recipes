import {DishChooser} from "./dish-chooser";
import {IngredientsChooser} from "./ingredinets-chooser";
import {RecipeDropDownList} from "./RecipeDropDownList";
import "bootstrap/dist/css/bootstrap.min.css";
import "@progress/kendo-theme-default/dist/all.css";


export function Recepts() {
  return (
    <div className="App">
      <DishChooser />
      <IngredientsChooser />
      <RecipeDropDownList />
    </div>
  );
}