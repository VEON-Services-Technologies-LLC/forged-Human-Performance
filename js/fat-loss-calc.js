// Fat Loss Calculator
document.addEventListener("DOMContentLoaded", function () {
  const fatLossForm = document.getElementById("fat-loss-form");

  if (fatLossForm) {
    fatLossForm.addEventListener("submit", function (event) {
      event.preventDefault();
      calculateFatLoss();
    });
  }
});

function calculateFatLoss() {
  // Get form inputs
  const height = parseFloat(document.getElementById("height-fat-loss").value);
  const age = parseInt(document.getElementById("age-fat-loss").value);
  const weight = parseFloat(document.getElementById("weight-fat-loss").value);
  const gender = document.getElementById("gender-fat-loss").value;
  const activity = parseFloat(
    document.getElementById("activity-fat-loss").value
  );
  const currentFatPercentage =
    parseFloat(document.getElementById("current-fat-percentage").value) / 100;
  const targetFatPercentage =
    parseFloat(document.getElementById("target-fat-percentage").value) / 100;

  // Validate inputs
  if (
    isNaN(height) ||
    isNaN(age) ||
    isNaN(weight) ||
    isNaN(currentFatPercentage) ||
    isNaN(targetFatPercentage)
  ) {
    alert("Please enter valid numbers in all fields.");
    return;
  }

  if (
    currentFatPercentage < 0 ||
    currentFatPercentage > 1 ||
    targetFatPercentage < 0 ||
    targetFatPercentage > 1
  ) {
    alert("Please enter valid body fat percentages between 1 and 100.");
    return;
  }

  // Calculate BMR based on gender and age
  let bmr = 0;
  if (gender === "male") {
    if (age >= 18 && age <= 30) {
      bmr = 6.53 * weight + 7.95 * height + 113;
    } else if (age > 30 && age <= 60) {
      bmr = 5.17 * weight + 13.74 * height - 137;
    } else if (age > 60) {
      bmr = 5.17 * weight + 13.74 * height - 256;
    }
  } else if (gender === "female") {
    if (age >= 18 && age <= 30) {
      bmr = 4.72 * weight + 15.62 * height - 282;
    } else if (age > 30 && age <= 60) {
      bmr = 3.71 * weight + 12.75 * height - 11.6;
    } else if (age > 60) {
      bmr = 3.71 * weight + 12.75 * height - 256;
    }
  }

  // Calculate TDEE based on activity level
  const tdee = bmr * activity;

  // Calculate body fat metrics
  const currentFatMass = weight * currentFatPercentage;
  const currentLeanMass = weight - currentFatMass;
  const targetFatMass = weight * targetFatPercentage;
  const fatToLose = currentFatMass - targetFatMass;

  // Display the results
  document.getElementById("bmr-result-fat-loss").textContent = `${bmr.toFixed(
    2
  )} kcal/day`;
  document.getElementById("tdee-result-fat-loss").textContent = `${tdee.toFixed(
    2
  )} kcal/day`;
  document.getElementById(
    "lean-mass-result-fat-loss"
  ).textContent = `${currentLeanMass.toFixed(2)} lbs`;
  document.getElementById(
    "fat-mass-result-fat-loss"
  ).textContent = `${currentFatMass.toFixed(2)} lbs`;
  document.getElementById(
    "target-fat-mass-result-fat-loss"
  ).textContent = `${targetFatMass.toFixed(2)} lbs`;
  document.getElementById(
    "fat-to-lose-result-fat-loss"
  ).textContent = `${fatToLose.toFixed(2)} lbs`;

  // Scroll to results
  document
    .getElementById("fat-loss-results")
    .scrollIntoView({ behavior: "smooth", block: "center" });
}

