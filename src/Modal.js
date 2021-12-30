import React from 'react'


const Modal = ({ismodal,closemodal,questions,correct}) => {
  return(
    <div className={`${ismodal?'modal-container isOpen' : 'modal-container'}`}
>
  <div className='modal-content'>
    <h2> Congratulations</h2>
    <p> You answered {correct} questions correctly</p>
    <button className='close-btn' onClick={closemodal}>Play again</button>
  </div>
</div>  )
}

export default Modal
