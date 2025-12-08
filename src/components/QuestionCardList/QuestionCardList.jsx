import React, { memo } from "react"
import QuestionCard from "../QuestionCard/QuestionCard"

import styles from "./QuestionCardList.module.css"

const QuestionCardList = memo(({ cards }) => {
  return (
    <div className={styles.cardList}>
      {cards.map((item, index) => {
        return <QuestionCard {...item} key={index} />
      })}
    </div>
  )
})

export default QuestionCardList