//2nd calculator here
// Daily Caloric Intake Calculator
document.addEventListener("DOMContentLoaded", function () {
  const caloricIntakeForm = document.getElementById("caloric-intake-form");

  if (caloricIntakeForm) {
    // Get all radio buttons and dependent inputs
    const goalRadios = document.querySelectorAll('input[name="goal"]');
    const fatToLoseInput = document.getElementById("fat-to-lose");
    const muscleToGainInput = document.getElementById("muscle-to-gain");

    // Add change event listeners to radio buttons
    goalRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        // Reset and disable both inputs first
        fatToLoseInput.value = "";
        fatToLoseInput.disabled = true;
        muscleToGainInput.value = "";
        muscleToGainInput.disabled = true;

        // Enable relevant inputs based on selection
        if (this.value === "fat_loss") {
          fatToLoseInput.disabled = false;
        } else if (this.value === "muscle_gain") {
          muscleToGainInput.disabled = false;
        } else if (this.value === "recomposition") {
          fatToLoseInput.disabled = false;
          muscleToGainInput.disabled = false;
        }
      });
    });

    // Form submission
    caloricIntakeForm.addEventListener("submit", function (event) {
      event.preventDefault();
      calculateCaloricIntake();
    });
  }
});

function calculateCaloricIntake() {
  const selectedGoal = document.querySelector('input[name="goal"]:checked');
  const tdee = parseFloat(document.getElementById("tdee").value);

  if (!selectedGoal) {
    alert("Please select a goal");
    return;
  }

  if (isNaN(tdee)) {
    // Fixed missing parenthesis
    alert("Please enter your TDEE");
    return;
  }

  let minimalCalories, moderateCalories, maximalCalories;
  let minimalTime, moderateTime, maximalTime;

  switch (selectedGoal.value) {
    case "fat_loss":
      const fatToLose = parseFloat(
        document.getElementById("fat-to-lose").value
      );
      if (isNaN(fatToLose)) {
        alert("Please enter the amount of fat to lose");
        return;
      }

      minimalCalories = tdee - 500;
      moderateCalories = tdee - 750;
      maximalCalories = tdee - 1000;

      minimalTime = Math.ceil(fatToLose / 1) + " weeks";
      moderateTime = Math.ceil(fatToLose / 1.5) + " weeks";
      maximalTime = Math.ceil(fatToLose / 2) + " weeks";
      break;

    case "muscle_gain":
      const muscleToGain = parseFloat(
        document.getElementById("muscle-to-gain").value
      );
      if (isNaN(muscleToGain)) {
        alert("Please enter the amount of muscle to gain");
        return;
      }

      minimalCalories = tdee + 250;
      moderateCalories = tdee + 375;
      maximalCalories = tdee + 500;

      minimalTime = Math.ceil(muscleToGain / 0.5) + " weeks";
      moderateTime = Math.ceil(muscleToGain / 0.75) + " weeks";
      maximalTime = Math.ceil(muscleToGain / 1) + " weeks";
      break;

    case "recomposition":
      const recompFatToLose = parseFloat(
        document.getElementById("fat-to-lose").value
      );
      const recompMuscleToGain = parseFloat(
        document.getElementById("muscle-to-gain").value
      );

      if (isNaN(recompFatToLose) || isNaN(recompMuscleToGain)) {
        alert("Please enter both fat to lose and muscle to gain");
        return;
      }

      minimalCalories = tdee - 250;
      moderateCalories = tdee;
      maximalCalories = tdee + 250;

      minimalTime =
        Math.max(
          Math.ceil(recompFatToLose / 0.5),
          Math.ceil(recompMuscleToGain / 0.25)
        ) + " weeks";

      moderateTime =
        Math.max(
          Math.ceil(recompFatToLose / 0.75),
          Math.ceil(recompMuscleToGain / 0.5)
        ) + " weeks";

      maximalTime =
        Math.max(
          Math.ceil(recompFatToLose / 1),
          Math.ceil(recompMuscleToGain / 0.75)
        ) + " weeks";
      break;

    case "maintenance":
      minimalCalories = tdee;
      moderateCalories = tdee;
      maximalCalories = tdee;

      minimalTime = "N/A";
      moderateTime = "N/A";
      maximalTime = "N/A";
      break;
  }

  // Display results
  document.getElementById("minimal-calories").textContent =
    minimalCalories.toFixed(0) + " kcal/day";
  document.getElementById("minimal-time").textContent = minimalTime;
  document.getElementById("moderate-calories").textContent =
    moderateCalories.toFixed(0) + " kcal/day";
  document.getElementById("moderate-time").textContent = moderateTime;
  document.getElementById("maximal-calories").textContent =
    maximalCalories.toFixed(0) + " kcal/day";
  document.getElementById("maximal-time").textContent = maximalTime;

  // Scroll to results
  document
    .getElementById("caloric-intake-results")
    .scrollIntoView({ behavior: "smooth", block: "center" });
}

