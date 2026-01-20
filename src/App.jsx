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
    showNewForm,
    showEditForm,
    showNewFormTask,
    showEditFormTask,
    confirmDelete,
    showFeedback,
    setSelectedPageId,
    setSelectedTaskId,
  } = useAppUI()

  
  const [pagesNoteBook, setPagesNoteBook] = useState(() => getLocalStorage("PAGES", []) )
  useEffect(() => {
    localStorage.setItem("PAGES", JSON.stringify(pagesNoteBook))
  },[pagesNoteBook])
  
  const [taskList, setTaskList] = useState(() => getLocalStorage("TASKS", [] ) )
  useEffect( () => {
    localStorage.setItem("TASKS", JSON.stringify(taskList))
  },[taskList])

  function getLocalStorage(key, defaulValue ){
    try{
      const item = localStorage.getItem(key)
      return  item ? JSON.parse(item) : defaulValue
    }
    catch{
      return defaulValue
    }
  }

  const sources = {
    task: {
      list: taskList,
    },
    page: {
      list: pagesNoteBook,
    },
  }

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

  function guardAction({ type, action, id, onSuccess}){
    const source = sources[type] 
    const rule = rules[type]?.[action]

    if (!source || !rule) {
      console.warn("Tipo no soportado", type, action)
      setFeedback({
        type: "error",
        message: "Accion invalida"
    })
    return
  }

    if (rule.exist) {
      const exists = source.list.some( item => item.id === id)

      if (!exists) {
        setFeedback({
          type : "error",
          message : rule.message,
        })
        return 
      }
    }
    onSuccess()
  }

  function deletePageId(idpage) {
    setPagesNoteBook(pages => pages.filter( page => page.id !== idpage))
    setTaskList(tasks => tasks.filter( task => task.pageId !== idpage))
    setSelectedPageId(null)
    showFeedback('success', 'Página eliminada correctamente')
  }

  function deleteTaskId(idtask) {
    setTaskList(tasks => tasks.filter( task => task.id !== idtask))
    setSelectedTaskId(null)
    showFeedback('success', 'Tarea eliminada correctamente')
  }

  return (
   <>
    <Header 
        guardAction={guardAction}
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
        guardAction={guardAction}
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

 