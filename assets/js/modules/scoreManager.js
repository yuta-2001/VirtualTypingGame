export const ScoreManager = {
    setScores: function(newScore) {
        let scores = this.getScores();
  
        // insert new score to the right position
        for (let i = 0; i < 3; i++) {
            if (!scores[i] || newScore < scores[i]) {
                scores.splice(i, 0, newScore);
                break;
            }
        }

        // store only top 3 scores
        scores = scores.slice(0, 3);
  
        let d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days
        let expires = "expires=" + d.toUTCString();
        document.cookie = "scores=" + JSON.stringify(scores) + ";" + expires + ";path=/";
    },
  
    getScores: function() {
        const name = "scores=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return JSON.parse(c.substring(name.length, c.length));
            }
        }
        return [];
    }
};