// 3rd calculator here

// Macro Ratio Calculator
document.addEventListener("DOMContentLoaded", function () {
  const macroForm = document.getElementById("macro-form");

  if (macroForm) {
    // Sync range sliders with number inputs
    const proteinRange = document.getElementById("protein-range");
    const carbsRange = document.getElementById("carbs-range");
    const fatRange = document.getElementById("fat-range");
    const proteinPercent = document.getElementById("protein-percent");
    const carbsPercent = document.getElementById("carbs-percent");
    const fatPercent = document.getElementById("fat-percent");

    // Initialize values
    proteinRange.value = proteinPercent.value;
    carbsRange.value = carbsPercent.value;
    fatRange.value = fatPercent.value;

    // Add event listeners for sliders
    proteinRange.addEventListener("input", function () {
      proteinPercent.value = this.value;
      updateMacroTotal();
    });

    carbsRange.addEventListener("input", function () {
      carbsPercent.value = this.value;
      updateMacroTotal();
    });

    fatRange.addEventListener("input", function () {
      fatPercent.value = this.value;
      updateMacroTotal();
    });

    // Add event listeners for number inputs
    proteinPercent.addEventListener("input", function () {
      proteinRange.value = this.value;
      updateMacroTotal();
    });

    carbsPercent.addEventListener("input", function () {
      carbsRange.value = this.value;
      updateMacroTotal();
    });

    fatPercent.addEventListener("input", function () {
      fatRange.value = this.value;
      updateMacroTotal();
    });

    // Form submission
    macroForm.addEventListener("submit", function (event) {
      event.preventDefault();
      calculateMacros();
    });
  }
});

function updateMacroTotal() {
  const protein =
    parseInt(document.getElementById("protein-percent").value) || 0;
  const carbs = parseInt(document.getElementById("carbs-percent").value) || 0;
  const fat = parseInt(document.getElementById("fat-percent").value) || 0;
  const total = protein + carbs + fat;

  document.getElementById("macro-total").textContent = total + "%";

  // Update bar visualization
  document.querySelector(".protein-bar").style.width = protein + "%";
  document.querySelector(".carbs-bar").style.width = carbs + "%";
  document.querySelector(".fat-bar").style.width = fat + "%";
}

function calculateMacros() {
  const calories = parseFloat(document.getElementById("calories-macro").value);
  const proteinPercent = parseFloat(
    document.getElementById("protein-percent").value
  );
  const carbsPercent = parseFloat(
    document.getElementById("carbs-percent").value
  );
  const fatPercent = parseFloat(document.getElementById("fat-percent").value);

  // Validate inputs
  if (isNaN(calories) || calories <= 0) {
    alert("Please enter a valid caloric intake");
    return;
  }

  // Check if total is 100%
  const total = proteinPercent + carbsPercent + fatPercent;
  if (total !== 100) {
    alert("Macronutrient percentages must add up to 100%");
    return;
  }

  // Calculate grams (4 cal/g for protein and carbs, 9 cal/g for fat)
  const proteinGrams = ((proteinPercent / 100) * calories) / 4;
  const carbsGrams = ((carbsPercent / 100) * calories) / 4;
  const fatGrams = ((fatPercent / 100) * calories) / 9;

  // Display results
  document.getElementById("protein-result").textContent =
    proteinGrams.toFixed(1) + " g";
  document.getElementById("carbs-result").textContent =
    carbsGrams.toFixed(1) + " g";
  document.getElementById("fat-result").textContent =
    fatGrams.toFixed(1) + " g";

  // Scroll to results
  document
    .getElementById("macro-results")
    .scrollIntoView({ behavior: "smooth", block: "center" });
}
// ============================================
// 4th Calculator: 1RM & RPE Calculator
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  const oneRmForm = document.getElementById("one-rm-form");

  if (oneRmForm) {
    oneRmForm.addEventListener("submit", function (event) {
      event.preventDefault();
      calculateOneRM();
    });
  }
});

