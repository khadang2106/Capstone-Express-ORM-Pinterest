import React from 'react';
import './Home.scss';
import Carousel from './components/Carousel/Carousel';
import Search from './components/Search/Search';
import Shop from './components/Shop/Shop';
import { useSelector } from 'react-redux';

export default function Home() {
  const userState = useSelector((state) => state.userReducer);

  return (
    <>
      {userState?.userInfo ? (
        <div></div>
      ) : (
        <>
          <Carousel />

          <Search />

          <Shop />
        </>
      )}
    </>
  );
}
