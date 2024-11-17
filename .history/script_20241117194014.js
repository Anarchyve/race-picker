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

    // Adjust race track width dynamically
    const runnerWidth = Math.max(40, Math.min(100, raceTrack.clientHeight / items.length)); // Dynamic width
    raceTrack.style.width = `${runnerWidth * items.length}px`;

    // Create runners
    const runners = items.map((item, index) => {
        const runner = document.createElement('div');
        runner.className = 'runner';
        runner.textContent = item;

        // Dynamically adjust runner size and position
        runner.style.width = `${runnerWidth}px`;
        runner.style.height = `${runnerWidth}px`;
        runner.style.lineHeight = `${runnerWidth}px`;
        runner.style.left = `${index * runnerWidth}px`; // Horizontal placement
        runner.style.bottom = '0px'; // Start from the bottom

        raceTrack.appendChild(runner);
        return { element: runner, position: 0, name: item };
    });

    // Adjust speed and interval
    const speedFactor = 5;
    const intervalTime = 50;

    // Start the race
    let raceInterval = setInterval(() => {
        runners.forEach(runner => {
            runner.position += Math.random() * speedFactor;
            runner.element.style.bottom = `${runner.position}px`;

            if (runner.position >= raceTrack.clientHeight - runnerWidth) {
                clearInterval(raceInterval);
                resultDiv.innerHTML = `<h2>🎉 Winner: ${runner.name} 🎉</h2>`;
            }
        });
    }, intervalTime);
}
