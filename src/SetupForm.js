import React from 'react'


const SetupForm = ( {quiz, handlechange, handlesubmit,error}) => {
  
  return (
    <main>
      <section className='quiz quiz-small'>
        <form className='setup-form'>
          <div className='form-control'>
            <h2>Setup your quiz</h2>
            <label htmlFor='amount'> Number of questions</label>
            <input type='number'
            name='amount'
            id='amount'
            value={quiz.amount}
            onChange={handlechange}
            className='form-input'
            min={1}
            max={50}/>
          </div>
          <div className='form-control'>
            <label htmlFor='category'>category</label>
            <select
              name='category'
              id='category'
              className='form-input'
              value={quiz.category}
              onChange={handlechange}
            >
              <option value='sports'>sports</option>
              <option value='history'>history</option>
              <option value='politics'>politics</option>
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='difficulty'>select difficulty</label>
            <select
              name='difficulty'
              id='difficulty'
              className='form-input'
              value={quiz.difficulty}
              onChange={handlechange}
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          {error && <p className='error'>
            Can't generate quiz, please try again with different values.</p>}
            <button className='submit-btn' onClick={handlesubmit} type='submit'> Submit </button>
        </form>
      </section>
    </main>
  )
}

export default SetupForm