function calculateOneRM() {
  // Get form inputs
  const weight = parseFloat(document.getElementById("weight-1rm").value);
  const reps = parseInt(document.getElementById("reps-1rm").value);
  const rpe = parseFloat(document.getElementById("rpe-1rm").value);

  // Validate inputs
  if (isNaN(weight) || weight <= 0) {
    alert("Please enter a valid weight greater than 0.");
    return;
  }

  if (isNaN(reps) || reps < 1 || reps > 12) {
    alert("Please enter reps between 1 and 12 for accurate results.");
    return;
  }

  if (isNaN(rpe) || rpe < 6 || rpe > 10) {
    alert("Please enter an RPE between 6.0 and 10.0.");
    return;
  }

  // Calculate 1RM using three formulas

  // 1. Epley Formula
  const oneRmEpley = weight * (1 + reps / 30);

  // 2. Brzycki Formula
  const oneRmBrzycki = weight / (1.0278 - 0.0278 * reps);

  // 3. RPE-based Formula
  const denom = 1 - (0.0333 * reps + 0.0333 * (10 - rpe));

  // Check if denominator is valid
  if (denom <= 0) {
    alert("Inputs out of valid range. Try fewer reps or higher RPE.");
    return;
  }

  const oneRmRpe = weight / denom;

  // 4. Average the three formulas for final estimated 1RM
  const estimatedOneRM = (oneRmEpley + oneRmBrzycki + oneRmRpe) / 3;

  // Display individual formula results
  document.getElementById("epley-result").textContent =
    oneRmEpley.toFixed(1) + " lbs";
  document.getElementById("brzycki-result").textContent =
    oneRmBrzycki.toFixed(1) + " lbs";
  document.getElementById("rpe-based-result").textContent =
    oneRmRpe.toFixed(1) + " lbs";
  document.getElementById("estimated-1rm-result").textContent =
    estimatedOneRM.toFixed(1) + " lbs";

  // Generate percentage table (5% to 125% in 5% increments)
  generatePercentageTable(estimatedOneRM);

  // Show the percentage table
  document.getElementById("percentage-table-container").style.display = "block";

  // Scroll to results
  document
    .getElementById("one-rm-results")
    .scrollIntoView({ behavior: "smooth", block: "center" });
}

function generatePercentageTable(e1Rm) {
  const tableBody = document.getElementById("percentage-table-body");
  tableBody.innerHTML = ""; // Clear previous results

  const percentages = [];

  // Generate all percentages from 5% to 125% in 5% increments
  for (let p = 5; p <= 125; p += 5) {
    const percent = p / 100;
    const weightAtPercent = e1Rm * percent;
    percentages.push({
      percent: p,
      weight: weightAtPercent.toFixed(1),
    });
  }

  // Create table rows (3 columns per row)
  for (let i = 0; i < percentages.length; i += 3) {
    const row = document.createElement("tr");

    // Add up to 3 cells per row
    for (let j = 0; j < 3; j++) {
      const index = i + j;
      if (index < percentages.length) {
        const data = percentages[index];

        const percentCell = document.createElement("td");
        percentCell.textContent = data.percent + "%";
        percentCell.style.fontWeight = "600";

        const weightCell = document.createElement("td");
        weightCell.textContent = data.weight + " lbs";

        // Highlight 100% row
        if (data.percent === 100) {
          percentCell.style.backgroundColor = "rgba(212, 152, 41, 0.1)";
          weightCell.style.backgroundColor = "rgba(212, 152, 41, 0.1)";
          percentCell.style.color = "#d49829";
          weightCell.style.color = "#d49829";
          percentCell.style.fontWeight = "700";
          weightCell.style.fontWeight = "700";
        }

        row.appendChild(percentCell);
        row.appendChild(weightCell);
      } else {
        // Empty cells to maintain grid structure
        const emptyCell1 = document.createElement("td");
        const emptyCell2 = document.createElement("td");
        row.appendChild(emptyCell1);
        row.appendChild(emptyCell2);
      }
    }

    tableBody.appendChild(row);
  }
}

