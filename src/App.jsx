import { useState, useEffect } from 'react'
import fetchMovies from './services/db_service'
import ScoreBar from './components/ScoreBar/ScoreBar'
import CustomForm from './components/CustomForm/CustomForm'
import InstructionsList from './components/InstructionsList/InstructionsList'
import './App.css'

function App() {
  const [movie_index, setMovieIndex] = useState()
  const [score, setScore] = useState()
  const [input_text, setInputText] = useState('')
  const [game_settings, setGameSettings] = useState()
  const [movies_data, setMoviesData] = useState()
  const [instructions_list, setInstructionsList] = useState()

  useEffect(() => {
    // prettier-ignore
    (async () => {
      try {
        let data = await fetchMovies()
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
    console.log(movies_data)
  }, [movies_data])

  useEffect(() => {
    if (!game_settings) return
    console.log(game_settings)
    setScore({ lives: game_settings['lives'], points: 0 })
  }, [game_settings])

  useEffect(() => {
    if (!score) return
    console.log('score: ', score)

    const movies_amount = movies_data.length
    console.log('movies_amount', movies_amount)
    const random_index = Math.floor(Math.random() * (movies_amount + 1)) - 1
    console.log('random_index', random_index)
    setMovieIndex(random_index)
  }, [score])

  const handleOnChangeText = e => {
    setInputText(e.target.value)
  }

  const handleOnClickButton = () => {
    const movie_title = movies_data[movie_index]['title'].toLowerCase()
    const movie_guessed = input_text.toLowerCase()
    console.log('movie_title: ', movie_title, movie_title.length)
    console.log('movie_guessed: ', movie_guessed, movie_guessed.length)

    let _score = { ...score }
    if (movie_title == movie_guessed) {
      _score.points += 1
    } else {
      _score.lives -= 1
    }
    setScore(_score)
    setInputText('')
  }

  return (
    <>
      <ScoreBar gameSettings={game_settings} score={score}></ScoreBar>
      <img src={game_settings ? game_settings['logo-url'] : ''} className='logo' alt='Guess Movie Logo' />
      <h1>{movies_data && movie_index ? movies_data[movie_index]['emoji'] : ''}</h1>
      <h2>{game_settings ? game_settings['game-question'] : ''}</h2>
      <CustomForm onClickButton={handleOnClickButton} onChangeText={handleOnChangeText} inputText={input_text} gameSettings={game_settings} inputPlaceHolder={movies_data && movie_index ? movies_data[movie_index]['hint'] : ''}></CustomForm>
      <InstructionsList list={instructions_list}></InstructionsList>
    </>
  )
}

export default App
