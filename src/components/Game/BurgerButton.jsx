import React from 'react';

function BurgerButton({ onClick }) {
  return (
    <div className="BurgerButton" onClick={onClick}>
      <div className="BurgerButton--line" />
      <div className="BurgerButton--line" />
      <div className="BurgerButton--line" />
    </div>
  );
}

export default BurgerButton;
