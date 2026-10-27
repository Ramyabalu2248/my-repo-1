import React from 'react';
import WorkoutForm from '../WorkoutForm';
import WorkoutList from '../WorkoutList';
import { Dumbbell, Layers, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

const WorkoutsView = ({
  workouts = [],
  onWorkoutAdded,
  onDeleteWorkout,
  loading,
  token,
  setActiveTab
}) => {
  const safeWorkouts = Array.isArray(workouts) ? workouts : [];

  const totalVolume = safeWorkouts.reduce((acc, curr) => {
    return acc + (curr.load || 0) * (curr.reps || 1) * (curr.sets || 1);
  }, 0);

  const totalDuration = safeWorkouts.reduce((acc, curr) => {
    return acc + (Number(curr.duration) || 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* AI Suggestion Discovery Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white flex items-center gap-1.5">
              Need inspiration for today's routine?
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">AI</span>
            </p>
            <p className="text-[11px] text-slate-400">Get personalized workout plans, rest timers, and 1-click routine logging.</p>
          </div>
        </div>
        {setActiveTab && (
          <button
            onClick={() => setActiveTab('suggestions')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Explore Suggestions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Total Exercises Logged</p>
            <p className="text-lg font-bold text-white">{safeWorkouts.length} sessions</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">All-Time Volume Lifted</p>
            <p className="text-lg font-bold text-white">{totalVolume.toLocaleString()} kg</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Total Training Duration</p>
            <p className="text-lg font-bold text-white">{totalDuration} mins</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form on Left, History List on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left (1 col): Deep Workout Form */}
        <div className="lg:col-span-1">
          <WorkoutForm onWorkoutAdded={onWorkoutAdded} token={token} />
        </div>

        {/* Right (2 cols): Workout History List with CSV Export */}
        <div className="lg:col-span-2">
          <WorkoutList
            workouts={safeWorkouts}
            onDeleteWorkout={onDeleteWorkout}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutsView;
