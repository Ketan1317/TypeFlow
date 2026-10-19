
import { motion } from "framer-motion";
import { formatPercentage } from "../utils/helper";
import type { State } from "../hooks/useEngine";

type ResultTypes = {
  errors: number;
  accuracyPercentage: number;
  total: number;
  speed: number;
  state: State;
};

type Metric = {
  label: string;
  value: string;
  description: string;
  color: string;
};

const Results = ({
  errors,
  accuracyPercentage,
  total,
  state,
  speed,
}: ResultTypes) => {
  if (state !== "finish") {
    return null;
  }

  const accuracyValue = Number(
    String(formatPercentage(accuracyPercentage)).replace("%", "")
  );

  const metrics: Metric[] = [
    {
      label: "Accuracy",
      value: formatPercentage(accuracyPercentage),
      description: "Correct characters",
      color: "text-emerald-400",
    },
    {
      label: "Characters",
      value: String(total),
      description: "Characters typed",
      color: "text-sky-400",
    },
    {
      label: "Errors",
      value: String(errors),
      description: "Incorrect attempts",
      color: "text-red-400",
    },
  ];

  return (
    <motion.section
      aria-labelledby="results-heading"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mt-10"
    >
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
          Session complete
        </p>

        <h2
          id="results-heading"
          className="mt-2 text-2xl font-bold text-white sm:text-3xl"
        >
          Your results
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Every session is a step toward better typing.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#10131b] p-5 sm:p-7">
        <div className="rounded-xl border border-yellow-400/15 bg-yellow-400/[0.045] px-5 py-7 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            Typing speed
          </p>

          <div className="mt-3 flex items-baseline justify-center gap-2">
            <span className="text-6xl font-bold tracking-tight text-yellow-400 tabular-nums sm:text-7xl">
              {speed}
            </span>
            <span className="text-sm font-medium text-slate-400">
              WPM
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-400">
            Words per minute
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5"
            >
              <p className="text-sm text-slate-400">
                {metric.label}
              </p>

              <p
                className={`mt-3 text-2xl font-semibold tabular-nums ${metric.color}`}
              >
                {metric.value}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-white">
              {accuracyValue >= 95
                ? "Excellent precision!"
                : accuracyValue >= 80
                  ? "Good progress!"
                  : "Keep practicing!"}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {accuracyValue >= 95
                ? "You are building strong typing habits."
                : "Prioritize accuracy and build speed gradually."}
            </p>
          </div>

          <span className="self-start rounded-lg border border-yellow-400/20 bg-yellow-400/[0.06] px-3 py-2 text-xs font-medium text-yellow-300 sm:self-auto">
            Practice makes progress
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default Results;
