import React from 'react';
import './Header.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import { setUserInfoAction } from '../../store/actions/userAction';
const { Search } = Input;

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);

  const handleLogout = () => {
    localStorage.removeItem('USER_INFO');
    dispatch(setUserInfoAction(null));
    navigate('/');
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className="header">
      {userState?.userInfo ? (
        <div className="container-fluid d-flex align-items-center justify-content-between auth-header">
          <div className="header-link">
            <div className="action-zone d-flex">
              <NavLink className="btn action-btn home-btn" to={'/'}>
                Home
              </NavLink>
              <NavLink className="btn action-btn create-btn" to={'/create'}>
                Create
              </NavLink>
            </div>
          </div>
          <div className="header-search w-100">
            <Search placeholder="Search..." allowClear onSearch={onSearch} />
          </div>
          <div className="header-profile">
            <button className="btn profile-btn">
              <i className="fa-solid fa-bell" />
            </button>
            <button className="btn profile-btn">
              <i className="fa-solid fa-comment-dots" />
            </button>
            <div className="user-profile dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  style={{ width: '30px' }}
                  src={
                    userState.userInfo.anh_dai_dien === ''
                      ? 'https://static.thenounproject.com/png/363639-200.png'
                      : userState.userInfo.anh_dai_dien
                  }
                  alt=""
                />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <span className="greeting">
                    Welcome {userState.userInfo.ho_ten}
                  </span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    // onClick={() => navigate(`/profile`)}
                    className="dropdown-item profile-link"
                  >
                    <i className="fa-solid fa-user" />
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-btn"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket" />
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid d-flex justify-content-between">
          <div className="header-left">
            <NavLink className="logo-pinterest" to={'/'}>
              <i className="fa-brands fa-pinterest" />
              <h1>Pinterest</h1>
            </NavLink>
            <div className="left-item">
              <ul className="d-flex">
                <li>
                  <a href="#">Today</a>
                </li>
                <li>
                  <a href="#">Watch</a>
                </li>
                <li>
                  <a href="#">Shop</a>
                </li>
                <li>
                  <a href="#">Explore</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-right">
            <div className="right-item">
              <ul className="d-flex">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Business</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div className="login-btn">
              <button
                className="btn pinterest-btn"
                onClick={() => {
                  navigate('/login');
                }}
              >
                Log in
              </button>
            </div>
            <div className="signup-btn">
              <button
                className="btn pinterest-btn"
                onClick={() => {
                  navigate('/signup');
                }}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
