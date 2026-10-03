// src/components/consumer/marketplace/CommonQuestions.tsx
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Card from "@/ui/Card";

const FAQS = [
  {
    question: "How long does each Reflection take?",
    answer:
      "Most Reflections are designed to be completed in 15-30 minutes of active Products™. However, the quality of insight often depends on your depth of engagement rather than speed.",
  },
  {
    question: "Can I pause a Reflection once I've started?",
    answer:
      "Yes. Your progress is saved automatically. You can step away and return at any time. We recommend completing segments in one sitting to maintain reflective flow.",
  },
  {
    question: "What is the Illumination Bridge™?",
    answer:
      'The Illumination Bridge™ is where FAR transforms your completed reflection into meaningful, personalized insights and prepares your final report.',
  },
];

const CommonQuestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <h2 className="font-playfair text-2xl sm:text-3xl text-primary-text text-center mb-8">
        Common Questions
      </h2>

      <div className="max-w-2xl mx-auto space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <Card key={faq.question} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center gap-3 p-4 sm:p-5 text-left border-0 bg-transparent cursor-pointer"
              >
                <HelpCircle className="size-4 text-[#10B7BA] shrink-0" />
                <span className="flex-1 text-sm font-medium text-primary-text">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 text-secondary-text transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                  <p className="text-sm text-secondary-text leading-relaxed pl-7">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CommonQuestions;