import React, { useState, useEffect } from 'react';
import API_BASE_URL from './config';
import Table from './components/Table';
import Form from './components/Form';
import HandicapCalculator from './components/HandicapCalculator';

function App() {
  const [rounds, setRounds] = useState([]);

  const deleteRoundById = id => {
    setRounds(rounds.filter(round => round.id !== id));
  };

  const addRound = newRound => {
    setRounds([...rounds, newRound]);
  };

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/rounds`);
        const responseData = await response.json();
        if (response.ok) {
          console.info('Succesfully got rounds')
          setRounds(responseData)
        } else {
          console.error('Error getting rounds');
        }
      } catch (error) {
        console.error('Error getting rounds:', error);
      }
    };
    fetchRounds()
  }, []);

  const roundsTableColumns = [
    { label: "Course", accessor: "course" },
    { label: "Score", accessor: "score" },
    { label: "Course Rating", accessor: "course_rating" },
    { label: "Slope Rating", accessor: "slope_rating" },
    { label: "Date", accessor: "date" },
  ];

  return (
    <div className="App">
      <header className="App-header"> Handicap Tracker</header>
      <main className="table-container">
        <Table data={rounds} columns={roundsTableColumns} deleteRoundById={deleteRoundById}/>
      </main>
      <Form fields={roundsTableColumns} addRound={addRound} />
      <HandicapCalculator rounds={rounds} />
    </div>
  );
}

export default App;