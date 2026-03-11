export default function WorkoutList({ workouts, onEditClick, onDeleteWorkout}) {
    return (
        <div className="workout-list">
            <h2>Today's Plan</h2>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout.id}>
                        <strong>{workout.exercise}</strong>: {workout.sets} sets of {workout.reps} reps
            
                        <button 
                            onClick={() => onEditClick(workout)}
                            style={{ marginLeft: '10px', color: 'blue' }}
                        >
                            Edit
                        </button>

                        <button 
                            onClick={() => onDeleteWorkout(workout.id)}
                            style={{ marginLeft: '10px', color: 'red' }}
                        >
                            Delete
                        </button>
                        </li>
                    ))}
                    </ul>
                </div>
                );
                }