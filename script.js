class SlotMachine {
    constructor() {
        this.reels = [
            ['Cherry', 'Lemon', 'Orange', 'Plum', 'Bell', 'Bar', 'Seven'],
            ['Cherry', 'Lemon', 'Orange', 'Plum', 'Bell', 'Bar', 'Seven'],
            ['Cherry', 'Lemon', 'Orange', 'Plum', 'Bell', 'Bar', 'Seven']
        ];
        this.payTable = {
            'Cherry,Cherry,Cherry': 10,
            'Lemon,Lemon,Lemon': 20,
            'Orange,Orange,Orange': 30,
            'Plum,Plum,Plum': 40,
            'Bell,Bell,Bell': 50,
            'Bar,Bar,Bar': 100,
            'Seven,Seven,Seven': 200
        };
    }

    spin(forcedOutcome = null) {
        if (forcedOutcome) {
            return forcedOutcome;
        }
        return this.reels.map(reel => reel[Math.floor(Math.random() * reel.length)]);
    }

    getPayout(result) {
        const key = result.join(',');
        return this.payTable[key] || 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slotMachine = new SlotMachine();
    const reelElements = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];
    const resultElement = document.getElementById('result');
    const spinButton = document.getElementById('spinButton');
    const outcomeInput = document.getElementById('outcomeInput');

    function displayResult(result) {
        for (let i = 0; i < result.length; i++) {
            reelElements[i].textContent = result[i];
        }
    }

    function playSlotMachine(forcedOutcome = null) {
        const result = slotMachine.spin(forcedOutcome);
        const payout = slotMachine.getPayout(result);

        reelElements.forEach(reel => {
            reel.classList.add('spinning');
        });

        setTimeout(() => {
            reelElements.forEach(reel => {
                reel.classList.remove('spinning');
            });
            displayResult(result);
            if (payout > 0) {
                resultElement.textContent = `Congratulations! You won ${payout} coins!`;
            } else {
                resultElement.textContent = "Sorry, you didn't win this time. Try again!";
            }
        }, 1000);
    }

    spinButton.addEventListener('click', () => {
        const outcomeValue = outcomeInput.value.split(',').map(item => item.trim());
        const validOutcome = outcomeValue.length === 3 && outcomeValue.every(item => slotMachine.reels[0].includes(item));
        playSlotMachine(validOutcome ? outcomeValue : null);
    });
});
