import React from "react"
import Button from "../Button/Button"
import { useNavigate } from "react-router-dom"

import reactLogo from "../../assets/react.svg"
import styles from "./Header.module.css"
import { useAuth } from "../../hooks/useAuth"
import { AUTH_STORAGE } from "../../constants"

const Header = () => {
  const navigate = useNavigate()
  const { isAuth, setIsAuth } = useAuth()

  const loginHandler = () => {
    localStorage.setItem(AUTH_STORAGE, !isAuth)
    setIsAuth(!isAuth)
  }

  return (
    <header className={styles.header}>
      <p onClick={() => navigate("/")}>
        <img src={reactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>
      <div className={styles.headerButtons}>
        {isAuth && (
          <Button onClick={() => navigate("/addquestion")}>Add</Button>
        )}

        <Button isActive={!isAuth} onClick={loginHandler}>
          {isAuth ? "LogOut" : "LogIn"}
        </Button>
      </div>
    </header>
  )
}

export default Header
