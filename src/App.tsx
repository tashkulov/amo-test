import React from 'react';
import DealTable from './components/DealTable';

const App: React.FC = () => {
  return (
      <div className="App">
        <h1>Сделки</h1>
        <DealTable />
      </div>
  );
};

export default App;
