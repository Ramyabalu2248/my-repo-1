// Scientific Exercise Database with metadata
export const EXERCISE_DATABASE = [
  // Push / Chest & Triceps & Shoulders
  { name: 'Barbell Bench Press', muscle: 'Chest', split: 'push', equipment: 'gym', type: 'Weight Training', baseLoad: 50, baseReps: 10, baseSets: 4, caloriesRate: 6.5, tips: 'Plant feet flat, retract shoulder blades, lower bar to mid-chest.' },
  { name: 'Incline Dumbbell Press', muscle: 'Chest', split: 'push', equipment: 'dumbbells', type: 'Weight Training', baseLoad: 20, baseReps: 10, baseSets: 3, caloriesRate: 6.0, tips: 'Set bench to 30 degrees, press upward in an arch without clanging dumbbells.' },
  { name: 'Dips (Chest Focus)', muscle: 'Chest', split: 'push', equipment: 'bodyweight', type: 'Weight Training', baseLoad: 0, baseReps: 12, baseSets: 3, caloriesRate: 7.0, tips: 'Lean slightly forward to target lower pecs, lower until elbows hit 90 degrees.' },
  { name: 'Push-ups', muscle: 'Chest', split: 'push', equipment: 'bodyweight', type: 'Weight Training', baseLoad: 0, baseReps: 15, baseSets: 3, caloriesRate: 6.0, tips: 'Maintain a rigid plank, chest touches floor, elbows at 45 degrees.' },
  { name: 'Standing Overhead Barbell Press', muscle: 'Shoulders', split: 'push', equipment: 'gym', type: 'Weight Training', baseLoad: 35, baseReps: 8, baseSets: 4, caloriesRate: 6.5, tips: 'Squeeze glutes and core, press straight up moving head forward once bar clears.' },
  { name: 'Dumbbell Lateral Raises', muscle: 'Shoulders', split: 'push', equipment: 'dumbbells', type: 'Weight Training', baseLoad: 8, baseReps: 15, baseSets: 4, caloriesRate: 5.5, tips: 'Slight bend at elbows, lead with elbows up to shoulder height, controlled eccentric.' },
  { name: 'Tricep Rope Pushdowns', muscle: 'Triceps', split: 'push', equipment: 'gym', type: 'Weight Training', baseLoad: 25, baseReps: 12, baseSets: 3, caloriesRate: 5.0, tips: 'Pin elbows to sides, flare rope outwards at the bottom of the movement.' },
  { name: 'Overhead Dumbbell Tricep Extension', muscle: 'Triceps', split: 'push', equipment: 'dumbbells', type: 'Weight Training', baseLoad: 16, baseReps: 12, baseSets: 3, caloriesRate: 5.0, tips: 'Keep upper arms vertical near ears, lower dumbbell slowly behind head.' },
  { name: 'Diamond Push-ups', muscle: 'Triceps', split: 'push', equipment: 'bodyweight', type: 'Weight Training', baseLoad: 0, baseReps: 12, baseSets: 3, caloriesRate: 6.5, tips: 'Form a triangle with thumbs and index fingers, flare elbows slightly back.' },

  // Pull / Back & Biceps & Rear Delts
  { name: 'Deadlift (Conventional)', muscle: 'Back', split: 'pull', equipment: 'gym', type: 'Weight Training', baseLoad: 70, baseReps: 6, baseSets: 4, caloriesRate: 8.0, tips: 'Bar over midfoot, brace core, drive the floor away through your heels.' },
  { name: 'Barbell Bent-Over Row', muscle: 'Back', split: 'pull', equipment: 'gym', type: 'Weight Training', baseLoad: 45, baseReps: 10, baseSets: 4, caloriesRate: 6.5, tips: 'Hinge at hips at 45 degrees, pull barbell to lower ribcage keeping spine neutral.' },
  { name: 'Lat Pulldown', muscle: 'Back', split: 'pull', equipment: 'gym', type: 'Weight Training', baseLoad: 45, baseReps: 10, baseSets: 3, caloriesRate: 6.0, tips: 'Pull bar to collarbone, drive elbows down and back, squeeze lats.' },
  { name: 'Single-Arm Dumbbell Row', muscle: 'Back', split: 'pull', equipment: 'dumbbells', type: 'Weight Training', baseLoad: 18, baseReps: 12, baseSets: 3, caloriesRate: 6.0, tips: 'Support knee and hand on bench, pull dumbbell to hip keeping torso flat.' },
  { name: 'Pull-ups / Chin-ups', muscle: 'Back', split: 'pull', equipment: 'bodyweight', type: 'Weight Training', baseLoad: 0, baseReps: 8, baseSets: 4, caloriesRate: 7.5, tips: 'Full extension at the bottom, pull chin cleanly above the bar.' },
  { name: 'Incline Dumbbell Rear Delt Flyes', muscle: 'Shoulders', split: 'pull', equipment: 'dumbbells', type: 'Weight Training', baseLoad: 7, baseReps: 15, baseSets: 3, caloriesRate: 5.0, tips: 'Chest on 45 degree bench, raise arms wide with thumbs pointed inward.' },
  { name: 'Barbell Bicep Curls', muscle: 'Biceps', split: 'pull', equipment: 'gym', type: 'Weight Training', baseLoad: 25, baseReps: 10, baseSets: 3, caloriesRate: 5.0, tips: 'Do not swing hips, keep elbows fixed, squeeze biceps at top peak.' },
  { name: 'Hammer Curls', muscle: 'Biceps', split: 'pull', equipment: 'dumbbells', type: 'Weight Training', baseLoad: 12, baseReps: 12, baseSets: 3, caloriesRate: 5.0, tips: 'Palms facing each other, targets brachialis and forearms.' },
  { name: 'Inverted Bodyweight Rows', muscle: 'Back', split: 'pull', equipment: 'bodyweight', type: 'Weight Training', baseLoad: 0, baseReps: 12, baseSets: 3, caloriesRate: 6.0, tips: 'Hang under a bar or table, pull chest to bar keeping body straight as a plank.' },

  // Legs & Glutes
  { name: 'Barbell Back Squat', muscle: 'Legs', split: 'legs', equipment: 'gym', type: 'Weight Training', baseLoad: 60, baseReps: 8, baseSets: 4, caloriesRate: 8.5, tips: 'Feet shoulder-width, knees track over toes, break parallel with hip crease.' },
  { name: 'Romanian Deadlift (RDL)', muscle: 'Legs', split: 'legs', equipment: 'gym', type: 'Weight Training', baseLoad: 50, baseReps: 10, baseSets: 3, caloriesRate: 7.0, tips: 'Soft bend in knees, push hips back to feel deep stretch in hamstrings.' },
  { name: 'Goblet Squats', muscle: 'Legs', split: 'legs', equipment: 'dumbbells', type: 'Weight Training', baseLoad: 20, baseReps: 12, baseSets: 3, caloriesRate: 7.0, tips: 'Hold dumbbell vertically against chest, keep upright torso throughout descent.' },
  { name: 'Bulgarian Split Squats', muscle: 'Legs', split: 'legs', equipment: 'dumbbells', type: 'Weight Training', baseLoad: 12, baseReps: 10, baseSets: 3, caloriesRate: 7.5, tips: 'Rear foot elevated on bench, lower until front thigh is parallel to floor.' },
  { name: 'Bodyweight Air Squats', muscle: 'Legs', split: 'legs', equipment: 'bodyweight', type: 'Weight Training', baseLoad: 0, baseReps: 20, baseSets: 4, caloriesRate: 6.5, tips: 'Quick rhythm, full depth, chest up.' },
  { name: 'Walking Lunges', muscle: 'Legs', split: 'legs', equipment: 'bodyweight', type: 'Weight Training', baseLoad: 0, baseReps: 20, baseSets: 3, caloriesRate: 7.0, tips: 'Take long strides, gently kiss back knee to floor, push through front heel.' },
  { name: 'Standing Calf Raises', muscle: 'Legs', split: 'legs', equipment: 'bodyweight', type: 'Weight Training', baseLoad: 0, baseReps: 25, baseSets: 4, caloriesRate: 4.5, tips: 'Pause 1 second at full top contraction and full bottom stretch.' },

  // Core & Abs
  { name: 'Hanging Leg Raises', muscle: 'Core', split: 'core', equipment: 'gym', type: 'Weight Training', baseLoad: 0, baseReps: 12, baseSets: 3, caloriesRate: 6.0, tips: 'Avoid swinging momentum, curl pelvis upward toward chest.' },
  { name: 'Standard Plank Hold', muscle: 'Core', split: 'core', equipment: 'bodyweight', type: 'Other', baseLoad: 0, baseReps: 60, baseSets: 3, caloriesRate: 5.0, tips: 'Elbows under shoulders, squeeze abs and glutes, keep neutral cervical spine.' },
  { name: 'Bicycle Crunches', muscle: 'Core', split: 'core', equipment: 'bodyweight', type: 'HIIT', baseLoad: 0, baseReps: 25, baseSets: 3, caloriesRate: 7.0, tips: 'Opposite elbow to opposite knee, slow deliberate rotation.' },
  { name: 'Dumbbell Russian Twists', muscle: 'Core', split: 'core', equipment: 'dumbbells', type: 'Weight Training', baseLoad: 8, baseReps: 20, baseSets: 3, caloriesRate: 6.0, tips: 'Elevate heels, rotate shoulders fully from side to side.' },
  { name: 'Mountain Climbers', muscle: 'Core', split: 'core', equipment: 'bodyweight', type: 'HIIT', baseLoad: 0, baseReps: 30, baseSets: 3, caloriesRate: 10.0, tips: 'Drive knees rapidly towards chest while keeping hips low.' },

  // HIIT & Cardio Burn
  { name: 'Full-Body Burpees', muscle: 'Full Body', split: 'cardio', equipment: 'bodyweight', type: 'HIIT', baseLoad: 0, baseReps: 15, baseSets: 4, caloriesRate: 12.0, tips: 'Drop chest to floor, jump feet in, explosive vertical jump with overhead clap.' },
  { name: 'Kettlebell / Dumbbell Swings', muscle: 'Full Body', split: 'cardio', equipment: 'dumbbells', type: 'HIIT', baseLoad: 16, baseReps: 20, baseSets: 4, caloriesRate: 10.5, tips: 'Hip hinge snap, do not squat the weight, use glutes to propel weight.' },
  { name: 'High Knees Sprint in Place', muscle: 'Cardio', split: 'cardio', equipment: 'bodyweight', type: 'Running', baseLoad: 0, baseReps: 45, baseSets: 4, caloriesRate: 11.0, tips: 'Pump arms, drive knees up to hip height at maximum tempo.' }
];

