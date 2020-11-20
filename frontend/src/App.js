import React from 'react';
import Routes from './main/routes'
import Toastr from './main/toastr'
import Navbar from './layout/nav'
import Footer from './layout/footer/footer'
import './common/styles/spinner.css'


function App() {
  return (
    <div className="App">
      <div className="min-vh-100">
        <Navbar/>
        <Routes/>
      </div>
      <Footer/>
      <Toastr/>

    </div>
  );
}


export default App;
