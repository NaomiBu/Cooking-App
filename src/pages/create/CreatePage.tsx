import "./CreatePage.css";
import { useForm } from "../../hooks/useForm";
import { FormEvent } from "react";
import { type Recipe } from "../../components/RecipeList";
import { useFetch } from "../../hooks/useFetch"

// type NewRecipe = {
//   title: string;
//   ingredients: string[];
//   method: string;
//   cookingTime: number;
// };

type NewRecipe = Omit<Recipe, "id">;
type RecipeForm = Pick<NewRecipe, Exclude<keyof NewRecipe, "ingredients">> & {
  ingredients: string;
};

const initialFormData = {
  title: "",
  method: "",
  image: "",
  cookingTime: 30,
  ingredients: "",
};

  
  export default function Create() {
    const { formData, updateFormField } = useForm<RecipeForm>(initialFormData);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // prevent the default submit event which reloads the page
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        const ingredientsAsArray = formData.ingredients
          .split(",")
          .map((ingredient) => ingredient.trim());
      
        postData({
          ...formData,
          ingredients: ingredientsAsArray,
        });
      };
    };
    return (
      <form className="create-form" onSubmit={handleSubmit}>
        <h2>Create recipe</h2>
        <p>
          Required fields are followed by{" "}
          <strong>
            <span aria-label="required">*</span>
          </strong>
        </p>
        <label htmlFor="title">
      Title
      <strong>
          <span aria-label="required">*</span>
      </strong>
  </label>
  <input
      type="text"
      id="title"
      name="title"
      onChange={(e) => updateFormField(e)}
      value={formData.title}
      placeholder="Veggie Pizza"
      required
  />
  <label htmlFor="image">
      Image
      <strong>
          <span aria-label="required">*</span>
      </strong>
  </label>
  <input
      type="url"
      id="image"
      name="image"
      onChange={(e) => updateFormField(e)}
      value={formData.image}
      placeholder="<https://images.unsplash.com/your-image-url>"
      required
  />
  <label htmlFor="method">
      Method{" "}
      <strong>
          <span aria-label="required">*</span>
      </strong>
  </label>
  <textarea
      id="method"
      name="method"
      onChange={(e) => updateFormField(e)}
      value={formData.method}
      required
  />
<label htmlFor="cookingTime">
      Cooking time (in minutes){" "}
      <strong>
          <span aria-label="required">*</span>
      </strong>
  </label>
  <input
      type="number"
      id="cookingTime"
      name="cookingTime"
      onChange={(e) => updateFormField(e)}
      value={formData.cookingTime}
      required
  />
  <label htmlFor="ingredients">Ingredients (separated by a comma)</label>
  <input
      type="text"
      id="ingredients"
      name="ingredients"
      onChange={(e) => updateFormField(e)}
      value={formData.ingredients}
      placeholder="2 onions, 1 clove of garlic"
  />
        <input type="submit" value="Create" className="btn btn-primary" />
      </form>
    );
    
  }
  