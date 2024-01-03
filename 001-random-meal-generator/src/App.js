import { useState } from "react";

export default function App() {
  const [meal, setMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const getMealRandom = async () => {
    try {
      const response = await fetch(
        "https://themealdb.com/api/json/v1/1/random.php"
      );
      const json = await response.json();
      const meals = json.meals[0];
      console.log(meals);
      setIngredients([]);

      for (let i = 1; i <= 20; i++) {
        const ingredient = meals[`strIngredient${i}`];
        if (ingredient !== "") {
          const measure = meals[`strMeasure${i}`];

          setIngredients((prevIngredients) => [
            ...prevIngredients,
            `${ingredient} - ${measure}`,
          ]);
        }
      }

      setMeal(meals);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-10">
      <div className="text-center">
        <h1 className="text-2xl mb-5">Feeling Hungry?</h1>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          onClick={getMealRandom}
        >
          Generate Meal
        </button>
      </div>
      {meal ? (
        <div>
          <div className="flex mt-10 gap-10 p-10 ">
            <div className="min-w-[300px]">
              <img
                src={meal.strMealThumb}
                width={300}
                className="rounded-lg"
                alt=""
              />
              <div>
                <p className="my-2">
                  <span className="font-bold">Category:</span>{" "}
                  {meal.strCategory}
                </p>
                <p>
                  <span className="font-bold">Area:</span> {meal.strArea}
                </p>
                <p className={`${meal.strTags ? "block" : "hidden"}`}>
                  <span className="font-bold">Tags:</span> {meal.strTags}
                </p>
              </div>

              <div className="ingredients">
                <h1 className="mt-5 text-xl">Ingredients:</h1>
                <ul>
                  {ingredients &&
                    ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="w-2/3">
              <h1 className="text-2xl">{meal.strMeal}</h1>
              <p className="mt-5">{meal.strInstructions}</p>

              <div className="video mt-10">
                <h1 className="text-2xl">Video Recipe</h1>
                <iframe
                  title="recipe"
                  className="w-full mt-5"
                  height={500}
                  src={`https://www.youtube.com/embed/${meal.strYoutube.slice(
                    -11
                  )}`}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
