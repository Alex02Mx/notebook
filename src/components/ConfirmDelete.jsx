import { useEffect } from "react"

export function ConfirmDelete({confirmDelete,
                            setConfirmDelete,
                            deleteTaskId,
                            deletePageId,
                            setFeedback
}){
 
 if (!confirmDelete.open) return null

  const config = {
    page: {
      title: "Eliminar página",
      message: "Se eliminará la página con todas sus tareas.",
      confirmText: "Eliminar página",
    },
    task: {
      title: "Eliminar tarea",
      message: "Se eliminará la tarea.",
      confirmText: "Eliminar tarea",
    },
  }

  const current = config[confirmDelete.type]

  function closeModal(){
    setConfirmDelete({
        open: false,
        type: null,
        id: null,
    })
  }

  function handleConfirm() {

    if(confirmDelete.type === "task"){
      deleteTaskId(confirmDelete.id)
      setFeedback({
        type: 'success',
        message: 'Tarea eliminada correctamente',
      })

   } 
    if(confirmDelete.type === "page"){
      deletePageId(confirmDelete.id)
      setFeedback({
        type: 'success',
        message: 'Pagina eliminada correctamente', 
      })     
   }

   closeModal()

    setTimeout(() => {
      setFeedback({ type: null, message: '' })
    }, 2000)
  }

  useEffect(() => {
    document.body.classList.add("body-no-scroll")

    return () => {
      document.body.classList.remove("body-no-scroll")
    }
  }, [])

  return (
    <div className="ui-overlay">
      <div className="ui-base ui-modal-danger">
        <h2 className="ui-title">{current.title}</h2>

        <div className="ui-modal__warning">
          <p >{current.message}</p>
          <p>Esta acción no se puede deshacer.</p> 
        </div>
        
        <div className="ui-form__actions">
          <button
            className="ui-btn ui-btn--secondary"
            onClick={closeModal}
          >
            Cancelar
          </button>

          <button
            className="ui-btn ui-btn--danger"
            onClick={handleConfirm}
          >
            {current.confirmText}
          </button>
        </div>
      </div>
    </div>   
  )

}

