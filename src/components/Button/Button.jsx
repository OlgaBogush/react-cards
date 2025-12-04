import React from "react"

import styles from "./Button.module.css"

const Button = ({ children, onClick, isDisabled, isActive }) => {
  return (
    <button
      className={`${styles.btn} ${isActive ? styles.active : ""}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
