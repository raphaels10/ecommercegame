import React from 'react';
import Routes from './main/routes'
import Toastr from './main/toastr'
import Navbar from './layout/nav'
import './common/styles/spinner.css'


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes/>
      <Toastr/>

    </div>
  );
}


export default App;
