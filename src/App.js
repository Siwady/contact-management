import logo from './logo.svg';
import './App.css';
import Contact from './components/Contact';
import { Routes, Route } from 'react-router-dom'
import ContactForm from './components/Contact/ContactForm';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Contact/>}>
        </Route>
         <Route path="/contact" element={<ContactForm/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
