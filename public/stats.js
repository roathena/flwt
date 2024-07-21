const messageDiv = document.getElementById('message');

// Function to fetch and display weight stats
async function fetchStats() {
    try {
        const response = await fetch('/stats');
        const weights = await response.json();

        // Update UI elements to display weights with formatted dates and times
        document.getElementById('stats-container').innerHTML = `
        <h2>Logged Weights</h2>
        <ul>
          ${weights.map(weight => `<li>${weight.formattedDateTime}: ${weight.weight} kg</li>`).join('')}
        </ul>`;
    } catch (error) {
        console.error(error);
        console.error(error);
        messageDiv.textContent = 'Whoops! Something went wrong. Try again!';
    }
}

// Call fetchStats() when the "View Stats" page loads
if (window.location.pathname === './view-stats.html') {
    fetchStats();
}
