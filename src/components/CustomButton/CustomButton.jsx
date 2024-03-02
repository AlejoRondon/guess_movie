import './CustomButton.scss'

function CustomButton({ text, onClickButton }) {
  return (
    <button className='custom-button' onClick={onClickButton}>
      {text ? text : 'default'}
    </button>
  )
}

export default CustomButton
