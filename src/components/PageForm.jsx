import { useEffect, useState } from 'react'

export function PageForm( {mode, 
                           pagesNoteBook, 
                           setPagesNoteBook, 
                           selectedPageId, 
                           setSelectedPageId, 
                           setShowNewForm, 
                           setShowEditForm
                          }){
    
    const isEditMode = mode === "edit"
                           
    const [pageTitle, setPageTitle] = useState("")
    const [priorityStatus, setPriorityStatus] = useState("") 

    const pageToEdit = isEditMode
        ? pagesNoteBook.find( page => page.id === selectedPageId)
        : null

    useEffect( () => {
      if(pageToEdit){
        setPageTitle(pageToEdit.pageTitle)
        setPriorityStatus(pageToEdit.pagePriority)
      }
    },[pageToEdit])

    function handleSubmit(e){
      e.preventDefault()
      if( !pageTitle || !priorityStatus) return
      
      isEditMode ? updatePage() : createPage()

      resetAndClose()      
    }

    function createPage(){
      const newPage = {
            id: crypto.randomUUID(),
            pageTitle: pageTitle,
            pagePriority: priorityStatus,
      }

      setPagesNoteBook( prev => [...prev, newPage])
    } 

    function updatePage() {
        setPagesNoteBook(prev =>
        prev.map(page =>
            page.id === selectedPageId
            ? {
                ...page,
                pageTitle: pageTitle,
                pagePriority: priorityStatus
                }
            : page
        ))
    }

    function resetAndClose(){
        setPageTitle("")
        setPriorityStatus("")
        setSelectedPageId(null)
        setShowNewForm(false)
        setShowEditForm(false)
    }

  

  return (
        <div className="ui-overlay">
          <form  onSubmit={handleSubmit} className="ui-base ui-base--form">

            <h2 className="ui-title">
                {isEditMode ? "Editar Pagina" : "Nueva Pagina"}
            </h2>

          <div className="ui-form__group">
            <label htmlFor='page-title' className="ui-form__label"> Titulo : </label>
            <input 
                  type="text"
                  value={pageTitle}
                  className="ui-form__input" 
                  id="page-title"
                  onChange={e => setPageTitle(e.target.value)}//
            />
          </div>
    
          <fieldset className="ui-form__group">
            <legend className="ui-form__label"> Prioridad : </legend>

            <ul className="ui-list ui-form__options">

              <li className="ui-form__option">
                <input 
                    id="priority-normal"
                    type="radio" 
                    name="priority" 
                    value="Normal"
                    checked={priorityStatus === "Normal"} 
                    onChange={e => setPriorityStatus(e.target.value)} 
                />
                <label htmlFor="priority-normal"> Normal </label>
              </li>

              <li className="ui-form__option">
                <input 
                    id="priority-urgent" 
                    type="radio"
                    name="priority" 
                    value="Urgente"
                    checked={priorityStatus === "Urgente"}  
                    onChange={e => setPriorityStatus(e.target.value)}
                />
                <label htmlFor="priority-urgent">Urgente</label>
              </li>
            </ul>
          </fieldset>

          <div className="ui-form__actions">
            <button type="submit" 
              className="ui-btn ui-btn--primary"
              disabled={!pageTitle || !priorityStatus}
            >
                {isEditMode ? "Guardar Cambios" : "Crear Pagina"}
            </button>

            <button type="button" 
                  className="ui-btn ui-btn--secondary"
                  onClick={resetAndClose}
            >
              Cancelar
            </button>
          </div>

          </form>
        </div>
  )
}