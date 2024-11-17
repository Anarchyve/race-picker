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
    const runnerHeight = Math.max(40, Math.min(80, raceTrack.clientHeight / items.length)); // Dynamic height

    // Create runners
    const runners = items.map((item, index) => {
        const runner = document.createElement('div');
        runner.className = 'runner';
        runner.textContent = item;

        // Dynamically adjust runner size and position
        runner.style.width = `${runnerHeight}px`;
        runner.style.height = `${runnerHeight}px`;
        runner.style.lineHeight = `${runnerHeight}px`;
        runner.style.left = `${index * runnerHeight * 1.5}px`; // 간격 유지
        runner.style.bottom = '0px'; // 시작 위치

        raceTrack.appendChild(runner);
        return { element: runner, position: 0, name: item };
    });

    // Adjust speed and interval
    const speedFactor = 5; // 속도
    const intervalTime = 50; // 애니메이션 주기

    // Start the race
    let raceInterval = setInterval(() => {
        runners.forEach(runner => {
            runner.position += Math.random() * speedFactor; // 무작위로 이동
            runner.element.style.bottom = `${runner.position}px`; // 위로 이동

            if (runner.position >= raceTrack.clientHeight - runnerHeight) {
                clearInterval(raceInterval);
                resultDiv.innerHTML = `<h2>🎉 Winner: ${runner.name} 🎉</h2>`;
            }
        });
    }, intervalTime);
}