export const CURATED_ROUTINES = [
  {
    id: 'push-hypertrophy',
    title: 'Push Power & Hypertrophy',
    category: 'build_muscle',
    split: 'push',
    level: 'intermediate',
    equipment: 'gym',
    duration: 45,
    estimatedCalories: 310,
    intensity: 'High',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    description: 'Classic push workout focusing on chest pressing strength, shoulder lateral fullness, and locked-out triceps development.',
    exercises: [
      { name: 'Barbell Bench Press', sets: 4, reps: 8, load: 55, duration: 10, calories: 65, restSeconds: 90, targetMuscle: 'Chest', tips: 'Retract scapulae, touch lower chest, drive upwards without locking elbows completely.' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: 10, load: 20, duration: 8, calories: 50, restSeconds: 75, targetMuscle: 'Upper Chest', tips: 'Set bench to 30 degrees, press upward in an arch.' },
      { name: 'Standing Overhead Barbell Press', sets: 3, reps: 8, load: 35, duration: 8, calories: 55, restSeconds: 90, targetMuscle: 'Front Deltoids', tips: 'Keep core engaged, press straight overhead.' },
      { name: 'Dumbbell Lateral Raises', sets: 4, reps: 15, load: 8, duration: 8, calories: 45, restSeconds: 60, targetMuscle: 'Side Delts', tips: 'Lead with elbows, pause 1s at top.' },
      { name: 'Tricep Rope Pushdowns', sets: 3, reps: 12, load: 25, duration: 6, calories: 35, restSeconds: 60, targetMuscle: 'Triceps', tips: 'Pin elbows to ribs, split rope at bottom.' },
      { name: 'Push-ups', sets: 2, reps: 15, load: 0, duration: 5, calories: 30, restSeconds: 45, targetMuscle: 'Chest Burnout', tips: 'Perform as burnout finisher to failure.' }
    ]
  },
  {
    id: 'pull-strength-hypertrophy',
    title: 'Pull Mastery: Lat & Bicep Blitz',
    category: 'build_muscle',
    split: 'pull',
    level: 'intermediate',
    equipment: 'gym',
    duration: 45,
    estimatedCalories: 330,
    intensity: 'High',
    targetMuscles: ['Back', 'Biceps', 'Rear Delts'],
    description: 'Heavy back recruitment combined with vertical pulldowns and direct bicep contractions for an impressive V-taper.',
    exercises: [
      { name: 'Deadlift (Conventional)', sets: 4, reps: 6, load: 75, duration: 12, calories: 95, restSeconds: 120, targetMuscle: 'Posterior Chain', tips: 'Brace abdominal wall, push through heels.' },
      { name: 'Barbell Bent-Over Row', sets: 4, reps: 10, load: 45, duration: 10, calories: 65, restSeconds: 75, targetMuscle: 'Upper & Mid Back', tips: 'Pull bar to lower sternum, feel mid-back squeeze.' },
      { name: 'Lat Pulldown', sets: 3, reps: 10, load: 45, duration: 8, calories: 50, restSeconds: 60, targetMuscle: 'Lats', tips: 'Avoid swinging, initiate pull from shoulder blades.' },
      { name: 'Incline Dumbbell Rear Delt Flyes', sets: 3, reps: 15, load: 7, duration: 6, calories: 35, restSeconds: 60, targetMuscle: 'Rear Delts', tips: 'Keep thumbs down for maximum rear delt recruitment.' },
      { name: 'Barbell Bicep Curls', sets: 3, reps: 10, load: 25, duration: 6, calories: 35, restSeconds: 60, targetMuscle: 'Biceps', tips: 'Strict form, no swinging back.' },
      { name: 'Hammer Curls', sets: 3, reps: 12, load: 12, duration: 5, calories: 30, restSeconds: 45, targetMuscle: 'Brachialis', tips: 'Neutral grip, constant tension throughout.' }
    ]
  },
  {
    id: 'leg-day-dynamo',
    title: 'Lower Body Strength & Quad Sculpt',
    category: 'strength',
    split: 'legs',
    level: 'intermediate',
    equipment: 'gym',
    duration: 50,
    estimatedCalories: 380,
    intensity: 'Very High',
    targetMuscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    description: 'Complete lower body development utilizing compound barbell squats, single-leg stabilization, and hamstring hinging.',
    exercises: [
      { name: 'Barbell Back Squat', sets: 4, reps: 8, load: 60, duration: 14, calories: 120, restSeconds: 120, targetMuscle: 'Quads & Glutes', tips: 'Chest up, break parallel with hip crease.' },
      { name: 'Romanian Deadlift (RDL)', sets: 3, reps: 10, load: 50, duration: 10, calories: 75, restSeconds: 90, targetMuscle: 'Hamstrings & Glutes', tips: 'Hinge hips backward, keep bar close to shins.' },
      { name: 'Bulgarian Split Squats', sets: 3, reps: 10, load: 12, duration: 10, calories: 75, restSeconds: 75, targetMuscle: 'Glutes & Quads', tips: 'Elevate rear foot, descend with control.' },
      { name: 'Walking Lunges', sets: 3, reps: 20, load: 0, duration: 8, calories: 60, restSeconds: 60, targetMuscle: 'Leg Endurance', tips: 'Take consistent strides, push off front heel.' },
      { name: 'Standing Calf Raises', sets: 4, reps: 25, load: 0, duration: 6, calories: 30, restSeconds: 45, targetMuscle: 'Calves', tips: 'Hold peak contraction for 1 full second.' }
    ]
  },
  {
    id: 'hiit-fat-furnace',
    title: 'Full Body High-Burn MetCon',
    category: 'lose_fat',
    split: 'cardio',
    level: 'all_levels',
    equipment: 'dumbbells',
    duration: 30,
    estimatedCalories: 340,
    intensity: 'High',
    targetMuscles: ['Full Body', 'Cardio', 'Core'],
    description: 'High intensity interval circuit engineered to elevate metabolic rate, torch calories, and build cardiovascular stamina.',
    exercises: [
      { name: 'Full-Body Burpees', sets: 4, reps: 15, load: 0, duration: 8, calories: 95, restSeconds: 45, targetMuscle: 'Full Body', tips: 'Explosive jump at top, keep core tight on kick out.' },
      { name: 'Kettlebell / Dumbbell Swings', sets: 4, reps: 20, load: 16, duration: 8, calories: 85, restSeconds: 45, targetMuscle: 'Posterior Chain', tips: 'Snap hips forward forcefully, lock out glutes.' },
      { name: 'Goblet Squats', sets: 3, reps: 15, load: 16, duration: 6, calories: 60, restSeconds: 45, targetMuscle: 'Quads & Core', tips: 'Maintain fast yet controlled tempo.' },
      { name: 'Mountain Climbers', sets: 3, reps: 30, load: 0, duration: 5, calories: 50, restSeconds: 30, targetMuscle: 'Abs & Cardio', tips: 'Pump knees rapidly without bouncing hips high.' },
      { name: 'Bicycle Crunches', sets: 3, reps: 25, load: 0, duration: 4, calories: 35, restSeconds: 30, targetMuscle: 'Obliques', tips: 'Rotate elbow across to knee with precision.' }
    ]
  },
  {
    id: 'home-calisthenics-zero-gear',
    title: 'Zero-Equipment Calisthenics Routine',
    category: 'home',
    split: 'full_body',
    level: 'beginner',
    equipment: 'bodyweight',
    duration: 30,
    estimatedCalories: 220,
    intensity: 'Moderate',
    targetMuscles: ['Chest', 'Legs', 'Core', 'Triceps'],
    description: 'No gym or weights required. A balanced, athletic workout using pure bodyweight biomechanics that can be done anywhere.',
    exercises: [
      { name: 'Push-ups', sets: 4, reps: 15, load: 0, duration: 8, calories: 55, restSeconds: 60, targetMuscle: 'Chest & Triceps', tips: 'Hands slightly wider than shoulders, body rigid.' },
      { name: 'Bodyweight Air Squats', sets: 4, reps: 20, load: 0, duration: 8, calories: 55, restSeconds: 45, targetMuscle: 'Quads & Glutes', tips: 'Deep range of motion, hands out in front for balance.' },
      { name: 'Diamond Push-ups', sets: 3, reps: 10, load: 0, duration: 6, calories: 40, restSeconds: 60, targetMuscle: 'Triceps', tips: 'Keep elbows tucked back closer to torso.' },
      { name: 'Walking Lunges', sets: 3, reps: 20, load: 0, duration: 6, calories: 45, restSeconds: 45, targetMuscle: 'Legs', tips: 'Upright chest, descend smoothly.' },
      { name: 'Standard Plank Hold', sets: 3, reps: 60, load: 0, duration: 4, calories: 25, restSeconds: 45, targetMuscle: 'Core', tips: 'Reps represent seconds held. Squeeze abs firmly.' }
    ]
  },
  {
    id: 'dumbbell-total-body',
    title: 'Dumbbell-Only Total Body Sculpt',
    category: 'build_muscle',
    split: 'full_body',
    level: 'intermediate',
    equipment: 'dumbbells',
    duration: 40,
    estimatedCalories: 280,
    intensity: 'Moderate',
    targetMuscles: ['Chest', 'Back', 'Shoulders', 'Legs'],
    description: 'Perfect for home workouts or crowded gyms. Targets all primary muscle groups with a single pair of dumbbells.',
    exercises: [
      { name: 'Goblet Squats', sets: 3, reps: 12, load: 20, duration: 8, calories: 60, restSeconds: 60, targetMuscle: 'Quads', tips: 'Hold dumbbell high on chest, sit between heels.' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: 10, load: 18, duration: 8, calories: 55, restSeconds: 60, targetMuscle: 'Chest', tips: 'Control the descent for 2 full seconds.' },
      { name: 'Single-Arm Dumbbell Row', sets: 3, reps: 12, load: 18, duration: 8, calories: 55, restSeconds: 60, targetMuscle: 'Back', tips: 'Pull dumbbell towards back hip, not shoulder.' },
      { name: 'Dumbbell Romanian Deadlift (RDL)', sets: 3, reps: 10, load: 20, duration: 7, calories: 50, restSeconds: 60, targetMuscle: 'Hamstrings', tips: 'Keep dumbbells brushing along thighs.' },
      { name: 'Dumbbell Lateral Raises', sets: 3, reps: 12, load: 8, duration: 5, calories: 30, restSeconds: 45, targetMuscle: 'Shoulders', tips: 'Lift with controlled tempo, no body bounce.' },
      { name: 'Hammer Curls', sets: 3, reps: 12, load: 10, duration: 5, calories: 30, restSeconds: 45, targetMuscle: 'Arms', tips: 'Slow eccentric release to maximize pump.' }
    ]
  }
];

