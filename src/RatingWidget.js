import './RatingWidget.css';

import { useState } from 'react';

const RatingWidget = () => {
  const [score,setScore] = useState(0);
  const [message,setMessage] = useState('');

  const starClick = async (value) => {
    setScore(value);
    
    if (value / 5 < .8) {
      setMessage( `Thank you for your feedback of ${value} stars. We'll try to do better`);
    }
    else {
      setMessage(`Thanks for ${value} star rating!`);
    }

    let formData = new FormData(document.getElementById('form-container'));
    let dataCopy = {
      'question': formData.get('question'),
      'sentBy': formData.get('sentBy'),
      'rating': formData.get('rating')
    };
    try {
      let response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Sent-By': 'JS'
        },
        body: JSON.stringify(dataCopy)
      })
      console.log(response);
    }
    catch(e) {
      console.error(e);
    }

  }

  const setStarColor = (value) => {
    let starsRef = document.querySelectorAll('.star');
    for (let i = 0; i < starsRef.length; i++) {
      if (i+1 <= value) {
        starsRef[i].style.color = 'gold';
      }
      else {
        starsRef[i].style.color = '';
      }
    }
  }

  return (
    <div id="rating-widget-container">
      <h2>Rating Widget</h2>
      <form id="form-container">
        <label>How satisfied are you?</label>
        <input type="hidden" name="question" value="How satisfied are you?"></input>
        <input type="hidden" name="sentBy" value="JS"></input>
        <input type="hidden" id="rating" name="rating" value="0" required></input>
        <div className="rating-container">
          <span className="star" onClick={() => starClick(1)} onMouseOver={() => setStarColor(1)} onMouseLeave={() => setStarColor(score)}>&#9733;</span>
          <span className="star" onClick={() => starClick(2)} onMouseOver={() => setStarColor(2)} onMouseLeave={() => setStarColor(score)}>&#9733;</span>
          <span className="star" onClick={() => starClick(3)} onMouseOver={() => setStarColor(3)} onMouseLeave={() => setStarColor(score)}>&#9733;</span>
          <span className="star" onClick={() => starClick(4)} onMouseOver={() => setStarColor(4)} onMouseLeave={() => setStarColor(score)}>&#9733;</span>
          <span className="star" onClick={() => starClick(5)} onMouseOver={() => setStarColor(5)} onMouseLeave={() => setStarColor(score)}>&#9733;</span>
        </div>
        <h4>{message}</h4>
      </form>
    </div>
  )
}

export default RatingWidget;