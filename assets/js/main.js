import { keyboard } from './modules/keyboard.js';
import { Game } from './modules/game.js';
import { PageManager } from './modules/pageManager.js';
import { Counter } from './modules/counter.js';

window.addEventListener("DOMContentLoaded", function () {
    const pages = {
        welcomePage: document.getElementById('welcome-page'),
        counterPage: document.getElementById('counter-page'),
        gamePage: document.getElementById('game-page'),
        resultPage: document.getElementById('result-page'),
    };
    const pageManager = new PageManager(pages);

    pageManager.showPage('welcomePage');

    document.getElementById('start-button').addEventListener('click', () => {
        const level = document.querySelector('input[name="level"]:checked').value;
        pageManager.showPage('counterPage');
        const counter = new Counter(document.getElementById('count'), 3, () => {
            pageManager.showPage('gamePage');
            const game = new Game(level, pageManager);
            keyboard.init(game);
        });

        counter.start();
    });

    document.addEventListener('keydown', function(event) {
        event.preventDefault();
    });
});






