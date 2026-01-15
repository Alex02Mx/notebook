
export function ConfirmDelete({
  confirmDelete,
  setConfirmDelete,
  deleteTaskId,
  deletePageId,
}){

  const message = confirmDelete.type === "page"
        ? "Se eliminará la página con todas sus tareas."
        : "Se eliminará la tarea."
    

  if(!confirmDelete.open) return null

  function handleConfirm() {

    if(confirmDelete.type === "task"){
      deleteTaskId(confirmDelete.id)

   } 
    if(confirmDelete.type === "page"){
      deletePageId(confirmDelete.id)
   }
   closeModal()
  }

  function closeModal(){
    setConfirmDelete({
        open: false,
        type: null,
        id: null,
    })
  }

  return (
    <div className="ui-overlay">
      <div className="ui-base ui-modal-danger">
        <h2 className="ui-title">Confirmar borrado</h2>

        <div className="ui-modal__warning">
          <p >{message}</p>
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
            Borrar
          </button>
        </div>
      </div>
    </div>   
  )

}

