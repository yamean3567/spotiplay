export function lyricsGameReducer(state, action) {
    switch (action.type) {
        case 'disableForm': {
            return {
                ...state,
                formDisabled: true,
                loadingMsg: action.payload.loadingMsg,
            }
        }
        case 'loadRestart': {
            return {
                ...state,
                buttonDisabled: true,
                restartTime: action.payload.restartTime,
                newPoints: action.payload.newPoints,
            };
        }
        case 'skipTrack' : {
            return {
                ...state,
                formDisabled: false,
                scoreTimer: action.payload.scoreTimer,
                currentScore: action.payload.currentScore,
                loadingMsg: action.payload.loadingMsg,
                newPoints: action.payload.newPoints,
                scoreColor: "mb-4 decoration-clone mx-auto bg-gradient-to-b from-red-900 via-red-600 to-red-300 animate-pulse text-center border-2 rounded-lg border-black text-sm w-24 h-16 md:h-24 md:text-2xl py-2 md:w-36", 
            }
        }
        case 'setTrack': {
            return {
                ...state,
                track: action.payload.track,
                artist: action.payload.artist,
                album: action.payload.album,
                word: action.payload.word,
                sentence: action.payload.sentence,
            }
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
                gameTime: action.payload.gameTime,
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
                buttonDisabled: false,
                formDisabled: false,
                guessedWord: '',
                currentScore: action.payload.currentScore,
                gameTime: action.payload.gameTime,
                scoreTimer: action.payload.scoreTimer,
                newPoints: action.payload.newPoints,
                scoreColor: "mb-4 decoration-clone mx-auto bg-gradient-to-b from-green-900 via-green-800 to-green-400 animate-pulse text-center border-2 rounded-lg border-black text-sm w-24 h-16 md:h-24 md:text-2xl py-2 md:w-36"
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
                beatHighscore: false,
                buttonDisabled: false,
                formDisabled: false,
                lost: false,
                guessedWord: '',
                currentScore: 0,
                gameTime: action.payload.gameTime,
                scoreTimer: action.payload.scoreTimer,
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
    loadingMsg: '',
}
