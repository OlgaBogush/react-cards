import React from "react"
import Button from "../Button/Button"

import reactLogo from "../../assets/react.svg"
import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
      <p>
        <img src={reactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>
      <div className={styles.headerButtons}>
        <Button isDisabled>Add</Button>
        <Button isActive>Login</Button>
      </div>
    </header>
  )
}

export default Header
