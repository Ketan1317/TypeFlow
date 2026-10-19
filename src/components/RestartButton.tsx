
import { MdRefresh } from "react-icons/md";

type RestartButtonTypes = {
  onRestart: () => void;
  timeLeft: number;
};

const RestartButton = ({
  onRestart,
  timeLeft,
}: RestartButtonTypes) => {
  return (
    <button
      type="button"
      onClick={onRestart}
      aria-label="Restart typing test"
      title="Restart test"
      className="group inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-yellow-400/40 hover:bg-yellow-400/[0.06] hover:text-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b10] active:scale-[0.97]"
    >
      <MdRefresh
        size={20}
        className="transition-transform duration-300 group-hover:rotate-[-45deg]"
      />
      {timeLeft === 0 ? "Try again" : "Restart test"}
      <kbd className="ml-1 hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-500 sm:inline">
        RESET
      </kbd>
    </button>
  );
};

export default RestartButton;
