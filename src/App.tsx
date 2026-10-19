
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTyping from "./components/UserTyping";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helper";

const TEST_DURATION = 30;

const App = () => {
  const {
    state,
    words,
    timeLeft,
    typed,
    errors,
    totalTyped,
    restart,
    wpm,
  } = useEngine();

  const progress = Math.max(
    0,
    Math.min(100, (timeLeft / TEST_DURATION) * 100)
  );

  const isWarning = timeLeft <= 10 && timeLeft > 0;

  return (
    <main className="min-h-screen bg-[#090b10] px-4 py-10 text-slate-200 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-10 text-center sm:mb-14">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/[0.07] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-yellow-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
            Typing practice
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Type<span className="text-yellow-400">Flow</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
            Find your rhythm. Stay accurate. Let your speed follow.
          </p>
        </header>

        {/* Timer */}
        <section
          aria-label="Typing test timer"
          className="mx-auto mb-8 max-w-3xl rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                Time remaining
              </p>

              <p
                className={`mt-2 font-mono text-4xl font-semibold tabular-nums sm:text-5xl ${
                  isWarning ? "text-red-400" : "text-yellow-400"
                }`}
              >
                00:{String(timeLeft).padStart(2, "0")}
              </p>
            </div>

            <span className="pb-1 text-sm text-slate-500">
              {timeLeft === 0
                ? "Test complete"
                : `${TEST_DURATION} second test`}
            </span>
          </div>

          <div
            className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]"
            role="progressbar"
            aria-label="Time remaining"
            aria-valuemin={0}
            aria-valuemax={TEST_DURATION}
            aria-valuenow={Math.max(
              0,
              Math.min(TEST_DURATION, timeLeft)
            )}
          >
            <div
              className={`h-full rounded-full transition-[width] duration-500 ${
                isWarning ? "bg-red-400" : "bg-yellow-400"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Typing area */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#10131b] shadow-2xl shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-7">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />

              <span className="ml-2 text-xs font-medium tracking-wide text-slate-500">
                TYPING TERMINAL
              </span>
            </div>

            <span className="text-xs text-slate-500">
              {state === "finish" ? "Session ended" : "Focus mode"}
            </span>
          </div>

          <div className="p-5 sm:p-9">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Type the text below
              </p>

              <span className="rounded-md bg-white/[0.05] px-2.5 py-1 text-xs text-slate-500">
                English
              </span>
            </div>

            <div
              className={`min-h-44 text-left text-xl leading-[2.15] tracking-wide sm:min-h-48 sm:text-2xl ${
                timeLeft === 0 ? "opacity-60" : ""
              }`}
            >
              <UserTyping words={words} userInput={typed} />
            </div>

            <div className="mt-7 flex items-center gap-2 border-t border-white/[0.07] pt-5 text-xs leading-5 text-slate-500">
              <span className="text-yellow-400">↵</span>
              Focus on accuracy first. Speed comes naturally.
            </div>
          </div>
        </section>

        {/* Restart button */}
        <div className="mt-6 flex justify-center">
          <RestartButton
            timeLeft={timeLeft}
            onRestart={restart}
          />
        </div>

        {/* Results dashboard */}
        <Results
          state={state}
          errors={errors}
          accuracyPercentage={calculateAccuracyPercentage(
            errors,
            totalTyped
          )}
          total={totalTyped}
          speed={wpm}
        />

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-slate-600">
          Built for better focus, one keystroke at a time.
        </footer>
      </div>
    </main>
  );
};

export default App;
