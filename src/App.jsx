import {guardAction} from "./logic/guardAction"
import { usePages } from "./hooks/usePages"
import { useTasks } from "./hooks/useTasks"
/* ===== Components ===== */
import { Header } from "./components/Header/Header"
import { PageForm } from "./components/PageForm/PageForm"
import { PageList } from "./components/PageList/PageList"
import { TaskList } from "./components/TaslList/TaskList"
import { TaskForm } from "./components/TaskForm/TaskForm"
import { ConfirmDelete } from "./components/ConfirmDelete/ConfirmDelete"
import { FeedbackToast} from "./components/FeedbackToast/FeedbackToast"
/* ===== Hooks ===== */
import { useEffect, useState } from 'react'
/* ===== Styles ===== */
import './styles/index.css'
/* ===== Context ===== */
import { useAppUI } from "./context/AppUIContext"

export default function App() {

    const {
      showFeedback,
      setSelectedPageId,
      setSelectedTaskId,
      showNewForm,
      showEditForm,
      showNewFormTask,
      showEditFormTask,
      confirmDelete,
      setFeedback
      /*
      selectedPageId,
      selectedTaskId,
      */
  } = useAppUI()

  const {
    pagesNoteBook,
    setPagesNoteBook,
    removePage,
  } = usePages(showFeedback)

  const {
    taskList,
    setTaskList,
    removeTask,
  } = useTasks(showFeedback)

  const rules = {
    task : {
      delete : {
        exist : true,
        message : "La tarea ya no existe",
      },
      edit : {
        exist : true,
        message : "No se puede editar esta tarea",
      },
    },
    page : {
      delete : {
        exist : true,
        message : "La pagina ya no existe",
      },
      edit : {
        exist : true,
        message : "No se puede editar esta pagina",
      },
    },
  }

  const sources = {
    task: {
      list: taskList,
    },
    page: {
      list: pagesNoteBook,
    },
  }

  function handleGuardAction({ type, action, id, onSuccess }) {
    guardAction({
      type,
      action,
      id,
      onSuccess,
      sources,
      rules,
      setFeedback,
    })
  }

  function deletePageId(id) {
    removePage({
      pageId: id,
      setTaskList,
      setSelectedPageId,
    })
  }

  function deleteTaskId(id) {
    removeTask({
      taskId: id,
      setSelectedTaskId,
    })
  }

  return (
   <>
    <Header 
        handleGuardAction={handleGuardAction}
    />
    {showNewForm && (
      <PageForm
          mode="create"
          pagesNoteBook={pagesNoteBook}
          setPagesNoteBook={setPagesNoteBook}
      />
    )}
    {showEditForm && (
      <PageForm
          mode="edit"
          pagesNoteBook={pagesNoteBook}
          setPagesNoteBook={setPagesNoteBook}
      />
    )}
    <PageList 
        pagesNoteBook={pagesNoteBook}
    />
    <TaskList 
        pagesNoteBook={pagesNoteBook}
        taskList={taskList}
        setTaskList={setTaskList}
        handleGuardAction={handleGuardAction}
    />
    {showNewFormTask && (
      <TaskForm 
          taskMode = "create"
          taskList={taskList}
          setTaskList={setTaskList}
      />      
    )}
    {showEditFormTask && (
      <TaskForm 
          taskMode = "edit"
          taskList={taskList}
          setTaskList={setTaskList}
      />      
    )}
    {confirmDelete.open && (
      <ConfirmDelete
          deletePageId={deletePageId}
          deleteTaskId={deleteTaskId}
      />
    )}
    <FeedbackToast />
   </>
  )
}  

 