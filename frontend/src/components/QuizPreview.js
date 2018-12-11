import React from 'react';

import './QuizPreview.scss';

export default function QuizPreview({quizData, history}) {

  return (

    <div className='quiz-preview' onClick={() => history.push('/game/1')}>

      <h2>Quiz Name</h2>
      <div className='details'>
        <p>By Joe Schmoe</p>
        <p>Number of questions: 42</p>
      </div>

    </div>

  );

}
