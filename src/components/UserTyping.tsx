
import Caret from "./Caret";

type UserTypingType = {
  userInput: string;
  words: string;
};

const UserTyping = ({ userInput, words }: UserTypingType) => {
  return (
    <div
      className="whitespace-pre-wrap break-words"
      aria-label="Text to type"
    >
      {words.split("").map((expected, idx) => {
        const isTyped = idx < userInput.length;
        const isCorrect = userInput[idx] === expected;

        let characterClass = "text-slate-500";

        if (isTyped) {
          characterClass = isCorrect
            ? "text-yellow-300"
            : "rounded-sm bg-red-500/15 text-red-400 underline decoration-red-400/70 underline-offset-4";
        }

        return (
          <span key={idx} className={characterClass}>
            {idx === userInput.length && <Caret />}
            {expected}
          </span>
        );
      })}

      {userInput.length >= words.length && <Caret />}
    </div>
  );
};

export default UserTyping;
