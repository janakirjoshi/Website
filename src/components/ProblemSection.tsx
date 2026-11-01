import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

const sentence =
  'You spend your evenings answering the same enquiry questions again and again while quotes sit unanswered, unclear on which jobs will close or who wants a website.';

interface WordProps {
  word: string;
  progress: any;
  range: [number, number];
  isReduced: boolean | null;
}

const Word: React.FC<WordProps> = ({ word, progress, range, isReduced }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);

  if (isReduced) {
    return <span className="text-[#F7F1E6] mr-[0.3em] inline-block">{word}</span>;
  }

  return (
    <motion.span
      style={{ opacity }}
      className="text-[#F7F1E6] mr-[0.3em] inline-block transition-colors duration-150"
    >
      {word}
    </motion.span>
  );
};

export const ProblemSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.25'],
  });

  const words = sentence.split(' ');

  return (
    <section
      ref={containerRef}
      data-theme="ink"
      className="relative w-full bg-[#1B2A4A] text-[#F7F1E6] py-28 md:py-36 lg:py-44 px-6 md:px-12 film-grain"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.25] md:leading-[1.2] tracking-tight">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
                isReduced={prefersReducedMotion}
              />
            );
          })}
        </h2>
      </div>
    </section>
  );
};
