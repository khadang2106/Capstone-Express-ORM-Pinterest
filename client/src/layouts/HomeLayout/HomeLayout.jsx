import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import './HomeLayout.scss';
import Footer from '../../components/Footer/Footer';

export default function HomeLayout() {
  return (
    <div className="pinterest-main">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
