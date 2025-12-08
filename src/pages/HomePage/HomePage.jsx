import React, { useEffect, useMemo, useRef, useState } from "react"
import { API_URL } from "../../constants"
import QuestionCardList from "../../components/QuestionCardList/QuestionCardList"
import Loader from "../../components/Loader/Loader"

import styles from "./HomePage.module.css"

// const DEFAULT_PER_PAGE = 10

// custom hook
import { useFetch } from "../../hooks/useFetch"
import SearchInput from "../../components/SearchInput/SearchInput"
import Button from "../../components/Button/Button"

const HomePage = () => {
  const [cards, setCards] = useState({})
  const [value, setValue] = useState("")
  const [sortValue, setSortValue] = useState("")
  const controlsContainerRef = useRef()
  const [count, setCount] = useState("10")
  const [params, setParams] = useState(`?_page=1&_per_page=${count}`)
  // custom hook
  const [fetchFn, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`)
    const data = await response.json()

    setCards(data)
    return data
  })

  const a = useMemo(() => {
    if (cards?.data) {
      if (value.trim()) {
        return cards.data.filter((item) =>
          item.question.toLowerCase().includes(value.toLowerCase())
        )
      } else {
        return cards.data
      }
    }
    return []
  }, [cards, value])

  const pagination = useMemo(() => {
    const totalCardsCount = cards?.pages || 0
    return Array(totalCardsCount)
      .fill(0)
      .map((_, index) => index + 1)
  }, [cards])

  useEffect(() => {
    fetchFn(`react${params}`)
  }, [params])

  const onSearchChangeHandler = (e) => {
    setValue(e.target.value)
  }
  const onSortValueHandler = (e) => {
    setSortValue(e.target.value)
    setParams(`?_page=${1}&_per_page=${count}&${e.target.value}`)
  }

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setParams(
        `?_page=${e.target.textContent}&_per_page=${count}&${sortValue}`
      )
    }
    controlsContainerRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const getItemPageNumber = () => {
    return cards.next === null ? cards.last : cards.next - 1
  }

  const onCountHandler = (e) => {
    setCount(e.target.value)
    setParams(`?_page=${1}&_per_page=${e.target.value}&${sortValue}`)
  }

  return (
    <>
      <div className={styles.controlsContainer} ref={controlsContainerRef}>
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

        <select
          value={count}
          onChange={onCountHandler}
          className={styles.select}
        >
          <option disabled>count</option>
          <hr />
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <QuestionCardList cards={a} />

      {a.length === 0 ? (
        <p className={styles.noCardsInfo}>No cards...</p>
      ) : (
        pagination.length > 1 && (
          <div
            className={styles.paginationContainer}
            onClick={paginationHandler}
          >
            {pagination.map((item) => {
              return (
                <Button key={item} isActive={item === getItemPageNumber()}>
                  {item}
                </Button>
              )
            })}
          </div>
        )
      )}
    </>
  )
}

export default HomePage
