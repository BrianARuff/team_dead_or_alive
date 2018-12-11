import React from 'react';

import './QuizPreview.scss';

export default function QuizPreview({quizData, history}) {

  return (

    <div className='quiz-preview' onClick={() => history.push('/game/1')}>

      <h2>Quiz goes here</h2>
      <p>Number of questions: number goes here</p>
      <p>Probably an image as well, we shall see.</p>

    </div>

  );

}
