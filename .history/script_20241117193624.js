function startRace() {
    const raceTrack = document.getElementById('race-track');
    const resultDiv = document.getElementById('result');
    const items = document.getElementById('items').value.split(',').map(item => item.trim());

    if (items.length < 2) {
        alert('Please enter at least 2 items!');
        return;
    }

    // Clear previous race track and results
    raceTrack.innerHTML = '';
    resultDiv.textContent = '';

    // Create runners
    const runners = items.map((item, index) => {
        const runner = document.createElement('div');
        runner.className = 'runner';
        runner.textContent = item;
        runner.style.left = '0px';
        runner.style.bottom = `${index * 50}px`;
        raceTrack.appendChild(runner);
        return { element: runner, position: 0, name: item };
    });

    // Adjust speed and interval
    const speedFactor = 5; // Reduce speed
    const intervalTime = 50; // Slow down update frequency

    // Start the race
    let raceInterval = setInterval(() => {
        runners.forEach(runner => {
            // Move each runner by a smaller step
            runner.position += Math.random() * speedFactor; // Smaller steps
            runner.element.style.left = `${runner.position}px`;

            // Check if any runner has reached the finish line
            if (runner.position >= raceTrack.clientWidth - 80) {
                clearInterval(raceInterval);
                resultDiv.innerHTML = `<h2>🎉 Winner: ${runner.name} 🎉</h2>`;
            }
        });
    }, intervalTime);
}
