import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

import "./Singledrink.css";

export default function Singledrink() {
  const [url, setUrl] = useState("");
  const [drink, setDrink] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const { data: cocktail, isPending, error } = useFetch(url, "GET");
  const { id } = useParams();

  useEffect(() => {
    setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

    if (cocktail && cocktail.drinks !== null) {
      setDrink(cocktail.drinks);
      setIngredients([]);
      for (var i = 1; i < 18; i++) {
        if (cocktail.drinks[0]["strIngredient" + i] == null) {
          break;
        }

        ingredients.push({
          key: i,
          name: cocktail.drinks[0]["strIngredient" + i],
        });
      }
      setIngredients(ingredients);
    } else {
      setDrink(false);
    }
  }, [url, cocktail, id, ingredients]);

  return (
    <div className='cocktail-single'>
      <Link to={`/`}>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <ul>
          {drink &&
            drink.map((drink) => (
              <li key={drink.idDrink}>
                <div className='cocktail-single-card'>
                  <div>
                    <img src={drink.strDrinkThumb} alt={drink.trDrink} />
                  </div>

                  <div>
                    <h3>{drink.strDrink}</h3>
                    <p>{drink.strInstructions}</p>
                    <br />
                    <div className='ingredients'>
                      ingredients:
                      {ingredients &&
                        ingredients.map((ingredient) => (
                          <em key={ingredient.key}> {ingredient.name}</em>
                        ))}
                    </div>
                  </div>
                  <div className='checked hidden'></div>
                </div>
              </li>
            ))}
          {!drink && <p>No drinks with this letter</p>}
        </ul>
      </Link>
    </div>
  );
}
