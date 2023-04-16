import "./RecipePage.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import  { type Recipe } from "../../components/RecipeList";
import { getCookingTime } from "../../utils/getCookingTime";

export default function RecipePage() {
  const { recipeId } = useParams();
  const { data, error } = useFetch<Recipe>(`${process.env.REACT_APP_DB_URL}/${recipeId}`);

  if (error)
  return (
      <p aria-live="polite" role="status">
          {error.message}
      </p>
  );
if (!data)
  return (
      <p aria-live="polite" role="status">
          Loading...
      </p>
  );

 const { title, cookingTime, image, ingredients, method } = data;

 const steps = method.split(/[0-9]+\./).filter((step) => step);

 return (
  <article className="recipe">
    <div className="image-wrapper">
      <img src={image} alt="" />
    </div>
    <div className="recipe-meta">
      <h1>{title}</h1>
      <time dateTime={getCookingTime(cookingTime).dateTime}>
        {getCookingTime(cookingTime).readable}
      </time>
    </div>
    <div className="recipe-ingredients">
      <h3 id="ingredients">Ingredients</h3>
      <ul aria-labelledby="ingredients">
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </div>
    <div className="recipe-steps">
    <div className="recipe-steps">
  <h3 id="steps">Steps</h3>
  <ol aria-labelledby="steps">
    {steps.map((step) => (
      <li key={step}>{step.trim()}</li>
    ))}
  </ol>
  </div>
    </div>
  </article>
);

}