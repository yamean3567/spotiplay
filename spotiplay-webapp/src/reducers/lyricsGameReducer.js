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
            return {
                ...state,
                buttonDisabled: true,
                startTime: action.payload.startTime,
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
            };
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
            }
        }
        case 'lostGame': {
            return {
                ...state,
                lost: true,
                formDisabled: false,
                buttonDisabled: false,
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
    word: '',
    guessedWord: '',
    started: false,
    buttonDisabled: false,
    currentScore: 0,
    lost: false,
    fetching: false,
    formDisabled: false,
    restartTime: -1,
    startTime: -1,
}
