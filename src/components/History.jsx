export default function History({workouts}) {
    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Workout History</h2>

            {workouts.length === 0 ? (
                <p style={{textAlign: 'center', color: '#6b7280'}}>
                    You currently have no workouts saved. Go rush a Workout!
                </p>
            ) :(
                <ul>
                    {workouts.map((workout) => (
                        <li key={workout.id}>
                            <span>
                                <strong>{workout.exercise}</strong>: {workout.sets} sets of {workout.reps} reps
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}