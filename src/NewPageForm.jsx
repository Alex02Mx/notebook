import { useEffect, useState } from 'react'

export function NewPageForm( {showForm, setShowForm, setPagesNoteBook} ){
    const [pageTitleWindow, setpageTitleWindow] = useState("")
    const [priorityStatus, setPriorityStatus] = useState("")

    useEffect(() => {
      if(showForm) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = ""
      }
    }, [showForm])

  function resetForm() {
    setShowForm(false)
    setpageTitleWindow("")
    setPriorityStatus("")
  }

  function handleSubmit(e){
    e.preventDefault()
    if(pageTitleWindow === "") return
    if(priorityStatus === "") return
    createPage()
    resetForm()
  }

    function createPage(){
      setPagesNoteBook( (currentPages) => {
        return[
          ...currentPages,
          {
            id: crypto.randomUUID(),
            pageTitle: pageTitleWindow,
            pagePriority: priorityStatus,
          }
        ]
      }) 
    }        
    
    return (
    <>

      {showForm && (
        <div className="ui-overlay">
        <form onSubmit={handleSubmit} className="page-form">
          <h2 className="ui-title">Crear nueva Pagina</h2>

          <div className="page-form__group">
            <label htmlFor='page-title' className="page-form__label"> Titulo : </label>
            <input 
                  type="text"
                  value={pageTitleWindow}
                  className="page-form__input" 
                  id="page-title"
                  onChange={e => setpageTitleWindow(e.target.value)}
            />
          </div>
    
          <fieldset className="page-form__group">
            <legend className="page-form__label"> Prioridad : </legend>
            <ul className="ul-form page-form__options">

              <li className="ui-option page-form__option">
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

              <li className="ui-option page-form__option">
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

          <div className="page-form__actions">
            <button type="submit" 
              className="ui-btn ui-btn--primary"
              disabled={!(pageTitleWindow && priorityStatus)}>
                Agregar
            </button>

            <button type="button" 
                    className="ui-btn ui-btn--secondary"
                    onClick={resetForm}
            >
              Cancelar
            </button>
          </div>

        </form>
        </div>
      )}

    </>
    )
}