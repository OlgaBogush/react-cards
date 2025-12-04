import React from "react"

import styles from "./Button.module.css"

const Button = ({ children, isDisabled, isActive }) => {
  return (
    <button
      className={`${styles.btn} ${isActive ? styles.active : ""}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
