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

    // Dynamically adjust race track height based on number of items
    const trackHeight = Math.max(200, items.length * 50);
    raceTrack.style.height = `${trackHeight}px`;

    // Dynamically calculate runner size
    const runnerSize = Math.min(50, trackHeight / items.length); // Limit minimum size to 50px

    // Create runners
    const runners = items.map((item, index) => {
        const runner = document.createElement('div');
        runner.className = 'runner';
        runner.textContent = item;

        // Adjust runner size dynamically
        runner.style.width = `${runnerSize}px`;
        runner.style.height = `${runnerSize}px`;
        runner.style.lineHeight = `${runnerSize}px`;
        runner.style.left = `${index * (runnerSize + 10)}px`; // 간격 추가
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

            if (runner.position >= raceTrack.clientHeight - runnerSize) {
                clearInterval(raceInterval);
                resultDiv.innerHTML = `<h2>🎉 Winner: ${runner.name} 🎉</h2>`;
            }
        });
    }, intervalTime);
}
