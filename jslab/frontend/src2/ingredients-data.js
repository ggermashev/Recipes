const URL = "ingredients-list.json";
export const getIngredientsList = async () => {
  try {
    const responce = await fetch(URL);
    return responce.ok ? responce.json() : [];
  } catch (e) {
    return [
      {
        name: "Ошибка загрузки списка ингредиентов",
      },
    ];
  }
};
