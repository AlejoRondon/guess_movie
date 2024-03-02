import { useState, useEffect } from 'react'
import './CustomLabel.scss'

function CustomLabel({ text }) {
  const [show_animation, setShowAnimation] = useState(false)

  useEffect(() => {
    // Update the score when the text prop changes
    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
    }, 1000)
  }, [text])

  return <span className={`custom-label ${show_animation ? 'animate' : ''}`}>{text ? text : 'default'}</span>
}

export default CustomLabel
