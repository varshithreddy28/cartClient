import React from 'react'

import Navbar from './components/nav'
import ShoppingList from './components/shoppinglist'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

function App() {
  
  return (
    <div className="App">
      
      <Navbar/>
      <ShoppingList></ShoppingList>
    </div>
  );
}

export default App;
