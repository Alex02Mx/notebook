import { createContext, useContext, useEffect, useState } from "react"

const AppUIContext = createContext(null)

export function AppUIProvider({ children }) {
  /* ===== UI FLAGS ===== */
  const [showPageBtns, setShowPageBtns] = useState(true)
  const [showTaskBtns, setShowTaskBtns] = useState(false)

  const [showPageList, setShowPageList] = useState(true)
  const [showPage, setShowPage] = useState(false)

  const [showNewForm, setShowNewForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const [showNewFormTask, setShowNewFormTask] = useState(false)
  const [showEditFormTask, setShowEditFormTask] = useState(false)
  
  /* ===== SELECTED IDs ===== */
  const [selectedPageId, setSelectedPageId] = useState(null)
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  /* ===== FEEDBACK ===== */
  const [feedback, setFeedback] = useState({
    type: null,
    message: "",
  })

  function showFeedback(type, message, duration = 2500) {
    setFeedback({ type, message })
    setTimeout(() => {
      setFeedback({ type: null, message: "" })
    }, duration)
  }

  /* ===== CONFIRM DELETE ===== */
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    type: null,
    id: null,
  })

  /* ===== BODY SCROLL ===== */
  const isAnyModalOpen =
    confirmDelete.open ||
    showNewForm ||
    showEditForm ||
    showNewFormTask ||
    showEditFormTask

  useEffect(() => {
    document.body.classList.toggle("body-no-scroll", isAnyModalOpen)
    return () => document.body.classList.remove("body-no-scroll")
  }, [isAnyModalOpen])

  return (
    <AppUIContext.Provider
      value={{
        /* flags */
        showPageBtns,
        showTaskBtns,
        showPageList,
        showPage,

        /* setters */
        setShowPageBtns,
        setShowTaskBtns,
        setShowPageList,
        setShowPage,

        /* forms */
        showNewForm,
        showEditForm,
        showNewFormTask,
        showEditFormTask,
        setShowNewForm,
        setShowEditForm,
        setShowNewFormTask,
        setShowEditFormTask,

        /* selection */
        selectedPageId,
        selectedTaskId,
        setSelectedPageId,
        setSelectedTaskId,

        /* feedback */
        feedback,
        setFeedback,
        showFeedback,

        /* confirm delete */
        confirmDelete,
        setConfirmDelete,
      }}
    >
      {children}
    </AppUIContext.Provider>
  )
}

/* ===== custom hook ===== */
export function useAppUI() {
  const context = useContext(AppUIContext)
  if (!context) {
    throw new Error("useAppUI must be used inside AppUIProvider")
  }
  return context
}