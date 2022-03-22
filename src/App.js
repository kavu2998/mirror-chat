import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import Header from './components/Header';
import PrivateRoute from './components/privateRoute';
import ChatRoom from './components/ChatRoom';
import Home from './components/Home';
import userReducer from './state/userReducer'

import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ userReducer })
const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {

  return (
    <Provider store={store}>
      <Router >
        <Header />
        <div className='center'>
          <Routes>
            <Route path="/chat/:name" element={
              <PrivateRoute>
                <ChatRoom />
              </PrivateRoute>} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
