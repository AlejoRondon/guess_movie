import './CustomInput.scss'

function CustomInput({ placeHolder, onChangeText, inputText }) {
  return <input type='text' className='custom-input' placeholder={placeHolder} onChange={onChangeText} value={inputText} />
}

export default CustomInput
