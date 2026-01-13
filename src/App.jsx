import { Header } from "./components/Header"
import { PageForm } from "./components/PageForm"
import { PageList } from "./components/PageList"
import { TaskList } from "./components/TaskList"
import { TaskForm } from "./components/TaskForm"
import { ConfirmDelete } from "./components/ConfirmDelete"

import { useEffect, useState } from 'react'

import './styles/variables.css'
import './styles/ui.css'

export default function App() {
  
  const [pagesNoteBook, setPagesNoteBook] = useState(()=>{
    const localPages = localStorage.getItem("PAGES")
    if(localPages === null) return []
    return  JSON.parse(localPages)
  })
  
  useEffect(() => {
    localStorage.setItem("PAGES", JSON.stringify(pagesNoteBook))
  },[pagesNoteBook])
  


  const [taskList, setTaskList] = useState(() => {
    const localTasks = localStorage.getItem("TASKS")
    if(localTasks === null) return []
    return JSON.parse(localTasks)
  })

  useEffect( () => {
    localStorage.setItem("TASKS", JSON.stringify(taskList))
  },[taskList])

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

  function deletePageId(idp) {
    setPagesNoteBook(pages => {
      return pages.filter( page => page.id !== idp)
    })
    setTaskList(tasks => {
      return tasks.filter( task => task.pageId !== idp)
    })
    setSelectedPageId(null)
  }

  function deleteTaskId(idt) {
    setTaskList(tasks => {
      return tasks.filter( task => task.id !== idt)
    })
    setSelectedTaskId(null)
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
    />
    {showNewForm && (
      <PageForm
        mode="create"
        pagesNoteBook={pagesNoteBook}
        setPagesNoteBook={setPagesNoteBook}
        setSelectedPageId={setSelectedPageId}
        setShowNewForm={setShowNewForm}
        setShowEditForm={setShowEditForm}
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
    />
    <TaskList showPage={showPage} 
          pagesNoteBook={pagesNoteBook}
          selectedPageId={selectedPageId}
          taskList={taskList}
          setTaskList={setTaskList}
          deleteTaskId={deleteTaskId}
          setShowEditFormTask={setShowEditFormTask}
          setSelectedTaskId={setSelectedTaskId}
          setConfirmDelete={setConfirmDelete}
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
      />      
    )}
    <ConfirmDelete confirmDelete={confirmDelete}
                   setConfirmDelete={setConfirmDelete} 
                   deletePageId={deletePageId}
                   deleteTaskId={deleteTaskId}
    />

   </>
  )
}  

 