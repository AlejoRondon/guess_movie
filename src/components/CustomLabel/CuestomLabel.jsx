import './CustomLabel.scss'

function CustomLabel({ text }) {
  return <span className='custom-label'>{text ? text : 'default'}</span>
}

export default CustomLabel
