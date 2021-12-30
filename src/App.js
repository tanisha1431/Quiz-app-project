import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const table = {
    sports: 21,
    history: 23,
    politics: 24,
  }
  
  const API_ENDPOINT = 'https://opentdb.com/api.php?'
  

  

  const checkAnswer = (value) => {
    
    if(value){
      setCorrect((oldIndex)=>{
        return oldIndex + 1;
      })
    }

    nextQuestion();

  }

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        openModal()
        return 0
      } else {
        return index
      }
    })
  }

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setWaiting(true)
    setCorrect(0)
    setIsModalOpen(false)
  }

  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    const response = await axios(url).catch((err) => console.log(err))
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      } else {
        setWaiting(true)
        setError(true)
      }
    } else {
      setWaiting(true)
    }
  }


  const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=14&difficulty=easy&type=multiple'

 
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const[quiz,setQuiz]=useState({
    amount:'10',
    category:'Entertainment : Television',
    difficulty:'easy'
  })
  const handlechange=(e)=>{
    const name = e.target.name
    const value = e.target.value
    setQuiz({ ...quiz, [name]: value })
  }
  const handlesubmit=(e)=>{
    e.preventDefault()
    const { amount, category, difficulty } = quiz

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    fetchQuestions(url)
  }

  if (waiting) {
    return <SetupForm quiz={quiz} handlesubmit={handlesubmit} handlechange={handlechange} error={error}/>
  }
  if (loading) {
    return <Loading />
  }

  const { question, incorrect_answers, correct_answer } = questions[index]
  const answers = [...incorrect_answers, correct_answer]
  
  return (
    <main>
      <Modal ismodal={isModalOpen} closemodal={closeModal} questions={questions} correct={correct}/>
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                  onClick={()=>checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  )
}

export default App