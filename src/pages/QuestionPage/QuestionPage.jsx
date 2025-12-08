import React, { useEffect, useId, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Badge from "../../components/Badge/Badge"
import Button from "../../components/Button/Button"
import { useFetch } from "../../hooks/useFetch"
import { API_URL } from "../../constants"
import Loader from "../../components/Loader/Loader"
import SmallLoader from "../../components/Loader/SmallLoader"

import styles from "./QuestionPage.module.css"

const QuestionPage = () => {
  const navigate = useNavigate()
  const checkboxId = useId()
  const [isChecked, setIsChecked] = useState(false)
  const { id } = useParams()
  const [card, setCard] = useState(null)

  // custom hook 1
  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`)
    const data = await response.json()
    setCard(data)
  })

  // custom hook 2
  const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
    const response = await fetch(`${API_URL}/react/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: isChecked,
      }),
    })
    const data = await response.json()
    setCard(data)
  })

  useEffect(() => {
    fetchCard()
  }, [])

  useEffect(() => {
    card !== null && setIsChecked(card.completed)
  }, [card])

  const levelOption = () =>
    card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert"

  const completedOption = () => (card.completed ? "success" : "primary")

  const onChangeCheckboxHandler = () => {
    setIsChecked(!isChecked)
    updateCard(!isChecked)
  }

  return (
    <>
      {isCardLoading && <Loader />}

      {card !== null && (
        <div className={styles.container}>
          <div className={styles.cardLabels}>
            <Badge option={levelOption()}>Level: {card.level}</Badge>
            <Badge option={completedOption()}>
              {card.completed ? "Completed" : "Not Completed"}
            </Badge>
            {card.editDate && (
              <p className={styles.editDate}>Edited: {card.editDate}</p>
            )}
          </div>
          <h5 className={styles.cardTitle}>{card.question}</h5>
          <p className={styles.cardDescription}>{card.description}</p>
          <div className={styles.cardAnswers}>
            <label>short answer: </label>
            <p className={styles.cardAnswer}>{card.answer}</p>
          </div>

          <ul className={styles.cardLinks}>
            Resources:{" "}
            {card.resources.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.trim()} target="_blank" rel="noreferrer">
                    {item.trim()}
                  </a>
                </li>
              )
            })}
          </ul>

          <label htmlFor={checkboxId} className={styles.cardCheckbox}>
            <input
              type="checkbox"
              id={checkboxId}
              className={styles.checkbox}
              checked={isChecked}
              onChange={onChangeCheckboxHandler}
              disabled={isCardUpdating}
            />
            <span>mark question as completed</span>
            {isCardUpdating && <SmallLoader />}
          </label>

          <Button
            onClick={() => {
              navigate(`/editquestion/${card.id}`)
            }}
            isDisabled={isCardUpdating}
          >
            Edit Question
          </Button>

          <Button
            onClick={() => {
              navigate("/")
            }}
            isDisabled={isCardUpdating}
          >
            Back
          </Button>
        </div>
      )}
    </>
  )
}

export default QuestionPage