// ============================================
// 5th Calculator: Run Pace & Race Prediction Calculator
// ============================================

// Distance data (meters and miles)
const DISTANCES = {
  "1mile": { name: "1 Mile", meters: 1609.34, miles: 1.0 },
  "1.5mile": { name: "1.5 Miles", meters: 2414.01, miles: 1.5 },
  "5k": { name: "5K", meters: 5000, miles: 3.10686 },
  "10k": { name: "10K", meters: 10000, miles: 6.21371 },
  half: { name: "Half Marathon", meters: 21097.5, miles: 13.1094 },
  full: { name: "Marathon", meters: 42195, miles: 26.2188 },
};

document.addEventListener("DOMContentLoaded", function () {
  const runPaceForm = document.getElementById("run-pace-form");

  if (runPaceForm) {
    runPaceForm.addEventListener("submit", function (event) {
      event.preventDefault();
      calculateRunPace();
    });
  }
});

function calculateRunPace() {
  // Get form inputs
  const distanceKey = document.getElementById("distance-run").value;
  const hours = parseInt(document.getElementById("hours-run").value) || 0;
  const minutes = parseInt(document.getElementById("minutes-run").value);
  const seconds = parseInt(document.getElementById("seconds-run").value);
  const rpe = parseFloat(document.getElementById("rpe-run").value) || null;

  // Validate inputs
  if (!distanceKey) {
    alert("Please select a distance.");
    return;
  }

  if (isNaN(minutes) || isNaN(seconds)) {
    alert("Please enter valid time values.");
    return;
  }

  // Calculate total time in seconds
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds <= 0) {
    alert("Please enter a valid time greater than 0.");
    return;
  }

  // Get distance data
  const distance = DISTANCES[distanceKey];
  const distanceMeters = distance.meters;
  const distanceMiles = distance.miles;
  const distanceKm = distanceMeters / 1000;

  // Calculate current pace
  const paceSecPerMile = totalSeconds / distanceMiles;
  const paceSecPerKm = totalSeconds / distanceKm;

  // Format pace
  const pacePerMile = formatPace(paceSecPerMile);
  const pacePerKm = formatPace(paceSecPerKm);

  // Determine effort level
  let effortLevel = "Training Run";
  if (rpe !== null) {
    if (rpe >= 9) {
      effortLevel = "Race Effort (Accurate for predictions)";
    } else if (rpe >= 7) {
      effortLevel = "Hard Workout (Predictions less precise)";
    } else {
      effortLevel = "Easy/Moderate Run (No race predictions)";
    }
  } else {
    effortLevel = "Not specified";
  }

  // Display current pace
  document.getElementById("pace-per-mile").textContent = pacePerMile + " /mi";
  document.getElementById("pace-per-km").textContent = pacePerKm + " /km";
  document.getElementById("effort-level").textContent = effortLevel;

  // Calculate and display training paces
  calculateTrainingPaces(paceSecPerMile, paceSecPerKm);

  // Calculate and display race predictions if appropriate
  if (rpe === null || rpe >= 7) {
    if (totalSeconds >= 180 && totalSeconds <= 14400) {
      calculateRacePredictions(distanceMeters, totalSeconds, distanceMiles);
      document.getElementById("race-predictions-container").style.display =
        "block";
    } else {
      document.getElementById("race-predictions-container").style.display =
        "none";
    }
  } else {
    document.getElementById("race-predictions-container").style.display =
      "none";
  }

  // Scroll to results
  document
    .getElementById("run-pace-results")
    .scrollIntoView({ behavior: "smooth", block: "center" });
}

