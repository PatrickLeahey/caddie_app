import React, { useState, useEffect } from 'react';
import API_BASE_URL from './config';
import Table from './components/Table';

function App() {
  const [rounds, setRounds] = useState([]);

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

  const [newRoundCourse, setNewRoundCourse] = useState('');
  const [newRoundScore, setNewRoundScore] = useState('');
  const [newRoundCourseRating, setNewRoundCourseRating] = useState('');
  const [newRoundSlopeRating, setNewRoundSlopeRating] = useState('');
  const [newRoundDate, setNewRoundDate] = useState('');

  const handleAddRound = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/rounds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course: newRoundCourse, score: newRoundScore, course_rating: newRoundCourseRating, slope_rating: newRoundSlopeRating, date: newRoundDate }),
      });

      if (response.ok) {
        const newRound = await response.json();
        console.info('Succesfully added round');
        setRounds([...rounds, newRound]);
      } else {
        console.error('Error adding round');
      }
    } catch (error) {
      console.error('Error adding round:', error);
    }
  };

  const [deleteId, setDeleteId] = useState('');

  const handleDeleteRound = async () => {
    try {
      const id = parseInt(deleteId); // Convert to integer
      if (isNaN(id)) {
        console.error('Invalid ID');
        return;
      }
      const response = await fetch(`${API_BASE_URL}/api/rounds/${id}`, { method: 'DELETE' });
  
      if (response.ok) {
        console.info('Successfully deleted round');
        setRounds(rounds.filter(round => round.id !== id));
      } else {
        console.error('Error deleting round');
      }
    } catch (error) {
      console.error('Error deleting round:', error);
    }
  };

  // const [handicap, setHandicap] = useState(null);

  // useEffect(() => {
  //   const calcHandicap = async () => {
  //     if (rounds.length <= 20) {
  //       setHandicap(null)
  //     } else {
  //       const sorted = [...jsonData].sort((a, b) => new Date(b.date) - new Date(a.date));
  //       const tenRecent = sorted.slice(0, 10);

  //     }
  //   };
  //   calcHandicap()
  // }, [rounds]);

  const roundsTableColumns = [
    { label: "ID", accessor: "id" },
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
        <Table data={rounds} columns={roundsTableColumns}/>
      </main>
      <div className="form-container">
        <h2 className="form-title">Add round</h2>
        <input
          className="form-input"
          type="text"
          placeholder="Course"
          value={newRoundCourse}
          onChange={(e) => setNewRoundCourse(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Score"
          value={newRoundScore}
          onChange={(e) => setNewRoundScore(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Course Rating"
          value={newRoundCourseRating}
          onChange={(e) => setNewRoundCourseRating(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Slope Rating"
          value={newRoundSlopeRating}
          onChange={(e) => setNewRoundSlopeRating(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Date"
          value={newRoundDate}
          onChange={(e) => setNewRoundDate(e.target.value)}
        />
        <button className="custom-button" onClick={handleAddRound}>Submit</button>
      </div>
      <div className="form-container">
        <h2 className="form-title">Delete round</h2>
        <input
          className="form-input"
          type="text"
          placeholder="ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button className="custom-button" onClick={handleDeleteRound}>Submit</button>
      </div>
    </div>
  );
}

export default App;