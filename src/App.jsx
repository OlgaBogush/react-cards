import React from "react"
import MainLayout from "./components/MainLayout/MainLayout"
import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage/HomePage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import QuestionPage from "./pages/QuestionPage/QuestionPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/addquestion" element={<div>addquestion</div>} />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