export const getDayOfWeekRoutine = (goal = 'maintain') => {
  const dayIndex = new Date().getDay();
  const dayRoutines = {
    1: CURATED_ROUTINES[0], // Push
    2: CURATED_ROUTINES[1], // Pull
    3: CURATED_ROUTINES[2], // Legs
    4: CURATED_ROUTINES[3], // HIIT
    5: CURATED_ROUTINES[5], // Total Body Dumbbells
    6: CURATED_ROUTINES[4], // Calisthenics
    0: CURATED_ROUTINES[3]  // HIIT / Recovery
  };

  let routine = dayRoutines[dayIndex] || CURATED_ROUTINES[0];

  if (goal === 'lose_fat' && dayIndex % 2 === 0) {
    routine = CURATED_ROUTINES[3];
  } else if (goal === 'build_muscle' && (dayIndex === 0 || dayIndex === 4)) {
    routine = CURATED_ROUTINES[0];
  }

  return {
    ...routine,
    dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex],
    isTodayRecommendation: true
  };
};

export const generateCustomRoutine = ({
  goal = 'build_muscle',
  level = 'intermediate',
  targetMuscles = 'full_body',
  equipment = 'gym',
  duration = 45,
  userWeight = 70
}) => {
  const targetDur = Number(duration) || 45;
  const numExercises = targetDur <= 20 ? 3 : targetDur <= 35 ? 4 : targetDur <= 45 ? 5 : 6;

  let pool = EXERCISE_DATABASE.filter((ex) => {
    if (equipment === 'bodyweight') return ex.equipment === 'bodyweight';
    if (equipment === 'dumbbells') return ex.equipment === 'dumbbells' || ex.equipment === 'bodyweight';
    return true;
  });

  if (targetMuscles === 'push') {
    pool = pool.filter((ex) => ex.split === 'push' || ex.muscle === 'Chest' || ex.muscle === 'Shoulders' || ex.muscle === 'Triceps');
  } else if (targetMuscles === 'pull') {
    pool = pool.filter((ex) => ex.split === 'pull' || ex.muscle === 'Back' || ex.muscle === 'Biceps');
  } else if (targetMuscles === 'legs') {
    pool = pool.filter((ex) => ex.split === 'legs' || ex.muscle === 'Legs');
  } else if (targetMuscles === 'core') {
    pool = pool.filter((ex) => ex.split === 'core' || ex.muscle === 'Core' || ex.split === 'cardio');
  }

  if (pool.length < numExercises) {
    pool = EXERCISE_DATABASE.filter((ex) => equipment === 'bodyweight' ? ex.equipment === 'bodyweight' : true);
  }

  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, numExercises);

  let repModifier = 1;
  let setModifier = 0;
  let restSeconds = 60;
  let goalTitlePrefix = 'Tailored';

  if (goal === 'build_muscle') {
    repModifier = 1.0;
    setModifier = level === 'advanced' ? 1 : 0;
    restSeconds = 75;
    goalTitlePrefix = 'Hypertrophy';
  } else if (goal === 'lose_fat') {
    repModifier = 1.3;
    setModifier = 0;
    restSeconds = 45;
    goalTitlePrefix = 'Calorie Shred';
  } else if (goal === 'strength') {
    repModifier = 0.7;
    setModifier = 1;
    restSeconds = 120;
    goalTitlePrefix = 'Maximum Strength';
  } else if (goal === 'endurance') {
    repModifier = 1.5;
    restSeconds = 30;
    goalTitlePrefix = 'Endurance & Stamina';
  }

  const exDuration = Math.round(targetDur / numExercises);
  let totalCalories = 0;

  const exercises = selected.map((ex) => {
    let sets = Math.max(2, ex.baseSets + setModifier);
    let reps = Math.max(5, Math.round(ex.baseReps * repModifier));
    
    let load = ex.baseLoad;
    if (load > 0) {
      if (level === 'beginner') load = Math.round(load * 0.75);
      if (level === 'advanced') load = Math.round(load * 1.25);
      if (userWeight > 80) load = Math.round(load * 1.1);
      else if (userWeight < 60) load = Math.round(load * 0.9);
    }

    const exCals = Math.round(exDuration * ex.caloriesRate * (userWeight / 70));
    totalCalories += exCals;

    return {
      name: ex.name,
      sets,
      reps,
      load,
      duration: exDuration,
      calories: exCals,
      restSeconds,
      targetMuscle: ex.muscle,
      tips: ex.tips
    };
  });

  const muscleLabel = targetMuscles.replace('_', ' ').toUpperCase();
  const title = `${goalTitlePrefix} ${muscleLabel} Routine (${targetDur}m)`;

  return {
    id: `custom-${Date.now()}`,
    title,
    category: goal,
    level,
    equipment,
    duration: targetDur,
    estimatedCalories: totalCalories,
    intensity: goal === 'lose_fat' || level === 'advanced' ? 'High' : 'Moderate',
    targetMuscles: [...new Set(selected.map((s) => s.muscle))],
    description: `Personalized ${targetDur}-minute workout tailored for ${level} level focusing on ${muscleLabel.toLowerCase()} with ${equipment} equipment.`,
    exercises
  };
};
