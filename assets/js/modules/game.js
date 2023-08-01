import { keyboard } from './keyboard.js';

class Game {

    constructor(level, pageManager) {
        this.level = level;
        this.pageManager = pageManager;
        this.questions = this.getQuestions();
        this.shuffleQuestions();
        this.currentQuestionIndex = 0;
        this.setQuestion();
        this.startTime = Date.now();
        this.endTime = null;
    }

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    getQuestions() {
        if (this.level == 1) {
            return ['a', 'b', 'c', 'e'];
        } else if(this.level == 2) {
            return ['aa', 'bb', 'cc', 'ee'];
        } else {
            return ['aaa', 'bbb', 'ccc', 'eee'];
        }
    }

    checkAnswer(answer) {
        if (answer === this.currentQuestion) {
            if (this.setQuestion()) {
                return true;
            }
        } else {
            alert("Wrong answer!");
            return false;
        }
    }

    setQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endGame();
            return false;
        }

        this.currentQuestion = this.questions[this.currentQuestionIndex++];
        document.getElementById('question').textContent = this.currentQuestion;
        return true;
    }

    endGame() {
        this.__setEndTime();
        const elapsedTime = this.getElapsedTime();
        this.pageManager.showPage('resultPage');

        const result = document.getElementById('result');
        result.textContent = `${elapsedTime}s.`;
        keyboard.close();
    }

    getElapsedTime() {
        if (this.endTime === null) {
            this.__setEndTime();
        }
        return Math.floor((this.endTime - this.startTime) / 1000);
    }

    __setEndTime() {
        this.endTime = Date.now();
    }
}

export { Game };
