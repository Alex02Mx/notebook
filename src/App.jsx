import { Header } from "./components/Header/Header"
import { PageForm } from "./components/PageForm/PageForm"
import { PageList } from "./components/PageList/PageList"
import { TaskList } from "./components/TaslList/TaskList"
import { TaskForm } from "./components/TaskForm/TaskForm"
import { ConfirmDelete } from "./components/ConfirmDelete/ConfirmDelete"
import { FeedbackToast} from "./components/FeedbackToast/FeedbackToast"

import { useEffect, useState } from 'react'

import './styles/index.css'


export default function App() {
  
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

  const [showNewForm, setShowNewForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const [showNewFormTask,setShowNewFormTask] = useState(false)
  const [showEditFormTask,setShowEditFormTask] = useState(false)

  const [showPageList, setShowPageList] = useState(true)
  const [showPage, setShowPage] = useState(false)

  const [showTaskForm, setShowTaskForm] = useState(false)

  const [showPageBtns, setShowPageBtns] = useState(true)
  const [showTaskBtns, setShowTaskBtns] = useState(false)

  const [selectedPageId, setSelectedPageId] = useState(null)
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    type: null,
    id: null,
  })

  const [feedback, setFeedback] = useState({
    type: null, // 'success' | 'error' | 'loading'
    message: '',
  })

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

  const isAnyModalOpen = 
      confirmDelete.open ||
      showNewForm ||
      showEditForm ||
      showNewFormTask ||
      showEditFormTask


  useEffect(() => {
    if (isAnyModalOpen){
      document.body.classList.add("body-no-scroll")
    }
    else {
      document.body.classList.remove("body-no-scroll")
    }
    return () => {
      document.body.classList.remove("body-no-scroll")
    }
  }, [isAnyModalOpen])
  
  function showFeedback (type, message, duration= 2500) {
    setFeedback({type, message})
    setTimeout(() => {
      setFeedback({ type: null, message: '' })
    }, duration)
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
    <Header setShowPageBtns={setShowPageBtns}
            setShowTaskBtns={setShowTaskBtns}
            setShowNewForm={setShowNewForm}
            setShowEditForm={setShowEditForm}
            setShowNewFormTask={setShowNewFormTask}
            setShowPageList={setShowPageList}
            setSelectedPageId={setSelectedPageId}
            setShowPage={setShowPage}
            selectedPageId={selectedPageId} 
            deletePageId={deletePageId}
            showPageBtns={showPageBtns}
            showTaskBtns={showTaskBtns}
            setConfirmDelete={setConfirmDelete}
            guardAction={guardAction}
    />
    {showNewForm && (
      <PageForm
        mode="create"
        pagesNoteBook={pagesNoteBook}
        setPagesNoteBook={setPagesNoteBook}
        setSelectedPageId={setSelectedPageId}
        setShowNewForm={setShowNewForm}
        setShowEditForm={setShowEditForm}
        showFeedback={showFeedback}
      />
    )}
    {showEditForm && (
      <PageForm
        mode="edit"
        pagesNoteBook={pagesNoteBook}
        setPagesNoteBook={setPagesNoteBook}
        selectedPageId={selectedPageId}
        setSelectedPageId={setSelectedPageId}
        setShowEditForm={setShowEditForm}
        setShowNewForm={setShowNewForm}
        showFeedback={showFeedback}
      />
    )}
    <PageList pagesNoteBook={pagesNoteBook}
          selectedPageId={selectedPageId}
          setSelectedPageId={setSelectedPageId}
          setShowPage={setShowPage} 
          showPageList={showPageList}
          setShowPageList={setShowPageList} 
          setShowPageBtns={setShowPageBtns}
          setShowTaskBtns={setShowTaskBtns}
          setConfirmDelete={setConfirmDelete}
          setShowNewForm={setShowNewForm}
    />
    <TaskList showPage={showPage} 
          pagesNoteBook={pagesNoteBook}
          selectedPageId={selectedPageId}
          taskList={taskList}
          setTaskList={setTaskList}
          deleteTaskId={deleteTaskId}
          setShowEditFormTask={setShowEditFormTask}
          setSelectedTaskId={setSelectedTaskId}
          setShowNewFormTask={setShowNewFormTask}
          setConfirmDelete={setConfirmDelete}
          guardAction={guardAction}
    />
    {showNewFormTask && (
      <TaskForm 
          taskMode = "create"
          setTaskList={setTaskList}
          showTaskForm={showTaskForm}
          setShowTaskForm={setShowTaskForm}
          selectedPageId={selectedPageId}
          setShowNewFormTask={setShowNewFormTask}
          setShowEditFormTask={setShowEditFormTask}
          taskList={taskList}
          selectedTaskId={selectedTaskId}
          showFeedback={showFeedback}
      />      
    )}
    {showEditFormTask && (
      <TaskForm 
          taskMode = "edit"
          setTaskList={setTaskList}
          showTaskForm={showTaskForm}
          setShowTaskForm={setShowTaskForm}
          selectedPageId={selectedPageId}
          setShowNewFormTask={setShowNewFormTask}
          setShowEditFormTask={setShowEditFormTask}
          taskList={taskList}
          selectedTaskId={selectedTaskId}
          showFeedback={showFeedback}
      />      
    )}
    {confirmDelete.open && (
      <ConfirmDelete confirmDelete={confirmDelete}
                    setConfirmDelete={setConfirmDelete} 
                    deletePageId={deletePageId}
                    deleteTaskId={deleteTaskId}
                    setFeedback={setFeedback}
      />
    )}
    <FeedbackToast feedback={feedback}
    />
   </>
  )
}  

 