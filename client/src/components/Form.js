import React, { useState } from 'react';
import handleAddRound from "./HandleAddRound";

const Form = ({ fields, addRound }) => {

  const [newRound, setNewRound] = useState('');
  const updateNewRound = (key, newValue) => {
    setNewRound(newRound => ({
      ...newRound,
      [key]: newValue
    }));
    console.info(newRound)

  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add round</h2>
        {fields.map(({ label, accessor }) => {
          return (
            <input
              className="form-input"
              type="text"
              placeholder={label}
              value={newRound[accessor]}
              onChange={(e) => updateNewRound(accessor, e.target.value)}
            />
          )
        })}
        <button className="custom-button" onClick={() => handleAddRound(newRound, addRound)}>Submit</button>
      </div>
  );
};

export default Form;