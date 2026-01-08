import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

import styles from "./ForbiddenPage.module.css"

const ForbiddenPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { isAuth } = useAuth()

  const fromPage = location.state?.from || "/"

  useEffect(() => {
    isAuth && navigate(fromPage, { replace: true })
  }, [isAuth])

  return <h2 className={styles.title}>Page is forbidden!</h2>
}

export default ForbiddenPage
