import { useAppUI } from "../../context/AppUIContext"

export function FeedbackToast() {
   const { feedback } = useAppUI()
   
  if (!feedback.type) return null

  return (
    <div className={`ui-toast ui-toast--${feedback.type}`}>
      <p>{feedback.message}</p>
    </div>
  )
}