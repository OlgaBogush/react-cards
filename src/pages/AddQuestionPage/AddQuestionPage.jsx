import React, { useActionState } from "react"
import delayFn from "../../helpers/delayFn"
import { toast } from "react-toastify"
import { API_URL } from "../../constants"
import Loader from "../../components/Loader/Loader"

import styles from "./AddQuestionPage.module.css"
import QuestionForm from "../../components/QuestionForm/QuestionForm"

const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn(2000)
    const obj = Object.fromEntries(formData)
    const isClearForm = obj.clearForm

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: obj.question,
        answer: obj.answer,
        description: obj.description,
        resources: obj.resources.trim().length
          ? obj.resources.trim().split(",")
          : [],
        level: Number(obj.level),
        completed: false,
        editDate: undefined,
      }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()

    toast.success("A new question has been created successfully!")
    return isClearForm ? {} : data
  } catch (error) {
    toast.error(error.message)
    return {}
  }
}

const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, {
    clearForm: true,
  })

  return (
    <>
      {isPending && <Loader />}

      <h1 className={styles.formTitle}>Add new question</h1>
      <div className={styles.formContainer}>
        <QuestionForm
          formState={formState}
          formAction={formAction}
          submitBtnText="Add Question"
        />
      </div>
    </>
  )
}

export default AddQuestionPage
