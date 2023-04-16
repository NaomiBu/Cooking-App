import "./SearchPage.css";
import RecipeList, {type Recipe} from "../../components/RecipeList";
import { useFetch } from "../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";


export default function SearchPage() {
  
  let [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { data, error } = useFetch<Recipe[]>(`process.env.REACT_APP_DB_URL)?q=${query}`);


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

  return (
  <>
  <RecipeList recipes={data} />
  <h2> Recipes including "{query}"</h2>
  </>
  );
}
