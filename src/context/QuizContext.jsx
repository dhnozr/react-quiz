import { createContext } from 'react';

// First create a context
const QuizContext = createContext();

// Initial state for reducer function
const initialState = {
  questions: [],
  // loading, ready,finished,error for handling state
  status: 'loading',
  // index for tracking which question !start with the first question
  index: 0,
  // user answer
  answer: null,
  // user points
  points: 0,
  // keep max score of user
  maxPoint: 0,
  // keep track of time
  secondsRemaining: null,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
      break;
    case 'dataFailed':
      return { ...state, status: 'error' };
      break;
    case 'start':
      return { ...state, status: 'active', secondsRemaining: state.questions.length * 15 };
      break;
    case 'answer':
      const correctAnswer = state.questions[state.index].correctOption;
      return {
        ...state,
        answer: action.payload,
        points: action.payload === correctAnswer ? state.points + state.questions[state.index].points : state.points,
      };
      break;
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
      break;
    case 'finish':
      return {
        ...state,
        status: 'finished',
        maxPoint: state.points > state.maxPoint ? state.points : state.maxPoint,
      };
      break;
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
        maxPoint: state.secondsRemaining === 0 ? Math.max(state.points, state.maxPoint) : state.maxPoint,
      };
      break;
    case 'restart':
      return { ...initialState, questions: state.questions, status: 'ready', maxPoint: state.maxPoint };
    default:
      break;
  }
};

function QuizContextProvider({ children }) {
  const [{ questions, status, index, answer, points, maxPoint, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Take how many questions in the array
  const numOfQuestions = questions.length;
  // Calc maxPoints in the game
  const maxPossiblePoint = questions.reduce((acc, curr) => acc + curr.points, 0);

  // fetch questions
  useEffect(() => {
    const getData = async () => {
      await new Promise(resolve => setTimeout(resolve, 4000));
      try {
        const data = await fetch('/data.json');
        const res = await data.json();
        dispatch({ type: 'dataReceived', payload: res.questions });
      } catch (error) {
        dispatch({ type: 'dataFailed' });
      }
    };

    getData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        maxPoint,
        secondsRemaining,
        numOfQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
