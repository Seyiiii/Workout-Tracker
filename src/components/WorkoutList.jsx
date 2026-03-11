export default function WorkoutList({ workouts, onEditClick, onDeleteWorkout}) {
    return (
        <div className="workout-list">
            <h2>Today's Plan</h2>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout.id}>
                        <span>
                            <strong>{workout.exercise}</strong>: {workout.sets} sets of {workout.reps} reps
                        </span>

                        <div>
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
                        </div>
                    </li>
                    ))}
            </ul>
        </div>
    );
}