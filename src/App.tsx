import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import CreatePage from "./pages/create/CreatePage";
import HomePage from "./pages/home/HomePage";
import RecipePage from "./pages/recipe/RecipePage";
import SearchPage from "./pages/search/SearchPage";
import NavBar from "./components/NavBar";
import "./App.css";
  

const router = createBrowserRouter([
  { path: "/",
  element: <LayoutWrapper />, 
  children: [
    {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create",
    element: <CreatePage />,
  },
  {
    path: "/recipes/:recipeId",
    element: <RecipePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
], 
},
]);

function LayoutWrapper() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <RouterProvider router={router} />
  )
}


export default App;
