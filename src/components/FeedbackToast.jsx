export function FeedbackToast({ feedback }) {
  if (!feedback.type) return null

  return (
    <div className={`ui-toast ui-toast--${feedback.type}`}>
      <p>{feedback.message}</p>
    </div>
  )
}