import { keyboard } from './keyboard.js';
import { ScoreManager } from './scoreManager.js';

class Game {

    constructor(type, pageManager) {
        this.type = type;
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
        if (this.type == 1) {
            return ['PHP', 'JavaScript', 'GO', 'Python', 'Java'];
        } else if(this.type == 2) {
            return ['Svelte', 'React', 'Vue', 'Next', 'Nuxt'];
        } else {
            return ['AWS', 'GCP', 'Azure', 'Heroku', 'Firebase'];
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

        ScoreManager.setScores(elapsedTime);
        const ranking = ScoreManager.getScores();

        const scoreList = document.getElementById('score-list');
        ranking.forEach((time, index) => {
            const scoreItem = document.createElement('li');
            scoreItem.textContent = `${index+1} place: ${time}s.`;
            scoreList.appendChild(scoreItem);
        });

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

}

export { Game };
