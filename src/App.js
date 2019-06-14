import React, { Suspense } from 'react';

import './App.css';

import WeatherApp from './WeatherApp';
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading</div>}>
        <WeatherApp />
      </Suspense>
    </div>
  );
}
export default App;
