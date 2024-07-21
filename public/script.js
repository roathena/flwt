const weightForm = document.getElementById('weight-form');
const weightInput = document.getElementById('weight');
const messageDiv = document.getElementById('message');

weightForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Parse weight as float and validate range (50-150)
  const weight = parseFloat(weightInput.value);
  if (weight < 50 || weight > 150) {
    messageDiv.textContent = 'Invalid weight! Must be between 50 and 150 kg.';
    return; // Exit the function if validation fails
  }

  try {
    const response = await fetch('/weight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weight }),
    });

    const data = await response.json();
    messageDiv.textContent = data.message;
    weightInput.value = ''; // Clear the input field after successful submission

  } catch (error) {
    console.error(error);
    messageDiv.textContent = 'Whoops! Something went wrong. Try again!';
  }
});
