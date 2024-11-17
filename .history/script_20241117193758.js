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

    // Adjust race track height dynamically
    const runnerHeight = Math.max(40, Math.min(100, raceTrack.clientWidth / items.length)); // Dynamic height
    raceTrack.style.height = `${runnerHeight * items.length}px`;

    // Create runners
    const runners = items.map((item, index) => {
        const runner = document.createElement('div');
        runner.className = 'runner';
        runner.textContent = item;

        // Dynamically adjust runner size and position
        runner.style.width = `${runnerHeight}px`;
        runner.style.height = `${runnerHeight}px`;
        runner.style.lineHeight = `${runnerHeight}px`;
        runner.style.left = '0px';
        runner.style.bottom = `${index * runnerHeight}px`;

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
            runner.element.style.left = `${runner.position}px`;

            if (runner.position >= raceTrack.clientWidth - runnerHeight) {
                clearInterval(raceInterval);
                resultDiv.innerHTML = `<h2>🎉 Winner: ${runner.name} 🎉</h2>`;
            }
        });
    }, intervalTime);
}
