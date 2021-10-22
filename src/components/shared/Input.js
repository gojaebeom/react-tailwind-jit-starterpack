function Input({ styles, maxLength, placeholder }) {
  return (
    <input
      className={'outline-none '.concat(styles)}
      autoComplete="off"
      maxLength={maxLength ? maxLength : 50}
      placeholder={placeholder}
    />
  )
}
export default Input
