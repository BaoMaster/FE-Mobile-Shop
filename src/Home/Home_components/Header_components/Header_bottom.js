/* eslint-disable */
import React from 'react';
import { NavLink } from 'react-router-dom';

class Header_bottom extends React.Component {
  render() {
    return (
      <div className='header-bottom clr-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-9'>
              <div className='navbar-header'>
                <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                  <span className='sr-only'>Toggle navigation</span>
                  <span className='icon-bar'></span>
                  <span className='icon-bar'></span>
                  <span className='icon-bar'></span>
                </button>
              </div>
            </div>
            <div className='col-sm-3' style={{ border: 'none' }}>
              <div className='search_box pull-right' style={{ border: 'none' }}>
                <input type='text' placeholder='Searsasasch' style={{ border: 'none' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header_bottom;
