export function lyricsGameReducer(state, action) {
    switch (action.type) {
        case 'disableForm': {
            return {
                ...state,
                formDisabled: true,
            }
        }
        case 'loadRestart': {
            return {
                ...state,
                buttonDisabled: true,
                restartTime: action.payload.restartTime,
            };
        }
        case 'loadStart': {
            let color = "";
            switch (action.payload.startTime) {
                case 3:
                    color ="bg-red-500"
                    break;
                case 2:
                    color="bg-yellow-500"
                    break;
                case 1:
                    color="bg-green-500"
                    break;
                default:
                    break;
            }
            return {
                ...state,
                buttonDisabled: true,
                startTime: action.payload.startTime,
                startColor: color,
            }
        }
        case 'startGame': {
            return {
                ...state,
                started: true,
                loading: false,
                buttonDisabled: false,
                formDisabled: false,
                sentence: action.payload.sentence,
                word: action.payload.word,
                gameTime: action.payload.gameTime,
                artist: action.payload.artist,
                track: action.payload.track,
                album: action.payload.album,
                scoreTimer: action.payload.scoreTimer,
            };
        }
        case 'gameTick': {
            return {
                ...state,
                gameTime: action.payload.gameTime,
                deduction: 0,
                scoreTimer: action.payload.scoreTimer,
            }
        }
        case 'setGuessedWord': {
            return {
                ...state,
                guessedWord: action.payload.guessedWord
            }
        }
        case 'correctAnswer': {
            return {
                ...state, 
                sentence: action.payload.sentence,
                word: action.payload.word,
                currentScore: action.payload.currentScore,
                guessedWord: '',
                buttonDisabled: false,
                formDisabled: false,
                gameTime: action.payload.gameTime,
                artist: action.payload.artist,
                track: action.payload.track,
                album: action.payload.album,
                scoreTimer: action.payload.scoreTimer,
                newPoints: action.payload.newPoints,
            }
        }
        case 'wrongAnswer': {
            return {
                ...state,
                deduction: action.payload.deduction,
                guessedWord: '',
                buttonDisabled: false,
                formDisabled: false,
                gameTime: action.payload.gameTime,
            }
        }
        case 'lostGame': {
            return {
                ...state,
                lost: true,
                formDisabled: false,
                buttonDisabled: false,
                beatHighscore: action.payload.beatHighscore,
            }
        }
        case 'restartGame': {
            return {
                ...state,
                sentence: action.payload.sentence,
                word: action.payload.word,
                guessedWord: '',
                currentScore: 0,
                buttonDisabled: false,
                formDisabled: false,
                lost: false,
                gameTime: action.payload.gameTime,
                scoreTimer: action.payload.scoreTimer,
                beatHighscore: false,
            }

        }
        default:
            break;
    }
    return state;
}

export const initialState = {
    loading: true,
    sentence: '',
    word: {},
    guessedWord: '',
    started: false,
    buttonDisabled: false,
    currentScore: 0,
    lost: false,
    fetching: false,
    formDisabled: false,
    restartTime: -1,
    startTime: 0,
    gameTime: -10000,
    startColor: "bg-green-800",
    newPoints: null,
    beatHighscore: false,
}
