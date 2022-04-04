import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

import "./Home.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [drinks, setDrinks] = useState("");
  const { data: cocktails, isPending, error } = useFetch(url, "GET");

  const { lid } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${lid}`);
    if (cocktails && cocktails.drinks !== null) {
      setDrinks(cocktails.drinks);
    } else {
      setDrinks(false);
    }
  }, [url, cocktails, lid]);

  return (
    <div className='cocktail-list'>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <ul>
        {drinks &&
          drinks.map((drink) => (
            <li key={drink.idDrink}>
              <Link to={`/singledrink/${drink.idDrink}`}>
                <div className='cocktail-card'>
                  <div>
                    <img src={drink.strDrinkThumb} alt={drink.trDrink} />
                  </div>
                  <div>
                    <h3>{drink.strDrink}</h3>
                  </div>
                  <div className='checked hidden'></div>
                </div>
              </Link>
            </li>
          ))}
        <i aria-hidden='true'></i>
        <i aria-hidden='true'></i>

        {!drinks && <p>No drinks with this letter</p>}
      </ul>
    </div>
  );
}
