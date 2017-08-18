

import React from 'react';
import { Link } from 'react-router-dom';

function MainMenu() {
  return (
    <div className="MainMenu">
      <h1>Меню</h1>
      <Link className="MainMenu--navbar--button" to="/game">
        Начать игру
      </Link>
      <p className="MainMenu--navbar--text">Всероссийский фестиваль энергосбережения #ВместеЯрче проводится при поддержке Минэнерго России, Минобрнауки России, Росмолодежи, ГК "Фонд содействия реформированию ЖКХ", Министерства культуры России, фонда «Росконгресс» и Т+</p>
      <img className="MainMenu--navbar--logo" src="img/main_logo.png" alt="t +" />
    </div>
  );
}

export default MainMenu;
