import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTyping from "./components/UserTyping";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helper";

const App = () => {
  const { state, words, timeLeft, typed, errors, totalTyped, restart, wpm } =
    useEngine();

  return (
    <div>
       <h1 className="text-4xl -mt-16 font-bold mb-6 text-center text-yellow-400">
        Typing Speed Test
      </h1>
      
      <Timer timeLeft={timeLeft} />
      <div className="relative max-w-2xl mt-3 text-3xl leading-relaxed break-all">
        <UserTyping words={words} userInput={typed} />
        <GenerateWords words={words} />
      </div>

      <RestartButton timeLeft={timeLeft} onRestart={() => restart()} />
      <Results
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
        speed={wpm}
      />
       <div className="mt-10 text-center text-gray-400 max-w-2xl">
        <p>💡 Tip: Focus on accuracy first, speed comes naturally.</p>
        <p>⏱ The timer will count down from 30 seconds.</p>
        <p>✅ Your WPM, total typed characters, errors, and accuracy will be displayed above.</p>
      </div>
    </div>
  );
};

const GenerateWords = ({ words }: { words: string }) => {
  return <div className="text-3xl">{words}</div>;
};

const Timer = ({ timeLeft }: { timeLeft: number }) => {
  return (
    <div>
      <h1
        className={`text-2xl mb-10  flex items-center justify-center font-semibold text-yellow-400 ${
          timeLeft <= 10 ? "animate-ping font-semibold" : ""
        }`}
      >
        Time : {timeLeft}
      </h1>
    </div>
  );
};

export default App;

