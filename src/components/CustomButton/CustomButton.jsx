import './CustomButton.scss'

function CustomButton({ text, onClickButton, className }) {
  return (
    <button className={`custom-button ${className}`} onClick={onClickButton}>
      {text ? text : 'default'}
    </button>
  )
}

export default CustomButton
