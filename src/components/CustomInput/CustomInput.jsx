import './CustomInput.scss'

function CustomInput({ placeHolder, onChangeText, inputText, onKeyPress }) {
  return <input type='text' className='custom-input' onKeyDown={onKeyPress} placeholder={placeHolder} onChange={onChangeText} value={inputText} />
}

export default CustomInput
