import React from "react"
import MainLayout from "./components/MainLayout/MainLayout"
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
  useLocation,
} from "react-router"
import HomePage from "./pages/HomePage/HomePage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import QuestionPage from "./pages/QuestionPage/QuestionPage"
import AddQuestionPageLazy from "./pages/AddQuestionPage/AddQuestionPage.lazy"
import EditQuestionPage from "./pages/EditQuestionPage/EditQuestionPage"
import { AuthProvider } from "./auth/AuthProvider/AuthProvider"
import { useAuth } from "./hooks/useAuth"
import ForbiddenPage from "./pages/ForbiddenPage/ForbiddenPage"

const ProtectedRoutes = () => {
  const { isAuth } = useAuth()
  const location = useLocation()

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location.pathname }} to="/forbidden" replace />
  )
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/question/:id" element={<QuestionPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/addquestion" element={<AddQuestionPageLazy />} />
              <Route path="/editquestion/:id" element={<EditQuestionPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
