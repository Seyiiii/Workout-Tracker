import { useState } from 'react';
import './App.css'; 

function App() {
  const [workouts, setWorkouts] = useState([
    { id: 1, exercise: 'Squats', sets: 3, reps: 10 },
    { id: 2, exercise: 'Push-ups', sets: 3, reps: 15 },
  ]);

  const [newExercise, setNewExercise] = useState('');
  const [newSets, setNewSets] = useState('');
  const [newReps, setNewReps] = useState('');
  
  // 1. New State to track if we are in "Edit Mode"
  const [editingId, setEditingId] = useState(null);

  // 2. Modified Submit Handler (Handles BOTH Create and Update)
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!newExercise || !newSets || !newReps) {
      alert("Please fill out all fields.");
      return;
    }

    if (editingId !== null) {
      // --- UPDATE LOGIC ---
      // Map through workouts. If the ID matches, replace it with the new data.
      const updatedWorkouts = workouts.map((workout) => {
        if (workout.id === editingId) {
          return {
            ...workout, // Keep the old ID
            exercise: newExercise,
            sets: parseInt(newSets),
            reps: parseInt(newReps),
          };
        }
        return workout; // Otherwise, return the unchanged workout
      });

      setWorkouts(updatedWorkouts);
      setEditingId(null); // Turn off edit mode

    } else {
      // --- CREATE LOGIC (Your exact old code) ---
      const newWorkout = {
        id: Date.now(), 
        exercise: newExercise,
        sets: parseInt(newSets),
        reps: parseInt(newReps),
      };
      setWorkouts([...workouts, newWorkout]);
    }

    // Clear the form fields after either creating or updating
    setNewExercise('');
    setNewSets('');
    setNewReps('');
  };

  // 3. New Function to populate the form when "Edit" is clicked
  const handleEditClick = (workout) => {
    setEditingId(workout.id); // Turn ON edit mode for this specific ID
    setNewExercise(workout.exercise);
    setNewSets(workout.sets);
    setNewReps(workout.reps);
  };

  const handleDeleteWorkout = (idToRemove) => {
    const updatedWorkouts = workouts.filter((workout) => workout.id !== idToRemove);
    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="app-container">
      <h1>My Workout Tracker</h1>

      {/* Notice we changed onSubmit to our new handleSubmit function */}
      <form onSubmit={handleSubmit} className="workout-form">
        <input 
          type="text" 
          placeholder="Exercise" 
          value={newExercise}
          onChange={(e) => setNewExercise(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Sets" 
          value={newSets}
          onChange={(e) => setNewSets(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Reps" 
          value={newReps}
          onChange={(e) => setNewReps(e.target.value)}
        />
        {/* The button text changes dynamically based on whether editingId is null or not */}
        <button type="submit">
          {editingId ? "Update Workout" : "Add Workout"}
        </button>
      </form>

      <div className="workout-list">
        <h2>Today's Plan</h2>
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <strong>{workout.exercise}</strong>: {workout.sets} sets of {workout.reps} reps
              
              {/* 4. The New Edit Button */}
              <button 
                onClick={() => handleEditClick(workout)}
                style={{ marginLeft: '10px', color: 'blue' }}
              >
                Edit
              </button>

              <button 
                onClick={() => handleDeleteWorkout(workout.id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;