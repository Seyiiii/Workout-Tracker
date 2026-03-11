import { useState } from 'react';
import './App.css';

function App() {
  const [workouts, setWorkouts] =  useState([
    { id: 1, exercise: 'Squats', sets: 3, reps:10},
    { id: 2 , exercise: 'Push-ups', sets: 3, reps: 15},
  ]);

  const [newExercise, setNewExercise] = useState('');
  const [newSets, setNewSets] = useState('');
  const [newReps, setNewReps] = useState('');

  const handleAddWorkout = (e) => {
    e.preventDefault();

    if (!newExercise || !newSets || !newReps) {
      alert("Please fill out all fields!!");
      return;
    }

    const newWorkout = {
      id: Date.now(),
      exercise: newExercise,
      sets: parseInt(newSets),
      reps: parseInt(newReps),
    };

    setWorkouts([...workouts, newWorkout]);
    setNewExercise('');
    setNewSets('');
    setNewReps('');
  };

  return (
    <div className="app-container">
      <h1>My Workout Tracker</h1>

      <form onSubmit={handleAddWorkout} className='workout-form'>
        <input
          type="text"
          placeholder='Exercise (e.g., Deadlift)'
          value={newExercise}
          onChange={(e) => setNewExercise(e.target.value)}
          />
        <input
          type='number'
          placeholder='Sets'
          value={newSets}
          onChange={(e) => setNewSets(e.target.value)}
        />
        <input
          type='number'
          placeholder='Reps'
          value={newReps}
          onChange={(e) => setNewReps(e.target.value)}
        />
        <button type='submit'>Add Workout</button>
      </form>


      <div className='workout-list'>
        <h2>Today's Plan</h2>
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <strong>{workout.exercise}</strong>: {workout.sets} sets of {workout.reps} reps
            </li>
          ))}
        </ul>
      </div>

    </div>
  );

}

export default App;