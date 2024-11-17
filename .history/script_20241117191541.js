function generateRandomNumber() {
    const clickSound = document.getElementById('click-sound');
    const successSound = document.getElementById('success-sound');
    const minValue = parseInt(document.getElementById('min-value').value, 10);
    const maxValue = parseInt(document.getElementById('max-value').value, 10);
    const resultElement = document.getElementById('result');

    if (isNaN(minValue) || isNaN(maxValue) || minValue > maxValue) {
        resultElement.textContent = 'Please enter valid numbers and ensure Min is less than Max.';
        return;
    }

    let counter = 0;
    const interval = setInterval(() => {
        counter++;
        clickSound.play();
        resultElement.textContent = `Randomizing... ${Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue}`;
        if (counter > 20) {
            clearInterval(interval);
            const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
            resultElement.textContent = `🎉 Random Number: ${randomNumber} 🎉`;
            resultElement.classList.add('animate');
            successSound.play();
            setTimeout(() => resultElement.classList.remove('animate'), 300); // Reset animation
        }
    }, 100);
}
