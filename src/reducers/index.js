import { combineReducers } from 'redux';

import authReducers from './authReducers';

// import authUserReducers from './authUserReducers';

export default combineReducers({
  auth: authReducers,
  // authUser: authUserReducers,
});
