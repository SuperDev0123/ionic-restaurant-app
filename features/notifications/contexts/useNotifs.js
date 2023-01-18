import { useContext } from "react"

import NotificationContext from "../NotificationContext"
const useNotifs = () => {
  const context = useContext(NotificationContext)

  if (!context)
    throw new Error("NotificationContext must be placed within NotificationProvider")

  return context
}

export default useNotifs
