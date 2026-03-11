import { useState, useEffect } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import './App.css'; 

function App() {
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem('my-workouts');

    if (savedWorkouts) {
      return JSON.parse(savedWorkouts);
    } else {
      return [
        { id: 1, exercise: 'Squats', sets: 3, reps: 10 },
        { id: 2, exercise: 'Push-ups', sets: 3, reps: 15 },
      ];
    }
  });

  const [newExercise, setNewExercise] = useState('');
  const [newSets, setNewSets] = useState('');
  const [newReps, setNewReps] = useState('');
  
  // 1. New State to track if we are in "Edit Mode"
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('my-workouts', JSON.stringify(workouts));
  }, [workouts]);

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

     <WorkoutForm
      newExercise={newExercise} setNewExercise={setNewExercise}
      newSets={newSets} setNewSets={setNewSets}
      newReps={newReps} setNewReps={setNewReps}
      edittingId={editingId} onSubmit={handleSubmit}
      />
      
      <WorkoutList
        workouts={workouts}
        onEditClick={handleEditClick}
        onDeleteWorkout={handleDeleteWorkout}
        />
    </div>
  );
}

export default App;