  export function guardAction({ 
                                type, 
                                action, 
                                id, 
                                sources, 
                                rules, 
                              }){
    const source = sources[type] 
    const actionRules = rules[type]?.[action]

    if (!source || !actionRules) {
        console.warn("Tipo no soportado", type, action)
        return {
          allowed: false,
          reason: "Acción Invalida"
        }
    }

    for (const rule of actionRules){
      const passed = rule.check({source, id})

      if (!passed) {
        return {
          allowed: false,
          reason: rule.message,
        }
      }
    }

    return {
      allowed: true,
      reason: null,
    }
  }