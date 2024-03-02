import { useState, useEffect } from 'react'
import fetchMovies from './services/db_service'
import ScoreBar from './components/ScoreBar/ScoreBar'
import CustomForm from './components/CustomForm/CustomForm'
import InstructionsList from './components/InstructionsList/InstructionsList'
import CustomButton from './components/CustomButton/CustomButton'
import './App.css'

function App() {
  const [all_movies_data, setAllMoviesData] = useState()
  const [movies_data, setMoviesData] = useState()
  const [game_settings, setGameSettings] = useState()
  const [instructions_list, setInstructionsList] = useState()

  const [random_movie_index, setRandomMovieIndex] = useState(null)
  const [score, setScore] = useState({})
  const [is_game_locked, setIsGameLocked] = useState(false)
  const [is_game_over, setIsGameOver] = useState(false)
  const [input_text, setInputText] = useState('')
  const [main_banner_text, setMainBannerText] = useState('')

  useEffect(() => {
    // prettier-ignore
    (async () => {
      try {
        let data = await fetchMovies()
        setAllMoviesData(data['movies'])
        setMoviesData(data['movies'])
        setGameSettings(data['settings'])
        setInstructionsList(data['instructions'])
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (!movies_data) return

    const getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    console.log(movies_data)
    const movies_amount = movies_data.length
    console.log('movies_amount', movies_amount)
    setRandomMovieIndex(getRandomNumber(0, movies_amount - 1))
  }, [movies_data])

  useEffect(() => {
    if (random_movie_index === null) return
    console.log('random_index', random_movie_index)
    setMainBannerText(movies_data[random_movie_index]?.emoji || '')
  }, [random_movie_index])

  useEffect(() => {
    if (!game_settings) return
    console.log(game_settings)
    setScore({ lives: game_settings['lives'], points: 0 })
  }, [game_settings])

  useEffect(() => {
    if (!score) return
    console.log('score: ', score)
  }, [score])

  const handleOnChangeText = e => {
    setInputText(e.target.value)
  }

  const handleOnClickPlayAgainBtn = () => {
    console.log('play again')
    setIsGameOver(false)
    setScore({ lives: game_settings['lives'], points: 0 })
    setMoviesData([...all_movies_data])
  }

  const handleOnClickGuessBtn = () => {
    if (is_game_locked) return

    setInputText('')

    const movie_title = movies_data[random_movie_index]['title'].toLowerCase()
    const movie_guessed = input_text.toLowerCase()
    console.log('movie_title: ', movie_title, movie_title.length)
    console.log('movie_guessed: ', movie_guessed, movie_guessed.length)

    let _score = { ...score }
    if (movie_title == movie_guessed) {
      _score.points += 1
      setMainBannerText(`Yeah! ${movies_data[random_movie_index].title}`)
    } else {
      _score.lives -= 1
      setMainBannerText(`Ops! ${movies_data[random_movie_index].title}`)
    }
    setScore(_score)

    if (_score.lives === 0) {
      setIsGameLocked(true)
      setTimeout(() => {
        setIsGameLocked(false)
        setIsGameOver(true)
        setMainBannerText('GAME OVER!')
      }, 1500)
    } else if (_score.lives > 0) {
      setIsGameLocked(true)
      setTimeout(() => {
        setIsGameLocked(false)
        const _movies_data = movies_data.filter((_, index) => index !== random_movie_index)
        if (_movies_data.length === 0) {
          setIsGameOver(true)
          setMainBannerText('You win🎊!')
        } else {
          setMoviesData([..._movies_data])
        }
      }, 1500)
    }
  }

  return (
    <>
      <ScoreBar gameSettings={game_settings} score={score}></ScoreBar>
      <img src={game_settings ? game_settings['logo-url'] : ''} className='logo' alt='Guess Movie Logo' />
      <h1 className='emojis-banner'>{main_banner_text ? main_banner_text : 'Loading...'}</h1>
      <h2 className={`game-question-banner ${is_game_over ? 'hidden' : ''}`}>{game_settings ? game_settings['game-question'] : ''}</h2>
      <CustomForm
        className={is_game_over ? 'hidden' : ''}
        onClickButton={handleOnClickGuessBtn}
        onChangeText={handleOnChangeText}
        inputText={input_text}
        gameSettings={game_settings}
        inputPlaceHolder={movies_data?.[random_movie_index]?.hint ?? ''}></CustomForm>
      <CustomButton className={`try-again-btn ${!is_game_over ? 'hidden' : ''}`} text='Play Again' onClickButton={handleOnClickPlayAgainBtn}></CustomButton>

      <InstructionsList list={instructions_list}></InstructionsList>
    </>
  )
}

export default App