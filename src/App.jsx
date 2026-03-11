import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Menu, Dumbbell, History as HistoryIcon, LogOut, LogIn, UserPlus } from 'lucide-react';

import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import History from './components/History';
import Login from './components/Login';
import Signup from './components/Signup'; // Fixed 'Signp' typo
import './App.css'; 

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('is-logged-in') === 'true';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
  
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('my-workouts', JSON.stringify(workouts));
  }, [workouts]);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!newExercise || !newSets || !newReps) {
      alert("Please fill out all fields.");
      return;
    }

    if (editingId !== null) {
      const updatedWorkouts = workouts.map((workout) => {
        if (workout.id === editingId) {
          return {
            ...workout,
            exercise: newExercise,
            sets: parseInt(newSets),
            reps: parseInt(newReps),
          };
        }
        return workout; 
      });

      setWorkouts(updatedWorkouts);
      setEditingId(null); 

    } else {
      const newWorkout = {
        id: Date.now(), 
        exercise: newExercise,
        sets: parseInt(newSets),
        reps: parseInt(newReps),
      };
      setWorkouts([...workouts, newWorkout]);
    }

    setNewExercise('');
    setNewSets('');
    setNewReps('');
  };

  const handleEditClick = (workout) => {
    setEditingId(workout.id); 
    setNewExercise(workout.exercise);
    setNewSets(workout.sets);
    setNewReps(workout.reps);
  };

  const handleDeleteWorkout = (idToRemove) => {
    const updatedWorkouts = workouts.filter((workout) => workout.id !== idToRemove);
    setWorkouts(updatedWorkouts);
  };

  const handleLogout = () => {
    localStorage.removeItem('is-logged-in');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="app-layout">

      {/* Fixed: aside tag wraps the entire sidebar, fixed 'expaned' typo */}
      <aside className={`sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        
        {/* Fixed: 'manu-btn' typo */}
        <button className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={24} />
        </button>

        {/* Fixed: Removed duplicated nav-links div and duplicated isLoggedIn checks */}
        <div className="nav-links">
          {isLoggedIn ? (
            <>
              <Link to="/" className="nav-item">
                <span className="nav-icon"><Dumbbell size={24} /></span>
                {isSidebarOpen && <span className="nav-text">Today's Workout</span>}
              </Link>
              
              <Link to="/history" className="nav-item">
                <span className="nav-icon"><HistoryIcon size={24} /></span>
                {isSidebarOpen && <span className="nav-text">My History</span>}
              </Link>
              
              <button onClick={handleLogout} className="nav-item">
                <span className="nav-icon"><LogOut size={24} color="#ef4444" /></span>
                {isSidebarOpen && <span className="nav-text" style={{ color: '#ef4444' }}>Logout</span>}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">
                <span className="nav-icon"><LogIn size={24} /></span>
                {isSidebarOpen && <span className="nav-text">Log In</span>}
              </Link>
              
              <Link to="/signup" className="nav-item">
                <span className="nav-icon"><UserPlus size={24} /></span>
                {isSidebarOpen && <span className="nav-text">Sign Up</span>}
              </Link>
            </>
          )}
        </div>
      </aside>

      <main className="main-content">
        <div className="app-container">
          <h1>My Workout Tracker</h1>

          <Routes>
            <Route path='/' element={
              isLoggedIn ? (
                <>
                  <WorkoutForm
                    newExercise={newExercise} setNewExercise={setNewExercise}
                    newSets={newSets} setNewSets={setNewSets}
                    newReps={newReps} setNewReps={setNewReps}
                    editingId={editingId} onSubmit={handleSubmit} /* Fixed 'edittingId' typo */
                  />
                    
                  <WorkoutList
                    workouts={workouts}
                    onEditClick={handleEditClick}
                    onDeleteWorkout={handleDeleteWorkout}
                  />
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>Please log in to view your workouts.</p>
                </div>
              )
            } />

            <Route path='/history' element={
              isLoggedIn ? (
                <History workouts={workouts} />
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>Please log in to view your history.</p>
                </div>
              )
            } />

            <Route path="/login" element={
              <Login setIsLoggedIn={setIsLoggedIn} />
            } />

            <Route path="/signup" element={
              <Signup setIsLoggedIn={setIsLoggedIn} />
            } />
          </Routes>
        </div>
      </main> 
    </div>
  );
}

export default App;