import React, { useEffect, useMemo, useState } from "react"
import { API_URL } from "../../constants"
import QuestionCardList from "../../components/QuestionCardList/QuestionCardList"
import Loader from "../../components/Loader/Loader"

import styles from "./HomePage.module.css"

// custom hook
import { useFetch } from "../../hooks/useFetch"
import SearchInput from "../../components/SearchInput/SearchInput"

const HomePage = () => {
  const [cards, setCards] = useState([])
  const [value, setValue] = useState("")
  const [sortValue, setSortValue] = useState("")
  // custom hook
  const [fetchFn, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`)
    const data = await response.json()

    setCards(data)
    return data
  })

  const a = useMemo(
    () =>
      cards.filter((item) =>
        item.question.toLowerCase().includes(value.toLowerCase())
      ),
    [cards, value]
  )

  useEffect(() => {
    fetchFn(`react?${sortValue}`)
  }, [sortValue])

  const onSearchChangeHandler = (e) => {
    setValue(e.target.value)
  }
  const onSortValueHandler = (e) => {
    setSortValue(e.target.value)
  }

  return (
    <>
      <div className={styles.controlsContainer}>
        <SearchInput value={value} handler={onSearchChangeHandler} />
        <select
          value={sortValue}
          onChange={onSortValueHandler}
          className={styles.select}
        >
          <option>sort by</option>
          <hr />
          <option value="_sort=level">level ASC</option>
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">completed ASC</option>
          <option value="_sort=-completed">completed DESC</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      {a.length === 0 && <p className={styles.noCardsInfo}>No cards...</p>}
      <QuestionCardList cards={a} />
    </>
  )
}

export default HomePage
