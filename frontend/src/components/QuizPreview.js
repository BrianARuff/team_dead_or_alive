import React from 'react';

import './QuizPreview.scss';

export default function QuizPreview({quizData, history}) {

  return (

    <div className='quiz-preview' onClick={() => history.push(`/game/${quizData.id}`)}>
    
      <h2>{quizData.name}</h2>
      <div className='details'>
        <p className='author'>Author <span className='user-link' onClick={e => { e.stopPropagation(); history.push(`/users/${quizData.user_id}`) }}><br/>Joe Schmoe</span></p>
        <p>42<br></br>Questions</p>
      </div>

    </div>

  );

}
