import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import DateTimeDisplay from './components/DateTimeDisplay';
import { useCountdown } from './components/useCountdown';


function App() {
  const questions = [
    {
      questionText: 'Gdy widzisz pół szklanki wody, myślisz: "Ta szklanka jest prawie pełna"',
      answerOptions: [
        { answerText: 'Tak', answer: 'TAK' },
        { answerText: 'Nie', answer: 'NIE' },
      ]
    },
    {
      questionText: 'Jesteś niecierpliwy i irytuje cię bezczynne wyczekiwanie.',
      answerOptions: [
        { answerText: 'Tak', answer: 'TAK' },
        { answerText: 'Nie', answer: 'NIE' },
      ]
    },
    {
      questionText: 'Podczas pracy uwielbiasz mieć porządek.',
      answerOptions: [
        { answerText: 'Tak', answer: 'TAK' },
        { answerText: 'Nie', answer: 'NIE' },
      ]
    },
    {
      questionText: 'Często zastanawiasz się nad sensem życia.',
      answerOptions: [
        { answerText: 'Tak', answer: 'TAK' },
        { answerText: 'Nie', answer: 'NIE' },
      ]
    },
    {
      questionText: 'Często reagujesz na daną sytuacje zbyt wolno niż powinieneś.',
      answerOptions: [
        { answerText: 'Tak', answer: 'TAK' },
        { answerText: 'Nie', answer: 'NIE' },
      ]
    },
  ];

  const questions_main = [
    {
      questionText: '2 + 2 = ?',
      answerOptions: [
        { answerText: 'A: 5', isCorrect: false },
        { answerText: 'B: 4', isCorrect: true },
        { answerText: 'C: 6', isCorrect: false },
        { answerText: 'D: 0', isCorrect: false },
      ]
    },
    {
      questionText: '1 - 1 + 2 = ?',
      answerOptions: [
        { answerText: 'A: 3', isCorrect: false },
        { answerText: 'B: -1', isCorrect: false },
        { answerText: 'C: 2', isCorrect: true },
        { answerText: 'D: 1', isCorrect: false },
      ]
    },
    {
      questionText: '5 - 8 = ?',
      answerOptions: [
        { answerText: 'A: 3', isCorrect: false },
        { answerText: 'B: 2', isCorrect: false },
        { answerText: 'C: -3', isCorrect: true },
        { answerText: 'D: -2', isCorrect: false },
      ]
    },
    {
      questionText: '11 + 88 = ?',
      answerOptions: [
        { answerText: 'A: 90', isCorrect: false },
        { answerText: 'B: 99', isCorrect: true },
        { answerText: 'C: 100', isCorrect: false },
        { answerText: 'D: 89', isCorrect: false },
      ]
    },
    {
      questionText: '7 * 8 = ?',
      answerOptions: [
        { answerText: 'A: 42', isCorrect: false },
        { answerText: 'B: 56', isCorrect: true },
        { answerText: 'C: 48', isCorrect: false },
        { answerText: 'D: 46', isCorrect: false },
      ]
    },
    {
      questionText: '5 * 6 = ?',
      answerOptions: [
        { answerText: 'A: 35', isCorrect: false },
        { answerText: 'B: 42', isCorrect: false },
        { answerText: 'C: 48', isCorrect: false },
        { answerText: 'D: 30', isCorrect: true },
      ]
    },
    {
      questionText: '5 + 5 - 2 = ?',
      answerOptions: [
        { answerText: 'A: 12', isCorrect: false },
        { answerText: 'B: 8', isCorrect: true },
        { answerText: 'C: 6', isCorrect: false },
        { answerText: 'D: 7', isCorrect: false },
      ]
    },
    {
      questionText: '5 - 8 + 3 = ?',
      answerOptions: [
        { answerText: 'A: 3', isCorrect: false },
        { answerText: 'B: -3', isCorrect: false },
        { answerText: 'C: 0', isCorrect: true },
        { answerText: 'D: -5', isCorrect: false },
      ]
    },
    {
      questionText: '6 / 3 = ?',
      answerOptions: [
        { answerText: 'A: 2', isCorrect: true },
        { answerText: 'B: 3', isCorrect: false },
        { answerText: 'C: 6', isCorrect: false },
        { answerText: 'D: 18', isCorrect: false },
      ]
    },
    {
      questionText: '12 / -3 = ?',
      answerOptions: [
        { answerText: 'A: -4', isCorrect: true },
        { answerText: 'B: 4', isCorrect: false },
        { answerText: 'C: 3', isCorrect: false },
        { answerText: 'D: -3', isCorrect: false },
      ]
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuestion2, setCurrentQuestion2] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showScore2, setShowScore2] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [answers2, setAnswers2] = useState(0);
  const [personality, setPersonality] = useState('');
  const [username, setName] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);

  const FIVE_SECONDS = 7 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfter = NOW_IN_MS + FIVE_SECONDS;

  const handleAnswerOptionClick = (answer) => {
    setAnswers([...answers, answer])
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      getPersonality(answers);
      setShowScore(true);
    }
  };

  const handleAnswerOptionClick2 = (answer) => {
    setAnswers2(answers2 + answer)
    const nextQuestion = currentQuestion2 + 1;
    if (nextQuestion < questions_main.length) {
      setCurrentQuestion2(nextQuestion);
    } else {
      setShowScore2(true);
    }
  };

  const handleGoOptionClick = () => {
    setShowTest(true);
  }

  const getPersonality = ans => {
    if (ans[0] === 'TAK' && ans[1] === 'NIE' && ans[2] === 'TAK' && ans[3] === 'TAK' && ans[4] === "TAK")
      setPersonality("Powolny");
    else if (ans[0] === 'NIE' && ans[1] === 'TAK' && ans[2] === 'NIE' && ans[3] === 'NIE' && ans[4] === 'NIE')
      setPersonality("Impulsywny");
    else if (ans[0] === 'NIE' && ans[1] === 'NIE' && ans[2] === 'TAK' && ans[3] === 'TAK' && ans[4] === 'NIE')
      setPersonality("Myśliciel");
    else if (ans[0] === 'TAK' && ans[1] === 'NIE' && ans[2] === 'TAK' && ans[3] === 'TAK' && ans[4] === 'NIE')
      setPersonality("Optymista");
    else
      setPersonality("Nie określona");
  }

  const ExpiredNotice = () => {
    setAnswers2(answers2 - 1);
    const nextQuestion = currentQuestion2 + 1;
    if (nextQuestion < questions_main.length) {
      setCurrentQuestion2(nextQuestion);
    } else {
      setShowScore2(true);
    }
    return (
      <div className="expired-notice">
        <span>Czas minął</span>
      </div>
    );
  };

  const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="show-counter">
        <a
          href="https://tapasadhikary.com"
          target="_blank"
          rel="noopener noreferrer"
          className="countdown-link"
        >
          {/* <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
          <p>:</p>
          <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
          <p>:</p> */}
          <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </a>
      </div>
    );
  };

  const CountdownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
      return <ExpiredNotice />;
    } else {
      return (
        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      );
    }
  };

  const sendName = () => {
    setShowQuiz(true);
  }

  const csvData = [
    ["Nazwa", "Osobowość", "Punkty"],
    [username, personality, answers2]
  ];

  return (
    <div className="App">
      {showQuiz ? (<>
        {showTest ? (
          <>
            {showScore2 ? (
              (answers2 === 0 & answers2 >= 5) ? (<div className="points">{username} <br />jesteś {personality} <br />Otrzymałeś: {answers2} punktów
                <br />
                <CSVLink
                  data={csvData}
                  filename={"results.csv"}
                  className="btn btn-danger"
                  target="_blank"
                >Pobierz
                </CSVLink></div>
              ) : (
                (answers2 === 1) ? (<div className="points">{username} <br />jesteś {personality} <br />Otrzymałeś: {answers2} punkt <br />
                  <CSVLink
                    data={csvData}
                    filename={"results.csv"}
                    className="btn btn-danger"
                    target="_blank"
                  >Pobierz
                  </CSVLink>
                </div>) : (<div className="points">{username} <br />jesteś {personality} <br />Otrzymałeś: {answers2} punkty
                  <br />
                  <CSVLink
                    data={csvData}
                    filename={"results.csv"}
                    className="btn btn-danger"
                    target="_blank"
                  >Pobierz
                  </CSVLink>
                </div>))
            ) : (
              <>
                <div className="question-section">
                  <div className='question-count'>
                    <CountdownTimer targetDate={dateTimeAfter} />
                    <span>Pytanie nr {currentQuestion2 + 1}</span>/{questions_main.length}
                  </div>
                  <div className='question-text'>{questions_main[currentQuestion2].questionText}</div>
                </div>
                <div className="answer-section">
                  {questions_main[currentQuestion2].answerOptions.map((answerOption, i) => (
                    <button key={i} onClick={() => handleAnswerOptionClick2(answerOption.isCorrect)}>{answerOption.answerText}</button>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {showScore ? (
              <div className='score-section'>
                To jest koniec testu, {username} Twoja osobowość to:
                <div className='row personality'>
                  {personality}
                </div>
                <div className='row'>
                  <Button variant="success" onClick={() => handleGoOptionClick()}> Przejdź do testu </Button>
                </div>
              </div >
            ) : (
              <>
                <div className="question-section">
                  <div className='question-count'>
                    <span>Pytanie nr {currentQuestion + 1}</span>/{questions.length}
                  </div>
                  <div className='question-text'>{questions[currentQuestion].questionText}</div>
                </div>
                <div className="answer-section">
                  {questions[currentQuestion].answerOptions.map((answerOption, i) => (
                    <button key={i} onClick={() => handleAnswerOptionClick(answerOption.answer)}>{answerOption.answerText}</button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </>
      ) : (
        <>
          <div>
            <form onSubmit={sendName}>
              <label>Imię
                <input className="form-control" type="text" name="username" value={username} onChange={(e) => setName(e.target.value)} />
              </label>
              <input className="btn btn-lg btn-primary" type="submit" value="Wyślij" />
            </form>
          </div>
        </>
      )}
    </div>
  )
};
export default App;
