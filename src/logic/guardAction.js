  export function guardAction({ type, 
                                action, 
                                id, 
                                onSuccess, 
                                sources, 
                                rules, 
                                setFeedback
                              }){
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