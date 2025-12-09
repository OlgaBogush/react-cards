import React, { Suspense } from "react"
import styles from "./MainLayout.module.css"
import { Outlet } from "react-router"
import Header from "../Header/Header"
import { ToastContainer } from "react-toastify"
import Loader from "../Loader/Loader"

const MainLayout = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <div className={styles.mainLayout}>
        <Header />
        <div className={styles.mainWrapper}>
          <main className={styles.main}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
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
