import { useState } from "react"
// import delayFn from "../helpers/delayFn"

export const useFetch = (callback) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchFn = async (arg) => {
    try {
      setIsLoading(true)
      setError("")
      // await delayFn(500)
      const response = await callback(arg)
      return response
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return [fetchFn, isLoading, error]
}
