import './ScoreBar.scss'
import CustomLabel from '../CustomLabel/CustomLabel'

function ScoreBar({ gameSettings, score }) {
  return (
    <div className='score-bar'>
      <CustomLabel text={gameSettings ? `${gameSettings['lives-label']}: ${score ? score.lives : '-'}` : ''}></CustomLabel>
      <CustomLabel text={gameSettings ? `${gameSettings['points-label']}: ${score ? score.points : '-'}` : ''}></CustomLabel>
    </div>
  )
}

export default ScoreBar
