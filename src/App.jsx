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
      delete : [
        {
          check : ({source, id}) => source.list.some(task => task.id === id),
          message: "La tarea ya no existe",
        },
        {
          check : ({source, id}) => source.list.find(task => task.id === id)?.status === true,
          message : "Solo se pueden borrar tareas completadas"
        },
      ],
      edit : [
        {
          check : ({source, id}) => source.list.some(task => task.id === id),
          message : "No se puede editar esta tarea",
        },
      ],
    },
    page : {
      delete : [
        {
          check : ({source, id}) => source.list.some(page => page.id === id),
          message : "La página ya no existe"
        },
      ],
      edit : [
        {
          check : ({source, id}) => source.list.some(task => task.id === id),
          message : "No se puede editar esta pagina",
        },
      ],
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

  function handleGuardAction({ type, action, id, onAllowed }) {
    const result = guardAction({
      type,
      action,
      id,
      sources,
      rules,
    })
    if (!result.allowed){
      showFeedback("error", result.reason)
      return 
    }
    onAllowed()
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
    <PageList 
        pagesNoteBook={pagesNoteBook}
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

 