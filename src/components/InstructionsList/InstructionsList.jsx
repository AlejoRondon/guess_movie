import './InstructionsList.scss'

function InstructionsList({ list }) {
  return (
    <div className='instructions-list'>
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
