import React, { useEffect, useState } from "react"
import { API_URL } from "../../constants"
import QuestionCardList from "../../components/QuestionCardList/QuestionCardList"
import Loader from "../../components/Loader/Loader"
import delayFn from "../../helpers/delayFn"

import styles from "./HomePage.module.css"
import { useFetch } from "../../hooks/useFetch"

const HomePage = () => {
  const [cards, setCards] = useState([])
  const [fetchFn, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`)
    const data = await response.json()

    setCards(data)
    return data
  })

  useEffect(() => {
    fetchFn("react")
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList cards={cards} />
    </>
  )
}

export default HomePage
