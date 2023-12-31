import React from 'react';
import './Search.scss';

export default function Search() {
  return (
    <div className="search">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <div className="left">
            <img
              className="search1"
              src={process.env.PUBLIC_URL + '/imgs/search1.png'}
              alt=""
            />
            <img
              className="search2"
              src={process.env.PUBLIC_URL + '/imgs/search2.png'}
              alt=""
            />
            <img
              className="search3"
              src={process.env.PUBLIC_URL + '/imgs/search3.png'}
              alt=""
            />
            <img
              className="search4"
              src={process.env.PUBLIC_URL + '/imgs/search4.png'}
              alt=""
            />
          </div>
          <div className="right">
            <h1>Search for an idea</h1>
            <p>
              What do you want to try next? Think of something you’re into—like
              “easy chicken dinner”—and see what you find.
            </p>
            <button className="btn pinterest-btn">Explore</button>
          </div>
        </div>
      </div>
    </div>
  );
}
