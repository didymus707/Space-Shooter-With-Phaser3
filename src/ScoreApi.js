import 'regenerator-runtime';

const gameSetup = async () => {
  try {
    const request = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Earth Defenders' }),
    });
    const response = await request.json();
    return response;
  } catch (err) {
    throw new Error('Sorry! Game cannot be set up at the moment. Please, try again later');
  }
};

const postScores = async (playerName, score) => {
  try {
    const request = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/PHT4iu2zlyjMYtNNWZS7/scores/', {
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
  try {
    const request = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/PHT4iu2zlyjMYtNNWZS7/scores/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await request.json();
    const { result } = response;
    return result;
  } catch (error) {
    throw new Error('Sorry! Scores are not available at the moment. Please try again later!');
  }
};

export { gameSetup, postScores, getScores };