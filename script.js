// script.js
const barsContainer = document.getElementById('bars');
const initButton = document.getElementById('init');
const playButton = document.getElementById('play');

let bars = [];
let heights = [];
let sorting = false;

// Initialize the bars
function initBars() {
    barsContainer.innerHTML = '';
    heights = Array.from({ length: 15 }, () => Math.floor(Math.random() * 200) + 50);
    bars = heights.map(height => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${height}px`;
        barsContainer.appendChild(bar);
        return bar;
    });
}

// Swap two bars
function swapBars(index1, index2) {
    [heights[index1], heights[index2]] = [heights[index2], heights[index1]];
    [bars[index1].style.height, bars[index2].style.height] = [bars[index2].style.height, bars[index1].style.height];
}

// Play sound for each comparison
function playSound() {
    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
    audio.play();
}

// Bubble Sort visualization
async function bubbleSort() {
    sorting = true;
    for (let i = 0; i < heights.length - 1; i++) {
        for (let j = 0; j < heights.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
            playSound();

            await new Promise(resolve => setTimeout(resolve, 300));

            if (heights[j] > heights[j + 1]) {
                swapBars(j, j + 1);
            }

            bars[j].style.backgroundColor = 'black';
            bars[j + 1].style.backgroundColor = 'black';
        }
    }
    sorting = false;
}

// Event listeners
initButton.addEventListener('click', initBars);
playButton.addEventListener('click', () => {
    if (!sorting) bubbleSort();
});

// Initialize on load
initBars();

