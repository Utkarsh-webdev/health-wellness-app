export function buildRecommendations(profile) {
  const recs = [];
  const {
    height,          // cm
    goalWeight,      // kg
    activityLevel,
    fitnessGoals = [],
    dietaryRestrictions = [],
    medicalConditions = [],
  } = profile;

  // BMI based on GOAL weight (what they aim for)
  if (height && goalWeight) {
    const hM = Number(height) / 100;
    if (hM > 0) {
      const bmi = Number(goalWeight) / (hM * hM);
      const bmiRounded = Math.round(bmi * 10) / 10;
      if (bmi < 18.5) {
        recs.push(
          `⚠️ Your goal BMI is ${bmiRounded} (underweight). Consider a gradual surplus and professional guidance.`
        );
      } else if (bmi <= 24.9) {
        recs.push(`✅ Your goal BMI is ${bmiRounded} (healthy range). Maintain balanced habits.`);
      } else if (bmi <= 29.9) {
        recs.push(
          `ℹ️ Your goal BMI is ${bmiRounded} (overweight). Aim for a mild calorie deficit and consistent activity.`
        );
      } else {
        recs.push(
          `⚠️ Your goal BMI is ${bmiRounded} (obese range). Consider medical and nutrition guidance with a sustainable plan.`
        );
      }
    }
  } else {
    recs.push("ℹ️ Add height and goal weight to receive BMI-based guidance.");
  }

  // Activity level nudges
  const activityTips = {
    "": "Start with 20–30 mins of light movement daily.",
    sedentary: "Walk 30 mins daily and add 2 beginner workouts/week.",
    light: "Add 2–3 structured workouts/week plus daily steps.",
    moderate: "Great! Keep 3–4 sessions/week and progressive overload.",
    active: "Excellent! Ensure deload weeks and recovery nutrition.",
  };
  recs.push(activityTips[activityLevel || ""] || activityTips[""]);

  // Fitness goals
  const has = (g) => fitnessGoals.includes(g);
  if (has("Weight Loss")) recs.push("🥗 Prioritize a modest calorie deficit and 150+ mins/week of cardio.");
  if (has("Weight Gain")) recs.push("🍚 Eat in a small surplus with 1.6–2.2g protein/kg and lift 3–5x/week.");
  if (has("Muscle Building")) recs.push("🏋️ Focus on compound lifts, progressive overload, and high-protein meals.");
  if (has("Cardio Improvement")) recs.push("❤️ Intervals + steady-state 3–4x/week; track HR zones.");
  if (has("Strength Training")) recs.push("💪 3–5 sessions/week; track sets/reps and add weight gradually.");
  if (has("Flexibility")) recs.push("🧘 10–15 min mobility after workouts; 2–3 yoga sessions/week.");
  if (has("General Health")) recs.push("🌿 7–9h sleep, hydration, whole foods, and daily steps.");
  if (has("Stress Reduction")) recs.push("🧠 Try 5–10 min daily breathing/meditation and light walks.");
  if (has("Better Sleep")) recs.push("🌙 Fixed sleep/wake times; limit late caffeine and screens.");
  if (has("Athletic Performance")) recs.push("⚡ Add sport-specific drills and periodize training blocks.");

  // Dietary restrictions
  if (dietaryRestrictions.includes("Vegan"))
    recs.push("🌱 Plan for B12, iron, calcium, and omega-3 from fortified foods/supplements.");
  if (dietaryRestrictions.includes("Keto"))
    recs.push("🥓 Stay hydrated; monitor electrolytes (sodium, potassium, magnesium).");
  if (dietaryRestrictions.includes("Gluten-Free"))
    recs.push("🌾 Choose naturally GF whole foods; check labels for hidden gluten.");
  if (dietaryRestrictions.includes("Dairy-Free"))
    recs.push("🥛 Get calcium/vitamin D via fortified alternatives and sunlight exposure.");
  if (dietaryRestrictions.includes("Low-Sodium"))
    recs.push("🧂 Cook at home more; use herbs/spices to reduce salt reliance.");

  // Medical flags (very general + safe nudges)
  const med = (m) => medicalConditions.includes(m);
  if (med("Diabetes")) recs.push("🩸 Monitor carbs/fiber; discuss exercise plan with your clinician.");
  if (med("Hypertension")) recs.push("🫀 Emphasize DASH-style foods; keep sodium low and move daily.");
  if (med("Heart Disease")) recs.push("❤️ Favor cardio, gentle progression, and clinician-approved intensity.");
  if (med("Asthma")) recs.push("🌬️ Warm-ups and avoid known triggers; keep inhaler as prescribed.");
  if (med("Arthritis")) recs.push("🦴 Low-impact cardio and joint-friendly strength work are helpful.");
  if (med("Depression") || med("Anxiety"))
    recs.push("🧘 Regular activity and sleep hygiene help; consider mindfulness practices.");

  // Keep list tidy
  return Array.from(new Set(recs)).slice(0, 12);
}
