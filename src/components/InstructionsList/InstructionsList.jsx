import './InstructionsList.scss'

function InstructionsList({ list, className }) {
  return (
    <div className={`instructions-list ${className}`}>
      {list ? <strong>Instructions</strong> : ''}
      {list
        ? list.map((e, i) => {
            return (
              <p className='instruction' key={i}>
                {e}
              </p>
            )
          })
        : ''}
    </div>
  )
}

export default InstructionsList
