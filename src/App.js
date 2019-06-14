import React, { Suspense } from 'react';

import WeatherApp from './components/WeatherApp';
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
