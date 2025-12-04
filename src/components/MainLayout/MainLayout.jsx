import React from "react"
import styles from "./MainLayout.module.css"
import { Outlet } from "react-router"

const MainLayout = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className={styles.mainLayout}>
      <header>header</header>
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
  )
}

export default MainLayout
