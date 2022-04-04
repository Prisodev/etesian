import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
  const [lid, setLid] = useState("");
  const history = useHistory();

  useEffect(() => {
    console.log(localStorage.letter);

    if (localStorage.letter) {
      setLid(localStorage.letter);
    } else {
      localStorage.setItem("letter", "A");
      setLid("A");
    }
    history.push(`/${localStorage.letter}`);
  }, [history]);

  const handleClick = () => {
    if (localStorage.letter) {
      history.push(`/${localStorage.letter}`);
      setLid(localStorage.letter);
    }
  };

  const handleChange = (e) => {
    var letter = e.target.value.toUpperCase();

    if (letter.length > 1) {
      letter = letter.substring(1);
    }

    if (/^[a-zA-Z]/.test(letter)) {
      console.log(letter);
      setLid(letter);
      localStorage.setItem("letter", letter);
      history.push(`/${letter}`);
    }
  };

  return (
    <nav className='navbar'>
      <ul>
        <li className='logo' onClick={handleClick}>
          Cocktail & Co
        </li>
        <input
          id='input'
          type='text'
          maxLength='2'
          size='2'
          onChange={(e) => handleChange(e)}
          onClick={(e) => setLid("")}
          value={lid}
        />
      </ul>
    </nav>
  );
}
