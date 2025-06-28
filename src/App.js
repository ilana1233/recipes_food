import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Recipe from './pages/Recipe.jsx';
import AddRecipes from './pages/AddRecipes.jsx';
import EditRecipes from './pages/EditRecipes.jsx';
import Navbar from './components/Navbar.jsx';
import RecipeDetails from './pages/RecipeDetails.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
    <Routes>
      <Route path="/" element={<Recipe /> } ></Route>

      <Route path="/login" element={<Login /> } ></Route>

      <Route path="register" element={<Register /> } ></Route>

      <Route path="/addRecipes" element={<AddRecipes /> } ></Route>

      <Route path="/edit/:id" element={<EditRecipes /> } ></Route>

      <Route path="/recipe/:id" element={<RecipeDetails /> }></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;


