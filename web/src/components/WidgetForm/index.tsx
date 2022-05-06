import bugImageUrl from "../../../assets/Bug.svg";
import ideaImageUrl from "../../../assets/Idea.svg";
import toughtImageUrl from "../../../assets/Thought.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Bug",
    image: {
      source: bugImageUrl,
      alt: "Image of a bug",
    },
  },
  IDEA: {
    title: "Suggestion",
    image: {
      source: ideaImageUrl,
      alt: "Image of a lamp",
    },
  },
  OTHER: {
    title: "Other",
    image: {
      source: toughtImageUrl,
      alt: "Image of a thought baloon",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleRestartFeedback = () => {
    setFeedbackType(null);
    setFeedbackSent(false);
  };

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedback} />
      ) : !feedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
      ) : (
        <FeedbackContentStep
          feedbackType={feedbackType}
          onFeedbackRestartRequested={handleRestartFeedback}
          onFeedbackSent={() => setFeedbackSent(true)}
        />
      )}
      <footer className="text-xs text-neutral-400">
        Made with ♥ by{" "}
        <a
          href="https://rocketseat.com.br"
          className="underline underline-offset-2"
        >
          RocketSeat
        </a>
      </footer>
    </div>
  );
}
