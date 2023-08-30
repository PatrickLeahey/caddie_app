import React from 'react';

const HandicapCalculator = ({ rounds }) => {

  if (rounds.length >= 5) {

    const calculateHandicap = () => {
      const handicapDifferentials = rounds.map(round => {
      const differential =
          (round.score - round.course_rating) * 113 / round.slope_rating;
        return differential;
      });

      const sortedDifferentials = [...handicapDifferentials].sort((a, b) => a - b);
      const differentialsToUse = sortedDifferentials.slice(0, 10);

      const handicap = (differentialsToUse.reduce((sum, differential) => sum + differential, 0) / differentialsToUse.length).toFixed(1);

      return handicap;
    };

    return (
      <div className='number-container'>
        <h2 className='number-title'> Handicap</h2>
        <p>Calculated Handicap: {calculateHandicap()}</p>
      </div>
    );
  } else {
    return (
        <div className='number-container'>
          <h2 className='number-title'> Add at least 5 rounds</h2>
        </div>
      );
  }
};

export default HandicapCalculator;