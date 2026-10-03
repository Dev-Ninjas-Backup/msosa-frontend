// src/pages/consumer/CustomerProducts/CustomerProducts.tsx
import ActiveReflectionCard from "./sections/ActiveReflectionCard";
import MarketplaceCard from "./sections/MarketplaceCard";
import ReflectionJourney from "./sections/ReflectionJourney";
import CommonQuestions from "./sections/CommonQuestions";
import AnimatedContainer from "@/common/AnimatedContainer";

const ACTIVE_REFLECTIONS = [
  {
    title: "Relationship Reflection",
    description:
      "Examine the underlying dynamics of your interpersonal connections and attachment.",
    progress: 65,
    started: "Oct 12, 2023",
    lastActivity: "Oct 24, 2023",
    remaining: "~11 Minutes",
  },
  {
    title: "Relationship Reflection",
    description:
      "Examine the underlying dynamics of your interpersonal connections and attachment.",
    progress: 65,
    started: "Oct 12, 2023",
    lastActivity: "Oct 24, 2023",
    remaining: "~11 Minutes",
  },
];

const ALL_REFLECTIONS = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    category: "LEADERSHIP",
    duration: "30 Mins",
    title: "Relationship Reflection",
    description:
      "Examine the underlying dynamics of your interpersonal connections and attachment.",
    price: "$129",
  },
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    category: "DECISION MAKING",
    duration: "30 Mins",
    title: "Decision Reflection",
    description:
      "A high-stakes mental model framework designed to mitigate bias in critical career or life choices.",
    price: "$89",
  },
  {
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop",
    category: "LEADERSHIP",
    duration: "30 Mins",
    title: "Love Reflection",
    description:
      "Audit your leadership style, communication efficacy, and impact on organizational culture.",
    price: "$249",
  },
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    category: "RELATIONSHIPS",
    duration: "30 Mins",
    title: "Relationship Alignment Experience Reflection",
    description:
      "Audit your leadership style, communication efficacy, and impact on organizational culture.",
    price: "$249",
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    category: "LEADERSHIP",
    duration: "30 Mins",
    title: "Executive Function & Clarity Reflection",
    description:
      "Audit your leadership style, communication efficacy, and impact on organizational culture.",
    price: "$249",
  },
];

const CustomerProducts = () => {
  return (
    <div className="space-y-10 sm:space-y-12 pb-10">
      {/* Page Header */}
      <AnimatedContainer delay={0.05}>
        <div>
          <p className="text-sm sm:text-base text-secondary-text max-w-2xl">
            Discover guided reflection experiences designed to provide deeper
            self-awareness, clarity, and actionable insights through AI-assisted
            analysis and expert human review.
          </p>
        </div>
      </AnimatedContainer>

      {/* Active Cunsumer Products */}
      <AnimatedContainer delay={0.1}>
        <div>
          <h2 className="font-playfair text-xl text-primary-text mb-4">
            Active Cunsumer Products
            <sup className="text-[#10B7BA] text-sm">™</sup>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACTIVE_REFLECTIONS.map((item, i) => (
              <ActiveReflectionCard key={i} {...item} />
            ))}
          </div>
        </div>
      </AnimatedContainer>

      {/* All Reflections */}
      <AnimatedContainer delay={0.15}>
        <div>
          <h2 className="font-playfair text-xl text-primary-text mb-4">
            All Reflections
            <sup className="text-[#10B7BA] text-sm">™</sup>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
            {ALL_REFLECTIONS.map((item) => (
              <MarketplaceCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </AnimatedContainer>

      {/* Journey */}
      {/* <AnimatedContainer delay={0.2}>
        <ReflectionJourney />
      </AnimatedContainer> */}

      {/* FAQ */}
      <AnimatedContainer delay={0.25}>
        <CommonQuestions />
      </AnimatedContainer>
    </div>
  );
};

export default CustomerProducts;