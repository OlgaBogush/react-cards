import React from "react"
import QuestionCard from "../QuestionCard/QuestionCard"

import styles from "./QuestionCardList.module.css"

const QuestionCardList = ({ cards }) => {
  return (
    <div className={styles.cardList}>
      {cards.map((item, index) => {
        return <QuestionCard {...item} key={index} />
      })}
    </div>
  )
}

export default QuestionCardList
