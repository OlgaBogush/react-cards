import React from "react"
import styles from "./MainLayout.module.css"
import { Outlet } from "react-router"
import Header from "../Header/Header"
import { ToastContainer } from "react-toastify"

const MainLayout = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <div className={styles.mainLayout}>
        <Header />
        <div className={styles.mainWrapper}>
          <main className={styles.main}>
            <Outlet />
          </main>
          <footer className={styles.footer}>
            React Question Cards Application | {currentYear} <br />
            by Volha Bohush
          </footer>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default MainLayout
