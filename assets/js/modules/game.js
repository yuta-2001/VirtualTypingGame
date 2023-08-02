import { keyboard } from './keyboard.js';

class Game {

    constructor(level, pageManager) {
        this.level = level;
        this.pageManager = pageManager;
        this.questions = this._getQuestions();
        this._shuffleQuestions();
        this.currentQuestionIndex = 0;
        this._setQuestion();
        this.startTime = Date.now();
        this.endTime = null;
        this.misstypeQuestions = [];
    }

    checkAnswer(answer) {
        if (answer === this.questions[this.currentQuestionIndex]) {
            this.currentQuestionIndex++;
            if (this._setQuestion()) {
                return true;
            }
        } else {
            alert("Wrong answer!");
            this._recordMisstypeQuestion();
            return false;
        }
    }

    _getQuestions() {
        if (this.level == 1) {
            return ['a', 'b', 'c', 'e'];
        } else if(this.level == 2) {
            return ['aa', 'bb', 'cc', 'ee'];
        } else {
            return ['aaa', 'bbb', 'ccc', 'eee'];
        }
    }

    _shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    _setQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this._endGame();
            return false;
        }
        document.getElementById('question').textContent = this.questions[this.currentQuestionIndex];
        console.log(this.questions[this.currentQuestionIndex]);
        return true;
    }

    _endGame() {
        this._setEndTime();
        const elapsedTime = this._getElapsedTime();
        this.pageManager.showPage('resultPage');

        const result = document.getElementById('result');
        result.textContent = `${elapsedTime}s.`;

        const mistakes = document.getElementById('mistakes');

        if (this.misstypeQuestions.length > 0) {
            this.misstypeQuestions.forEach((questionIndex) => {
                const question = document.createElement('li');
                question.textContent = this.questions[questionIndex];
                mistakes.appendChild(question);
            });
        } else {
            const mistakeTitle = document.getElementById('mistake-title');
            mistakeTitle.style.display = 'none';
            mistakes.style.display = 'none';
        }

        keyboard.close();
    }

    _getElapsedTime() {
        if (this.endTime === null) {
            this._setEndTime();
        }
        return Math.floor((this.endTime - this.startTime) / 1000);
    }

    _setEndTime() {
        this.endTime = Date.now();
    }

    _recordMisstypeQuestion() {
        if (this.misstypeQuestions.includes(this.currentQuestionIndex) === false) {
            this.misstypeQuestions.push(this.currentQuestionIndex);
        }
    }

    _getMisstypeQuestions() {
        return this.misstypeQuestions;
    }
}

export { Game };
