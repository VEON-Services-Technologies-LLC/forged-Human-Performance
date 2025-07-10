// Fat Loss Calculator
document.addEventListener('DOMContentLoaded', function() {
  const fatLossForm = document.getElementById('fat-loss-form');
  
  if (fatLossForm) {
    fatLossForm.addEventListener('submit', function(event) {
      event.preventDefault();
      calculateFatLoss();
    });
  }
});

function calculateFatLoss() {
  // Get form inputs
  const height = parseFloat(document.getElementById('height-fat-loss').value);
  const age = parseInt(document.getElementById('age-fat-loss').value);
  const weight = parseFloat(document.getElementById('weight-fat-loss').value);
  const gender = document.getElementById('gender-fat-loss').value;
  const activity = parseFloat(document.getElementById('activity-fat-loss').value);
  const currentFatPercentage = parseFloat(document.getElementById('current-fat-percentage').value) / 100;
  const targetFatPercentage = parseFloat(document.getElementById('target-fat-percentage').value) / 100;

  // Validate inputs
  if (isNaN(height) || isNaN(age) || isNaN(weight) || isNaN(currentFatPercentage) || isNaN(targetFatPercentage)) {
    alert('Please enter valid numbers in all fields.');
    return;
  }

  if (currentFatPercentage < 0 || currentFatPercentage > 1 || targetFatPercentage < 0 || targetFatPercentage > 1) {
    alert('Please enter valid body fat percentages between 1 and 100.');
    return;
  }

  // Calculate BMR based on gender and age
  let bmr = 0;
  if (gender === 'male') {
    if (age >= 18 && age <= 30) {
      bmr = (6.53 * weight) + (7.95 * height) + 113;
    } else if (age > 30 && age <= 60) {
      bmr = (5.17 * weight) + (13.74 * height) - 137;
    } else if (age > 60) {
      bmr = (5.17 * weight) + (13.74 * height) - 256;
    }
  } else if (gender === 'female') {
    if (age >= 18 && age <= 30) {
      bmr = (4.72 * weight) + (15.62 * height) - 282;
    } else if (age > 30 && age <= 60) {
      bmr = (3.71 * weight) + (12.75 * height) - 11.6;
    } else if (age > 60) {
      bmr = (3.71 * weight) + (12.75 * height) - 256;
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
  document.getElementById('bmr-result-fat-loss').textContent = `${bmr.toFixed(2)} kcal/day`;
  document.getElementById('tdee-result-fat-loss').textContent = `${tdee.toFixed(2)} kcal/day`;
  document.getElementById('lean-mass-result-fat-loss').textContent = `${currentLeanMass.toFixed(2)} lbs`;
  document.getElementById('fat-mass-result-fat-loss').textContent = `${currentFatMass.toFixed(2)} lbs`;
  document.getElementById('target-fat-mass-result-fat-loss').textContent = `${targetFatMass.toFixed(2)} lbs`;
  document.getElementById('fat-to-lose-result-fat-loss').textContent = `${fatToLose.toFixed(2)} lbs`;
  
  // Scroll to results
  document.getElementById('fat-loss-results').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

//2nd calculator here
// Daily Caloric Intake Calculator
document.addEventListener('DOMContentLoaded', function() {
  const caloricIntakeForm = document.getElementById('caloric-intake-form');
  
  if (caloricIntakeForm) {
    // Get all radio buttons and dependent inputs
    const goalRadios = document.querySelectorAll('input[name="goal"]');
    const fatToLoseInput = document.getElementById('fat-to-lose');
    const muscleToGainInput = document.getElementById('muscle-to-gain');
    
    // Add change event listeners to radio buttons
    goalRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        // Reset and disable both inputs first
        fatToLoseInput.value = '';
        fatToLoseInput.disabled = true;
        muscleToGainInput.value = '';
        muscleToGainInput.disabled = true;
        
        // Enable relevant inputs based on selection
        if (this.value === 'fat_loss') {
          fatToLoseInput.disabled = false;
        } else if (this.value === 'muscle_gain') {
          muscleToGainInput.disabled = false;
        } else if (this.value === 'recomposition') {
          fatToLoseInput.disabled = false;
          muscleToGainInput.disabled = false;
        }
      });
    });

    // Form submission
    caloricIntakeForm.addEventListener('submit', function(event) {
      event.preventDefault();
      calculateCaloricIntake();
    });
  }
});

