import React from "react"
import Button from "../Button/Button"
import { useNavigate } from "react-router-dom"

import reactLogo from "../../assets/react.svg"
import styles from "./Header.module.css"

const Header = () => {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <p onClick={() => navigate("/")}>
        <img src={reactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>
      <div className={styles.headerButtons}>
        <Button onClick={() => navigate("/addquestion")}>Add</Button>
        <Button>Login</Button>
      </div>
    </header>
  )
}

export default Header
