import React from "react"
import Button from "../Button/Button"

import styles from "./QuestionCard.module.css"

const QuestionCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardLabels}>
        <div>Level: 1</div>
        <div>Not Completed</div>
      </div>
      <h5 className={styles.cardTitle}>Что такое JSX?</h5>
      <div className={styles.cardAnswers}>
        <label>short answer: </label>
        <p className={styles.cardAnswer}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus,
          nemo?
        </p>
      </div>
      <Button onClick={() => {}}>View</Button>
    </div>
  )
}

export default QuestionCard
