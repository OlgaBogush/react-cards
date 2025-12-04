import React from "react"
import MainLayout from "./components/MainLayout/MainLayout"
import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage/HomePage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<div>forbidden</div>} />
          <Route path="/addquestion" element={<div>addquestion</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
