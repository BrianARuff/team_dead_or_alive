import React from 'react';

import './QuizPreview.scss';

export default function QuizPreview({quizData, history}) {

  return (

    <div className='quiz-preview' onClick={() => history.push(`/game/${quizData.id}`)}>

      <h2>{quizData.name}</h2>
      <div className='details'>
        <p className='author'>By <span className='user-link' onClick={e => { e.stopPropagation(); history.push(`/users/${quizData.user_id}`) }}>Joe Schmoe</span></p>
        <p>Number of questions: 42</p>
      </div>

    </div>

  );

}
