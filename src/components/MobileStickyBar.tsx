import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileStickyBarProps {
  bookingLink: string;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ bookingLink }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past hero section (~450px)
      setVisible(window.scrollY > 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 block md:hidden p-3 pr-18 bg-[#F7F1E6]/95 backdrop-blur-md border-t border-[#1B2A4A]/12"
        >
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center py-3 px-4 rounded-full bg-[#E8590C] text-[#1B2A4A] font-semibold text-sm shadow-md active:scale-[0.98] transition-transform"
          >
            Book a 20 minute call
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
