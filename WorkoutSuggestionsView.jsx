import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Dumbbell,
  Flame,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ChevronUp,
  Target,
  Zap,
  Layers,
  ArrowRight,
  ShieldAlert,
  Info,
  Calendar,
  Award,
  Timer,
  Check
} from 'lucide-react';
import {
  CURATED_ROUTINES,
  getDayOfWeekRoutine,
  generateCustomRoutine
} from '../../utils/workoutSuggester';

const WorkoutSuggestionsView = ({
  user,
  token,
  recentWorkouts = [],
  onWorkoutAdded,
  setActiveTab
}) => {
  // Navigation within Suggestions: 'daily' | 'generator' | 'catalog'
  const [subTab, setSubTab] = useState('daily');

  // Daily Recommendation State
  const [dailyRoutine, setDailyRoutine] = useState(() => {
    return getDayOfWeekRoutine(user?.fitnessGoal || 'maintain');
  });

  // Generator State
  const [goal, setGoal] = useState(user?.fitnessGoal || 'build_muscle');
  const [level, setLevel] = useState('intermediate');
  const [targetMuscles, setTargetMuscles] = useState('full_body');
  const [equipment, setEquipment] = useState('gym');
  const [duration, setDuration] = useState('45');
  const [generatedRoutine, setGeneratedRoutine] = useState(null);
  const [generating, setGenerating] = useState(false);

  // Catalog State
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState('all');
  const [expandedRoutineId, setExpandedRoutineId] = useState(null);

  // Logging State
  const [loggingId, setLoggingId] = useState(null);
  const [logSuccessMessage, setLogSuccessMessage] = useState('');
  const [logError, setLogError] = useState('');

  // Built-in Rest Timer State
  const [restTimerSeconds, setRestTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Fetch daily suggestion from backend if available, fallback to client generator
  useEffect(() => {
    let isMounted = true;
    const fetchBackendSuggestion = async () => {
      if (!token) return;
      try {
        const res = await fetch('/api/suggestions/daily', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.routine) {
            setDailyRoutine(data.routine);
          }
        }
      } catch (err) {
        // Silently use client fallback
      }
    };

    fetchBackendSuggestion();
    return () => { isMounted = false; };
  }, [token, user]);

  // Rest Timer countdown
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && restTimerSeconds > 0) {
      interval = setInterval(() => {
        setRestTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (restTimerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, restTimerSeconds]);

  const startRestTimer = (seconds) => {
    setRestTimerSeconds(seconds);
    setIsTimerRunning(true);
  };

  const handleGenerate = async (e) => {
    e?.preventDefault();
    setGenerating(true);
    setLogError('');

    try {
      // Attempt backend generate first
      if (token) {
        const res = await fetch('/api/suggestions/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            goal,
            level,
            targetMuscles,
            equipment,
            duration: Number(duration)
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.routine) {
            setGeneratedRoutine(data.routine);
            setGenerating(false);
            return;
          }
        }
      }

      // Fallback to client generator
      const custom = generateCustomRoutine({
        goal,
        level,
        targetMuscles,
        equipment,
        duration: Number(duration),
        userWeight: user?.weight || 70
      });
      setGeneratedRoutine(custom);
    } catch (err) {
      const custom = generateCustomRoutine({
        goal,
        level,
        targetMuscles,
        equipment,
        duration: Number(duration),
        userWeight: user?.weight || 70
      });
      setGeneratedRoutine(custom);
    } finally {
      setGenerating(false);
    }
  };

  // Log single exercise into workouts
  const handleLogSingleExercise = async (exercise) => {
    setLoggingId(exercise.name);
    setLogSuccessMessage('');
    setLogError('');

    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: exercise.name,
          exercise: exercise.name,
          sets: Number(exercise.sets) || 1,
          reps: Number(exercise.reps) || 10,
          load: Number(exercise.load) || 0,
          duration: Number(exercise.duration) || 5,
          calories: Number(exercise.calories) || 30
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to log exercise');
      }

      if (onWorkoutAdded) {
        onWorkoutAdded(data);
      }

      setLogSuccessMessage(`Logged "${exercise.name}" to your workouts!`);
      setTimeout(() => setLogSuccessMessage(''), 4000);
    } catch (err) {
      setLogError(err.message);
      setTimeout(() => setLogError(''), 4000);
    } finally {
      setLoggingId(null);
    }
  };

  // Log entire routine in 1 click
  const handleLogRoutine = async (routine) => {
    setLoggingId(routine.id || 'routine');
    setLogSuccessMessage('');
    setLogError('');

    try {
      let createdWorkouts = [];

      // Try bulk endpoint
      const res = await fetch('/api/suggestions/log-routine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: routine.title,
          exercises: routine.exercises
        })
      });

      if (res.ok) {
        const data = await res.json();
        createdWorkouts = data.workouts || [];
      } else {
        // Fallback: log sequentially
        for (const ex of routine.exercises) {
          const singleRes = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              title: ex.name,
              exercise: ex.name,
              sets: Number(ex.sets) || 1,
              reps: Number(ex.reps) || 10,
              load: Number(ex.load) || 0,
              duration: Number(ex.duration) || 5,
              calories: Number(ex.calories) || 30
            })
          });
          if (singleRes.ok) {
            const singleData = await singleRes.json();
            createdWorkouts.push(singleData);
          }
        }
      }

      // Notify parent state for all created workouts
      if (onWorkoutAdded && createdWorkouts.length > 0) {
        createdWorkouts.forEach((w) => onWorkoutAdded(w));
      }

      setLogSuccessMessage(`Success! Logged all ${routine.exercises.length} exercises from "${routine.title}"!`);
      setTimeout(() => setLogSuccessMessage(''), 5000);
    } catch (err) {
      setLogError(err.message);
      setTimeout(() => setLogError(''), 5000);
    } finally {
      setLoggingId(null);
    }
  };

  // Filter curated catalog
  const filteredCatalog = selectedCatalogCategory === 'all'
    ? CURATED_ROUTINES
    : CURATED_ROUTINES.filter((r) => r.category === selectedCatalogCategory);

  return (
    <div className="space-y-6">
      {/* Top Banner / Feature Intro */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/20 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Smart Workout Coach & Suggester
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Personalized Workout Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Scientifically engineered routines tailored to your personal goals, available equipment, and schedule.
              Log any routine or individual exercise to your workout tracker with a single click.
            </p>
          </div>

          {/* Quick Profile Indicators */}
          <div className="flex sm:flex-row md:flex-col gap-2 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs flex items-center gap-2.5">
              <Target className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-[10px] text-slate-400">Target Goal</p>
                <p className="font-bold text-white capitalize">
                  {user?.fitnessGoal ? user.fitnessGoal.replace('_', ' ') : 'Maintain'}
                </p>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs flex items-center gap-2.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-[10px] text-slate-400">Body Weight</p>
                <p className="font-bold text-white">
                  {user?.weight || 70} kg
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Notifications inside view */}
        {logSuccessMessage && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{logSuccessMessage}</span>
            </div>
            {setActiveTab && (
              <button
                onClick={() => setActiveTab('workouts')}
                className="text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3 py-1 rounded-lg transition-colors"
              >
                View in Workouts →
              </button>
            )}
          </div>
        )}

        {logError && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>⚠️ {logError}</span>
          </div>
        )}
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 p-1 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setSubTab('daily')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'daily'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Today's Recommendation
          </button>

          <button
            onClick={() => {
              setSubTab('generator');
              if (!generatedRoutine) handleGenerate();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'generator'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Workout Wizard
          </button>

          <button
            onClick={() => setSubTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'catalog'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            Curated Programs ({CURATED_ROUTINES.length})
          </button>
        </div>

        {/* Quick Rest Timer Helper */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-2xl">
          <Timer className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] text-slate-400 font-medium">Rest Timer:</span>
          {isTimerRunning ? (
            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md animate-pulse">
              {restTimerSeconds}s
            </span>
          ) : (
            <div className="flex items-center gap-1">
              {[45, 60, 90].map((sec) => (
                <button
                  key={sec}
                  onClick={() => startRestTimer(sec)}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-300 font-bold transition-colors cursor-pointer"
                >
                  {sec}s
                </button>
              ))}
            </div>
          )}
          {isTimerRunning && (
            <button
              onClick={() => { setIsTimerRunning(false); setRestTimerSeconds(0); }}
              className="text-[10px] text-slate-400 hover:text-red-400 p-0.5"
              title="Reset timer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: TODAY'S RECOMMENDATION */}
      {subTab === 'daily' && dailyRoutine && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {dailyRoutine.dayName || 'Today'} Focus
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {dailyRoutine.level.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {dailyRoutine.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  {dailyRoutine.description}
                </p>
              </div>

              {/* Action: 1-Click Log Entire Routine */}
              <button
                onClick={() => handleLogRoutine(dailyRoutine)}
                disabled={loggingId === dailyRoutine.id}
                className="self-start sm:self-auto px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
              >
                {loggingId === dailyRoutine.id ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
                <span>Log Entire Routine ({dailyRoutine.exercises.length} Exercises)</span>
              </button>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400">Total Duration</p>
                  <p className="text-xs font-bold text-white">{dailyRoutine.duration} minutes</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
                <Flame className="w-4 h-4 text-orange-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400">Est. Calories</p>
                  <p className="text-xs font-bold text-white">{dailyRoutine.estimatedCalories} kcal</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
                <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400">Intensity</p>
                  <p className="text-xs font-bold text-white">{dailyRoutine.intensity}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
                <Dumbbell className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400">Equipment</p>
                  <p className="text-xs font-bold text-white capitalize">{dailyRoutine.equipment}</p>
                </div>
              </div>
            </div>

            {/* Target Muscles */}
            <div className="py-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-400 font-semibold">Target Muscle Groups:</span>
              {dailyRoutine.targetMuscles.map((muscle) => (
                <span
                  key={muscle}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-emerald-400 border border-emerald-500/20 font-bold"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Exercises List Breakdown */}
            <div className="mt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Workout Sequence ({dailyRoutine.exercises.length} Exercises)
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {dailyRoutine.exercises.map((ex, idx) => (
                  <div
                    key={ex.name + idx}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-white">{ex.name}</h5>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
                            {ex.targetMuscle}
                          </span>
                        </div>
                        {ex.tips && (
                          <p className="text-[11px] text-slate-400 mt-1 flex items-start gap-1.5 leading-relaxed">
                            <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong className="text-slate-300">Form Cue:</strong> {ex.tips}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Stats & Single Log Button */}
                    <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                      <div className="flex items-center gap-3 text-xs">
                        <div className="text-center px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
                          <p className="text-[9px] text-slate-500 font-bold uppercase">Sets</p>
                          <p className="font-extrabold text-white">{ex.sets}</p>
                        </div>
                        <div className="text-center px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
                          <p className="text-[9px] text-slate-500 font-bold uppercase">Reps</p>
                          <p className="font-extrabold text-white">{ex.reps}</p>
                        </div>
                        <div className="text-center px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
                          <p className="text-[9px] text-slate-500 font-bold uppercase">Load</p>
                          <p className="font-extrabold text-emerald-400">{ex.load} kg</p>
                        </div>
                        <div className="text-center px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
                          <p className="text-[9px] text-slate-500 font-bold uppercase">Burn</p>
                          <p className="font-extrabold text-orange-400">{ex.calories} kcal</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLogSingleExercise(ex)}
                        disabled={loggingId === ex.name}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-200 border border-slate-700/80 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        title="Add this exercise to your workout log"
                      >
                        {loggingId === ex.name ? (
                          <div className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                        <span>Log Exercise</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: WORKOUT WIZARD / GENERATOR */}
      {subTab === 'generator' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-emerald-400" />
                  Custom Workout Generator
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Define your preferences to generate a targeted session on the fly.
                </p>
              </div>
            </div>

            {/* Generator Form Controls */}
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* 1. Goal */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Primary Goal
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="build_muscle">Build Muscle (Hypertrophy)</option>
                    <option value="lose_fat">Fat Loss & Burn Calories</option>
                    <option value="strength">Build Pure Strength</option>
                    <option value="endurance">Endurance & Stamina</option>
                  </select>
                </div>

                {/* 2. Fitness Level */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Experience Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="beginner">Beginner (Technique & Form)</option>
                    <option value="intermediate">Intermediate (Progressive Tension)</option>
                    <option value="advanced">Advanced (High Intensity & Load)</option>
                  </select>
                </div>

                {/* 3. Target Muscles */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Muscle Focus
                  </label>
                  <select
                    value={targetMuscles}
                    onChange={(e) => setTargetMuscles(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="full_body">Full Body Balanced</option>
                    <option value="push">Push (Chest, Shoulders, Triceps)</option>
                    <option value="pull">Pull (Back, Biceps, Traps)</option>
                    <option value="legs">Legs & Glutes Power</option>
                    <option value="core">Core, Abs & Cardio</option>
                  </select>
                </div>

                {/* 4. Equipment */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Available Gear
                  </label>
                  <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="gym">Full Gym (Barbell, Cable, Bench)</option>
                    <option value="dumbbells">Dumbbells Only</option>
                    <option value="bodyweight">No Equipment (Calisthenics)</option>
                  </select>
                </div>

                {/* 5. Duration */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Session Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="15">15 min Express</option>
                    <option value="30">30 min Standard</option>
                    <option value="45">45 min Hypertrophy</option>
                    <option value="60">60 min Intense</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={generating}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {generating ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>Generate Custom Plan</span>
                </button>
              </div>
            </form>
          </div>

          {/* Generated Result Output */}
          {generatedRoutine && (
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Generated Routine
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                      {generatedRoutine.duration} MINS &bull; {generatedRoutine.estimatedCalories} KCAL
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {generatedRoutine.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    {generatedRoutine.description}
                  </p>
                </div>

                <button
                  onClick={() => handleLogRoutine(generatedRoutine)}
                  disabled={loggingId === generatedRoutine.id}
                  className="self-start sm:self-auto px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {loggingId === generatedRoutine.id ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                  <span>Log Entire Routine ({generatedRoutine.exercises.length} Exercises)</span>
                </button>
              </div>

              {/* Exercises List */}
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  {generatedRoutine.exercises.map((ex, idx) => (
                    <div
                      key={ex.name + idx}
                      className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-white">{ex.name}</h5>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
                              {ex.targetMuscle}
                            </span>
                          </div>
                          {ex.tips && (
                            <p className="text-[11px] text-slate-400 mt-1 flex items-start gap-1.5 leading-relaxed">
                              <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span><strong className="text-slate-300">Cue:</strong> {ex.tips}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                        <div className="flex items-center gap-3 text-xs">
                          <div className="text-center px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
                            <p className="text-[9px] text-slate-500 font-bold uppercase">Sets</p>
                            <p className="font-extrabold text-white">{ex.sets}</p>
                          </div>
                          <div className="text-center px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
                            <p className="text-[9px] text-slate-500 font-bold uppercase">Reps</p>
                            <p className="font-extrabold text-white">{ex.reps}</p>
                          </div>
                          <div className="text-center px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
                            <p className="text-[9px] text-slate-500 font-bold uppercase">Load</p>
                            <p className="font-extrabold text-emerald-400">{ex.load} kg</p>
                          </div>
                          <div className="text-center px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
                            <p className="text-[9px] text-slate-500 font-bold uppercase">Burn</p>
                            <p className="font-extrabold text-orange-400">{ex.calories} kcal</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleLogSingleExercise(ex)}
                          disabled={loggingId === ex.name}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-200 border border-slate-700/80 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {loggingId === ex.name ? (
                            <div className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                          <span>Log</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: CURATED CATALOG */}
      {subTab === 'catalog' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Programs' },
              { id: 'build_muscle', label: 'Hypertrophy & Muscle' },
              { id: 'lose_fat', label: 'Fat Loss & HIIT' },
              { id: 'strength', label: 'Strength & Power' },
              { id: 'home', label: 'Home Calisthenics' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCatalogCategory(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedCatalogCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCatalog.map((routine) => {
              const isExpanded = expandedRoutineId === routine.id;

              return (
                <div
                  key={routine.id}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 shadow-xl backdrop-blur-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {routine.category.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold capitalize">
                        {routine.equipment} &bull; {routine.duration} mins
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white tracking-tight">
                      {routine.title}
                    </h4>

                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {routine.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-4 py-3 border-y border-slate-800/80 text-center">
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-bold">Duration</p>
                        <p className="text-xs font-bold text-white">{routine.duration} min</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-bold">Calories</p>
                        <p className="text-xs font-bold text-orange-400">{routine.estimatedCalories} kcal</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-bold">Exercises</p>
                        <p className="text-xs font-bold text-emerald-400">{routine.exercises.length}</p>
                      </div>
                    </div>

                    {/* Exercises Accordion */}
                    {isExpanded && (
                      <div className="mt-4 space-y-2 pt-2 animate-in fade-in">
                        <p className="text-[11px] font-bold text-slate-300">Exercise Breakdown:</p>
                        {routine.exercises.map((ex, i) => (
                          <div
                            key={ex.name + i}
                            className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
                          >
                            <div>
                              <p className="font-semibold text-white">{ex.name}</p>
                              <p className="text-[10px] text-slate-400">
                                {ex.sets} sets &times; {ex.reps} reps {ex.load > 0 ? `@ ${ex.load}kg` : '(Bodyweight)'}
                              </p>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                              {ex.calories} kcal
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setExpandedRoutineId(isExpanded ? null : routine.id)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Exercises'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleLogRoutine(routine)}
                      disabled={loggingId === routine.id}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {loggingId === routine.id ? (
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                      <span>Log Routine</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutSuggestionsView;
