import React, { useActionState } from "react"
import Loader from "../../components/Loader/Loader"
import QuestionForm from "../../components/QuestionForm/QuestionForm"
import delayFn from "../../helpers/delayFn"
import { API_URL } from "../../constants"
import { toast } from "react-toastify"
import { dateFormat } from "../../hooks/dateFormat"
import { useFetch } from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"

import styles from "./EditQuestionPage.module.css"

const editCardAction = async (_prevState, formData) => {
  try {
    await delayFn(2000)
    const obj = Object.fromEntries(formData)
    const questionId = obj.questionId
    const isClearForm = obj.clearForm

    const response = await fetch(`${API_URL}/react/${questionId}`, {
      method: "PATCH",
      body: JSON.stringify({
        question: obj.question,
        answer: obj.answer,
        description: obj.description,
        resources: obj.resources.trim().length
          ? obj.resources.trim().split(",")
          : [],
        level: Number(obj.level),
        completed: false,
        editDate: dateFormat(new Date()),
      }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()

    toast.success("The question has been edited successfully!")
    return isClearForm ? {} : data
  } catch (error) {
    toast.error(error.message)
    return {}
  }
}

const EditQuestion = ({ initialState = {} }) => {
  const navigate = useNavigate()

  const [formState, formAction, isPending] = useActionState(editCardAction, {
    ...initialState,
    clearForm: false,
  })

  const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
    await fetch(`${API_URL}/react/${initialState.id}`, {
      method: "DELETE",
    })
    toast.success("The question has been removed.")
    navigate("/")
  })

  const onRemoveQuestionHandler = () => {
    const isRemove = confirm("Are you sure?")
    isRemove && removeQuestion()
  }

  return (
    <>
      {(isPending || isQuestionRemoving) && <Loader />}

      <h1 className={styles.formTitle}>Edit question</h1>
      <div className={styles.formContainer}>
        <button
          className={styles.removeBtn}
          disabled={isPending || isQuestionRemoving}
          onClick={onRemoveQuestionHandler}
        >
          X
        </button>
        <QuestionForm
          formState={formState}
          formAction={formAction}
          isPending={isPending || isQuestionRemoving}
          submitBtnText="Edit Question"
        />
      </div>
    </>
  )
}

export default EditQuestion
