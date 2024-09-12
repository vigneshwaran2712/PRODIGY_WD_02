document.addEventListener('DOMContentLoaded', () => {
    let startTime, updatedTime, difference, tInterval;
    let running = false;
    let elapsedTime = 0; // Track the elapsed time between starts and stops
    let lapCount = 1; // Track lap count
    const timeDisplay = document.getElementById('time');
    const lapList = document.getElementById('lap-list');

    document.getElementById('start').addEventListener('click', startTimer);
    document.getElementById('stop').addEventListener('click', stopTimer);
    document.getElementById('reset').addEventListener('click', resetTimer);
    document.getElementById('lap').addEventListener('click', recordLap);

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime() - elapsedTime; // Adjust startTime to account for elapsed time
            tInterval = setInterval(updateTime, 1);
            running = true;
            toggleButtons();
        }
    }

    function stopTimer() {
        if (running) {
            clearInterval(tInterval);
            updatedTime = new Date().getTime();
            elapsedTime = updatedTime - startTime; // Update elapsed time
            running = false;
            toggleButtons();
        }
    }

    function resetTimer() {
        clearInterval(tInterval);
        running = false;
        elapsedTime = 0; // Reset elapsed time
        timeDisplay.textContent = '00:00:00';
        lapList.innerHTML = '';
        lapCount = 1;
        toggleButtons();
    }

    function recordLap() {
        const lapTime = timeDisplay.textContent;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCount++}: ${lapTime}`;
        lapList.appendChild(li);
    }

    function updateTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
        
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        const formattedTime = [hours, minutes, seconds]
            .map(unit => unit < 10 ? `0${unit}` : unit)
            .join(':');

        timeDisplay.textContent = formattedTime;
    }

    function toggleButtons() {
        document.getElementById('start').disabled = running;
        document.getElementById('stop').disabled = !running;
    }
});
