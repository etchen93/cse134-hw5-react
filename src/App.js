import './App.css';

import RatingWidget from './RatingWidget';
import WeatherWidget from './WeatherWidget';

function App() {
  return (
    <div className="App">
      <div>
        <RatingWidget />
      </div>
      <div>
        <WeatherWidget />
      </div>
    </div>
  );
}

export default App;
