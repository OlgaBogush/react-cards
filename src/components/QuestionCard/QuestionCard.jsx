import React from "react"
import Button from "../Button/Button"

import styles from "./QuestionCard.module.css"
import { useNavigate } from "react-router-dom"
import Badge from "../Badge/Badge"

const QuestionCard = ({ id, question, answer, level, completed }) => {
  const navigate = useNavigate()
  const levelOption =
    level === 1 ? "primary" : level === 2 ? "warning" : "alert"
  const completedOption = completed ? "success" : "primary"

  return (
    <div className={styles.card}>
      <div className={styles.cardLabels}>
        <Badge option={levelOption}>Level: {level}</Badge>
        <Badge option={completedOption}>
          {completed ? "Completed" : "Not Completed"}
        </Badge>
      </div>
      <h5 className={styles.cardTitle}>{question}</h5>
      <div className={styles.cardAnswers}>
        <label>short answer: </label>
        <p className={styles.cardAnswer}>{answer}</p>
      </div>
      <Button
        onClick={() => {
          navigate(`/question/${id}`)
        }}
      >
        View
      </Button>
    </div>
  )
}

export default QuestionCard