function calculateTrainingPaces(racePaceSecPerMile, racePaceSecPerKm) {
  // Training zone multipliers (based on Jack Daniels VDOT methodology)
  const zones = [
    {
      name: "Easy / Recovery",
      minMult: 1.15,
      maxMult: 1.35,
      mileId: "easy-pace-mile",
      kmId: "easy-pace-km",
    },
    {
      name: "Long Run",
      minMult: 1.1,
      maxMult: 1.2,
      mileId: "long-pace-mile",
      kmId: "long-pace-km",
    },
    {
      name: "Tempo / Threshold",
      minMult: 0.9,
      maxMult: 0.95,
      mileId: "tempo-pace-mile",
      kmId: "tempo-pace-km",
    },
    {
      name: "Intervals / VO2max",
      minMult: 0.8,
      maxMult: 0.9,
      mileId: "intervals-pace-mile",
      kmId: "intervals-pace-km",
    },
    {
      name: "Repeats / Speed",
      minMult: 0.7,
      maxMult: 0.85,
      mileId: "repeats-pace-mile",
      kmId: "repeats-pace-km",
    },
  ];

  zones.forEach((zone) => {
    const minPaceMile = racePaceSecPerMile * zone.minMult;
    const maxPaceMile = racePaceSecPerMile * zone.maxMult;

    const minPaceKm = racePaceSecPerKm * zone.minMult;
    const maxPaceKm = racePaceSecPerKm * zone.maxMult;

    const paceRangeMile =
      formatPace(maxPaceMile) + " - " + formatPace(minPaceMile);
    const paceRangeKm = formatPace(maxPaceKm) + " - " + formatPace(minPaceKm);

    document.getElementById(zone.mileId).textContent = paceRangeMile;
    document.getElementById(zone.kmId).textContent = paceRangeKm;
  });

  // Show training paces container
  document.getElementById("training-paces-container").style.display = "block";
}

function calculateRacePredictions(
  inputDistanceMeters,
  inputTimeSeconds,
  inputDistanceMiles
) {
  const predictionsBody = document.getElementById("race-predictions-body");
  predictionsBody.innerHTML = "";

  // Use Riegel formula: T2 = T1 * (D2/D1)^1.06
  Object.keys(DISTANCES).forEach((key) => {
    const targetDistance = DISTANCES[key];
    const d2 = targetDistance.meters;
    const d1 = inputDistanceMeters;

    // Calculate predicted time
    const predictedSeconds = inputTimeSeconds * Math.pow(d2 / d1, 1.06);

    // Only show if predicted time is between 3 and 240 minutes
    if (predictedSeconds >= 180 && predictedSeconds <= 14400) {
      const predictedTime = formatTime(predictedSeconds);
      const predictedPace = formatPace(predictedSeconds / targetDistance.miles);

      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = targetDistance.name;
      nameCell.style.fontWeight = "600";
      nameCell.style.color = "#0c355a";

      const timeCell = document.createElement("td");
      timeCell.textContent = predictedTime;
      timeCell.style.fontSize = "1.5rem";

      const paceCell = document.createElement("td");
      paceCell.textContent = predictedPace + " /mi";
      paceCell.style.color = "#666";

      // Highlight the input distance
      if (key === document.getElementById("distance-run").value) {
        row.style.backgroundColor = "rgba(212, 152, 41, 0.1)";
        timeCell.style.color = "#d49829";
        timeCell.style.fontWeight = "700";
      }

      row.appendChild(nameCell);
      row.appendChild(timeCell);
      row.appendChild(paceCell);
      predictionsBody.appendChild(row);
    }
  });
}

// Helper function to format seconds into mm:ss
function formatPace(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return mins + ":" + (secs < 10 ? "0" : "") + secs;
}

// Helper function to format seconds into hh:mm:ss
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);

  if (hours > 0) {
    return (
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (secs < 10 ? "0" : "") +
      secs
    );
  } else {
    return minutes + ":" + (secs < 10 ? "0" : "") + secs;
  }
}
