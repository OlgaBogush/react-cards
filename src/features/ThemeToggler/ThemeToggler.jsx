import React from "react"
import { useTheme } from "../../hooks/useTheme"
import { THEME_STORAGE } from "../../constants"

import styles from "./ThemeToggler.module.css"

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()

  theme === "dark"
    ? document.body.classList.add("darkLayout")
    : document.body.classList.remove("darkLayout")

  const onChangeHandler = (e) => {
    const isChecked = e.target.checked === true
    const updatedTheme = isChecked ? "dark" : "light"

    setTheme(updatedTheme)

    isChecked
      ? document.body.classList.add("darkLayout")
      : document.body.classList.remove("darkLayout")

    localStorage.setItem(THEME_STORAGE, updatedTheme)
  }

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        onChange={onChangeHandler}
        checked={theme === "dark"}
      />
      <span className={styles.slider}></span>
    </label>
  )
}

export default ThemeToggler
