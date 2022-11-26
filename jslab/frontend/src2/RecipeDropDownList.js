import { useMemo, useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";

// Dropdown categories
const categories = ["Все", "Супы", "Салаты", "Закуски"];

// Results data filtered using categories
const data = [
  {
    id: 1,
    label: "Солянка",
    type: "Супы",
  },
  {
    id: 2,
    label: "Нарезка",
    type: "Закуски",
  },
  {
    id: 3,
    label: "Салат Цезарь",
    type: "Салаты",
  },
  {
    id: 4,
    label: "Борщ",
    type: "Супы",
  },
  {
    id: 5,
    label: "Сервелат",
    type: "Закуски",
  },
];

export const RecipeDropDownList = () => {
  // Store currently selected category
  const [category, setCategory] = useState("");

  // Memoized results. Will re-evaluate any time selected
  // category changes
  const filteredData = useMemo(() => {
    if (!category || category === "Все") return data;

    return data.filter((item) => item.type === category);
  }, [category]);

  return (
    <section className="k-my-8">
      <form className="k-form k-mb-4">
        <label className="k-label k-mb-3">Тип блюда</label>
        <DropDownList
          data={categories}
          onChange={(e) => setCategory(e.value)}
        />
      </form>

      <section className="k-listgroup">
        <ul>
          {filteredData.map((item) => {
            return (
              <li key={item.id} className="k-listgroup-item">
                {item.label}
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};
