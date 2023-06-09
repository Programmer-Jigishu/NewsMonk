import './App.css';
import WeatherAsWidget from './components/WeatherAsWidget';
import Stocks from './components/Stocks';
import React, { useRef, useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar'
import Navbar from './components/Navbar';

import News2 from './components/News2';
import { Route, Switch, Routes } from 'react-router-dom';
function App() {
  const ref = useRef(null);
  
  const [navbarSearch, setNavbarSearch] = useState("Search");

  useEffect(() => {
    console.log("Triggered Search" + navbarSearch);
    if (navbarSearch !== "Search") {

    }
  }, [navbarSearch])

  return (
    <>
      <div className='container'>
        <LoadingBar color='#f11946' ref={ref} />
        <Navbar searchQuery={setNavbarSearch} />

      </div>
      <div className="row" style={{ marginTop: "110px" }}>
        <div className="col-sm-12 col-md-8 order-last order-md-first align-items-center">

<h2 id="newsHeader align-self-center">Headlines</h2>
      <Routes>
        <Route path="/search/:id" element={<News2 key="query"  reference={ref} searchQuery={navbarSearch} />}/>
        <Route path="/Top" element={<News2 key="Top"  reference={ref} category="Top" searchQuery={navbarSearch} />}/>
        <Route path="/World" element={<News2 key="World"  reference={ref} category="World" searchQuery={navbarSearch} />}/>
        <Route path="/Politics" element={<News2 key="Politics"  reference={ref} category="Politics" searchQuery={navbarSearch} />}/>
        <Route path="/Business" element={<News2 key="Business"  reference={ref} category="Business" searchQuery={navbarSearch} />}/>
        <Route path="/Sports" element={<News2 key="Sports"  reference={ref} category="Sports" searchQuery={navbarSearch} />}/>
        <Route path="/Entertainment" element={<News2 key="Entertainment"  reference={ref} category="Entertainment" searchQuery={navbarSearch} />}/>
        <Route path="/Technology" element={<News2 key="Technology"  reference={ref} category="Technology" searchQuery={navbarSearch} />}/>
        <Route path="/Science" element={<News2 key="Science"  reference={ref} category="Science" searchQuery={navbarSearch} />}/>
        <Route path="/Food" element={<News2 key="Food"  reference={ref} category="Food" searchQuery={navbarSearch} />}/>
        <Route path="/Environment" element={<News2 key="Environment"  reference={ref} category="Environment" searchQuery={navbarSearch} />}/>
        <Route path="/Health" element={<News2 key="Health"  reference={ref} category="Health" searchQuery={navbarSearch} />}/>
        <Route path="/*" element={<News2 key="default"  reference={ref} searchQuery={navbarSearch} />}/>
      </Routes>

      </div>
      <div className="col-sm-12 col-md-4 order-first order-md-last">
      <WeatherAsWidget />

      </div>
      </div>
      
      <Stocks />
    </>
  );
}

export default App;
