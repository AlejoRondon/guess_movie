import './CustomForm.scss'
import CustomButton from '../CustomButton/CustomButton'
import CustomInput from '../CustomInput/CustomInput'

function CustomForm({ gameSettings, inputPlaceHolder, onChangeText, onClickButton, inputText, className }) {
  return (
    <div className={`custom-form ${className}`}>
      <CustomInput inputText={inputText} placeHolder={`hint: ${inputPlaceHolder}`} onChangeText={onChangeText}></CustomInput>
      <CustomButton text={gameSettings ? gameSettings['submit-btn-text'] : ''} onClickButton={onClickButton}></CustomButton>
    </div>
  )
}

export default CustomForm
