import React, { useId } from "react"
import { SearchIcon } from "../icons"

import styles from "./SearchInput.module.css"

const SearchInput = ({ value, handler }) => {
  const inputId = useId()

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={inputId}>
        <SearchIcon className={styles.searchIcon} />
      </label>
      <input
        className={styles.input}
        id={inputId}
        type="text"
        value={value}
        onChange={handler}
        placeholder="search..."
      />
    </div>
  )
}

export default SearchInput
