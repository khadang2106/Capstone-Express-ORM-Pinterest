import React from 'react';
import './Shop.scss';

export default function Shop() {
  return (
    <div className="shop">
      <div className="d-flex justify-content-center align-items-center">
        <div className="left">
          <h1>See it, make it, try it, do it</h1>
          <p>
            The best part of Pinterest is discovering new things and ideas from
            people around the world.
          </p>
          <button className="btn pinterest-btn">Explore</button>
        </div>
        <div className="right">
          <img
            className="img-fluid"
            src={process.env.PUBLIC_URL + '/imgs/shop.png'}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
