/* eslint-disable */
import React from 'react';
import { NavLink } from 'react-router-dom';

import Error from '../../404.png';
import Logo from '../../image/shoplogo.png';

class Not_found extends React.Component {
  render() {
    return (
      <div>
        <div className='container text-center'>
          <div className='logo-404'>
            <NavLink to='/'>
              <img src={Logo} alt='' />
            </NavLink>
          </div>
          <div className='content-404'>
            <img src={Error} className='img-responsive' alt='' />
            <h1>
              <b>OPPS!</b> We Couldn’t Find this Page
            </h1>
            <p>Uh... So it looks like you brock something. The page you are looking for has up and Vanished.</p>
            <h2>
              <NavLink to='/'>Bring me back Home</NavLink>
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Not_found;
