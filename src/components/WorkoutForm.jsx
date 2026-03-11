// src/components/WorkoutForm.jsx

export default function WorkoutForm({
  newExercise, setNewExercise,
  newSets, setNewSets,
  newReps, setNewReps,
  editingId, onSubmit
}) {
  return (
    <form onSubmit={onSubmit} className="workout-form">
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
      <button type="submit">
        {editingId ? "Update Workout" : "Add Workout"}
      </button>
    </form>
  );
}