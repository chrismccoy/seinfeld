// play seinfeld base line here.

const fs = require('fs').promises;

async function fetchTrivia() {
    try {
        const data = await fs.readFile('seinfeld.json', 'utf-8');
        const episodes = JSON.parse(data);

        const questions = episodes.questions.map(q => {
            const episodeData = episodes.episodes.find(ep => ep.episode === q.e && ep.season === q.s);
            return { ...q, title: episodeData ? episodeData.title : 'Unknown Episode' };
        });

        return questions.map(q => ({
            season: q.s,
            episode: q.e,
            episode_title: q.title,
            question: q.text,
            answer: q.answer
        })).sort((a, b) => a.season - b.season);
    } catch (error) {
        console.error('Error fetching trivia:', error);
        throw error;
    }
}

fetchTrivia()
    .then(data => console.dir(data, { 'maxArrayLength': null }))
    .catch(err => console.error('Error in fetchTrivia:', err));