function calculateCaloricIntake() {
  const selectedGoal = document.querySelector('input[name="goal"]:checked');
  const tdee = parseFloat(document.getElementById('tdee').value);
  
  if (!selectedGoal) {
    alert('Please select a goal');
    return;
  }
  
  if (isNaN(tdee)) {  // Fixed missing parenthesis
    alert('Please enter your TDEE');
    return;
  }

  let minimalCalories, moderateCalories, maximalCalories;
  let minimalTime, moderateTime, maximalTime;

  switch(selectedGoal.value) {
    case 'fat_loss':
      const fatToLose = parseFloat(document.getElementById('fat-to-lose').value);
      if (isNaN(fatToLose)) {
        alert('Please enter the amount of fat to lose');
        return;
      }
      
      minimalCalories = tdee - 500;
      moderateCalories = tdee - 750;
      maximalCalories = tdee - 1000;
      
      minimalTime = Math.ceil(fatToLose / 1) + ' weeks';
      moderateTime = Math.ceil(fatToLose / 1.5) + ' weeks';
      maximalTime = Math.ceil(fatToLose / 2) + ' weeks';
      break;
      
    case 'muscle_gain':
      const muscleToGain = parseFloat(document.getElementById('muscle-to-gain').value);
      if (isNaN(muscleToGain)) {
        alert('Please enter the amount of muscle to gain');
        return;
      }
      
      minimalCalories = tdee + 250;
      moderateCalories = tdee + 375;
      maximalCalories = tdee + 500;
      
      minimalTime = Math.ceil(muscleToGain / 0.5) + ' weeks';
      moderateTime = Math.ceil(muscleToGain / 0.75) + ' weeks';
      maximalTime = Math.ceil(muscleToGain / 1) + ' weeks';
      break;
      
    case 'recomposition':
      const recompFatToLose = parseFloat(document.getElementById('fat-to-lose').value);
      const recompMuscleToGain = parseFloat(document.getElementById('muscle-to-gain').value);
      
      if (isNaN(recompFatToLose) || isNaN(recompMuscleToGain)) {
        alert('Please enter both fat to lose and muscle to gain');
        return;
      }
      
      minimalCalories = tdee - 250;
      moderateCalories = tdee;
      maximalCalories = tdee + 250;
      
      minimalTime = Math.max(
        Math.ceil(recompFatToLose / 0.5),
        Math.ceil(recompMuscleToGain / 0.25)
      ) + ' weeks';
      
      moderateTime = Math.max(
        Math.ceil(recompFatToLose / 0.75),
        Math.ceil(recompMuscleToGain / 0.5)
      ) + ' weeks';
      
      maximalTime = Math.max(
        Math.ceil(recompFatToLose / 1),
        Math.ceil(recompMuscleToGain / 0.75)
      ) + ' weeks';
      break;
      
    case 'maintenance':
      minimalCalories = tdee;
      moderateCalories = tdee;
      maximalCalories = tdee;
      
      minimalTime = 'N/A';
      moderateTime = 'N/A';
      maximalTime = 'N/A';
      break;
  }

  // Display results
  document.getElementById('minimal-calories').textContent = minimalCalories.toFixed(0) + ' kcal/day';
  document.getElementById('minimal-time').textContent = minimalTime;
  document.getElementById('moderate-calories').textContent = moderateCalories.toFixed(0) + ' kcal/day';
  document.getElementById('moderate-time').textContent = moderateTime;
  document.getElementById('maximal-calories').textContent = maximalCalories.toFixed(0) + ' kcal/day';
  document.getElementById('maximal-time').textContent = maximalTime;
  
  // Scroll to results
  document.getElementById('caloric-intake-results').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 3rd calculator here

// Macro Ratio Calculator
document.addEventListener('DOMContentLoaded', function() {
  const macroForm = document.getElementById('macro-form');
  
  if (macroForm) {
    // Sync range sliders with number inputs
    const proteinRange = document.getElementById('protein-range');
    const carbsRange = document.getElementById('carbs-range');
    const fatRange = document.getElementById('fat-range');
    const proteinPercent = document.getElementById('protein-percent');
    const carbsPercent = document.getElementById('carbs-percent');
    const fatPercent = document.getElementById('fat-percent');
    
    // Initialize values
    proteinRange.value = proteinPercent.value;
    carbsRange.value = carbsPercent.value;
    fatRange.value = fatPercent.value;
    
    // Add event listeners for sliders
    proteinRange.addEventListener('input', function() {
      proteinPercent.value = this.value;
      updateMacroTotal();
    });
    
    carbsRange.addEventListener('input', function() {
      carbsPercent.value = this.value;
      updateMacroTotal();
    });
    
    fatRange.addEventListener('input', function() {
      fatPercent.value = this.value;
      updateMacroTotal();
    });
    
    // Add event listeners for number inputs
    proteinPercent.addEventListener('input', function() {
      proteinRange.value = this.value;
      updateMacroTotal();
    });
    
    carbsPercent.addEventListener('input', function() {
      carbsRange.value = this.value;
      updateMacroTotal();
    });
    
    fatPercent.addEventListener('input', function() {
      fatRange.value = this.value;
      updateMacroTotal();
    });
    
    // Form submission
    macroForm.addEventListener('submit', function(event) {
      event.preventDefault();
      calculateMacros();
    });
  }
});

function updateMacroTotal() {
  const protein = parseInt(document.getElementById('protein-percent').value) || 0;
  const carbs = parseInt(document.getElementById('carbs-percent').value) || 0;
  const fat = parseInt(document.getElementById('fat-percent').value) || 0;
  const total = protein + carbs + fat;
  
  document.getElementById('macro-total').textContent = total + '%';
  
  // Update bar visualization
  document.querySelector('.protein-bar').style.width = protein + '%';
  document.querySelector('.carbs-bar').style.width = carbs + '%';
  document.querySelector('.fat-bar').style.width = fat + '%';
}

function calculateMacros() {
  const calories = parseFloat(document.getElementById('calories-macro').value);
  const proteinPercent = parseFloat(document.getElementById('protein-percent').value);
  const carbsPercent = parseFloat(document.getElementById('carbs-percent').value);
  const fatPercent = parseFloat(document.getElementById('fat-percent').value);
  
  // Validate inputs
  if (isNaN(calories) || calories <= 0) {
    alert('Please enter a valid caloric intake');
    return;
  }
  
  // Check if total is 100%
  const total = proteinPercent + carbsPercent + fatPercent;
  if (total !== 100) {
    alert('Macronutrient percentages must add up to 100%');
    return;
  }
  
  // Calculate grams (4 cal/g for protein and carbs, 9 cal/g for fat)
  const proteinGrams = (proteinPercent / 100 * calories) / 4;
  const carbsGrams = (carbsPercent / 100 * calories) / 4;
  const fatGrams = (fatPercent / 100 * calories) / 9;
  
  // Display results
  document.getElementById('protein-result').textContent = proteinGrams.toFixed(1) + ' g';
  document.getElementById('carbs-result').textContent = carbsGrams.toFixed(1) + ' g';
  document.getElementById('fat-result').textContent = fatGrams.toFixed(1) + ' g';
  
  // Scroll to results
  document.getElementById('macro-results').scrollIntoView({ behavior: 'smooth', block: 'center' });
}