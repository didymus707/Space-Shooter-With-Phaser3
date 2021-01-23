import 'regenerator-runtime';

const gameSetup = async () => {
  try {
    const request = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Earth Defenders' }),
    });
    const response = await request.json();
    return response;
  } catch (err) {
    throw new Error('sorr! Game cannot be set up at the moment. Please, try again later');
  }
};

const postScores = async (playerName, score) => {
  try {
    const request = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: playerName, score }),
    });
    const response = await request.json();
    return response;
  } catch (err) {
    throw new Error('Sorry! Unable to post scores at the moment. Please, try again later');
  }
};

const getScores = async () => {
  const leaderBoard = [];
  try {
    const request = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/QNx4z7IBfVVINUGksTiq/scores/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await request.json();
    const { result } = response;
    result.forEach(data => {
      leaderBoard.push([data.user, data.score]);
    });
    return leaderBoard;
  } catch (error) {
    throw new Error('Sorry! Scores are not available at the moment. Please try again later!');
  }

};

export { gameSetup, postScores, getScores };