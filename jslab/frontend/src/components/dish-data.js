const URL = "dish-list.json";
export const getDishList = async () => {
  try {
    const responce = await fetch(`/api/recepts/`);
    return responce.ok ? responce.json() : [];
  } catch (e) {
    return [
      {
        name: "Ошибка загрузки списка блюд",
      },
    ];
  }
};
