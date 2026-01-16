export function FeedbackToast({ feedback }) {
  if (!feedback.type) return null

  return (
    <div className={`ui-toast ui-toast--${feedback.type}`}>
      {feedback.message}
    </div>
  )
}