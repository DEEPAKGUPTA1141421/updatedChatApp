import React ,{lazy}from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home=lazy(()=>import("./pages/Home"));
const Login=lazy(()=>import("./pages/Login"));
const Chat=lazy(()=>import("./pages/Chat"));
const Groups=lazy(()=>import("./pages/Groups"));
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/about' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;