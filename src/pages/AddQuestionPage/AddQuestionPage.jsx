import React, { useActionState } from "react"
import Button from "../../components/Button/Button"
import delayFn from "../../helpers/delayFn"
import { toast } from "react-toastify"
import { API_URL } from "../../constants"
import Loader from "../../components/Loader/Loader"

import styles from "./AddQuestionPage.module.css"

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
        <form action={formAction} className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="questionField">Question: </label>
            <textarea
              defaultValue={formState.question}
              name="question"
              id="questionField"
              cols="30"
              rows="2"
              required
              placeholder="Please ask a question"
            ></textarea>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="answerField">Short Answer: </label>
            <textarea
              defaultValue={formState.answer}
              name="answer"
              id="answerField"
              cols="30"
              rows="2"
              required
              placeholder="Please enter a short answer"
            ></textarea>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="descriptionField">Description: </label>
            <textarea
              defaultValue={formState.description}
              name="description"
              id="descriptionField"
              cols="30"
              rows="5"
              required
              placeholder="Please enter the full description"
            ></textarea>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="resourcesField">Resources: </label>
            <textarea
              defaultValue={formState.resources}
              name="resources"
              id="resourcesField"
              cols="30"
              rows="5"
              placeholder="Please enter resources separated by commas"
            ></textarea>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="levelField">Level: </label>
            <select name="level" id="levelField" defaultValue={formState.level}>
              <option disabled>Question level</option>
              <hr />
              <option value="1">1 - easiest</option>
              <option value="2">2 - medium</option>
              <option value="3">3 - hardest</option>
            </select>
          </div>
          <label htmlFor="clearFormField" className={styles.clearFormControl}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              defaultChecked={formState.clearForm}
            />
            <span>Clear form after submitting?</span>
          </label>
          <Button isDisabled={isPending}>Add question</Button>
        </form>
      </div>
    </>
  )
}

export default AddQuestionPage
