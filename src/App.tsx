/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TopBar } from './components/TopBar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProblemSection } from './components/ProblemSection.tsx';
import { WhatIDoSection } from './components/WhatIDoSection.tsx';
import { BeforeAfterSection } from './components/BeforeAfterSection.tsx';
import { HowWeStartSection } from './components/HowWeStartSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { QuestionsSection } from './components/QuestionsSection.tsx';
import { EnquiryFormSection } from './components/EnquiryFormSection.tsx';
import { FinalInvitation } from './components/FinalInvitation.tsx';
import { Footer } from './components/Footer.tsx';
import { MobileStickyBar } from './components/MobileStickyBar.tsx';

const BOOKING_LINK = 'https://cal.com/sh-deshpande-ko3xdf/30min';
const WHATSAPP_LINK = 'https://wa.me/9632172938';
const EMAIL = 'shripadraodesh@gmail.com';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F1E6] text-[#1B2A4A] selection:bg-[#E8590C]/25 selection:text-[#1B2A4A]">
      {/* 1. Top bar */}
      <TopBar bookingLink={BOOKING_LINK} />

      <main>
        {/* 2. Hero */}
        <Hero
          bookingLink={BOOKING_LINK}
          whatsappLink={WHATSAPP_LINK}
        />

        {/* 3. The problem, said in one sentence */}
        <ProblemSection />

        {/* 4. What I do */}
        <WhatIDoSection />

        {/* 5. Before and after */}
        <BeforeAfterSection />

        {/* 6. How we start */}
        <HowWeStartSection />

        {/* 7. About me, written as a short letter */}
        <AboutSection bookingLink={BOOKING_LINK} />

        {/* 8. Questions */}
        <QuestionsSection />

        {/* Enquiry form connected to n8n */}
        <EnquiryFormSection whatsappLink={WHATSAPP_LINK} />

        {/* 9. Final invitation, on ink */}
        <FinalInvitation
          bookingLink={BOOKING_LINK}
          whatsappLink={WHATSAPP_LINK}
          email={EMAIL}
        />
      </main>

      {/* 10. Footer on ink */}
      <Footer
        bookingLink={BOOKING_LINK}
        whatsappLink={WHATSAPP_LINK}
        email={EMAIL}
      />

      {/* Sticky mobile CTA bar */}
      <MobileStickyBar bookingLink={BOOKING_LINK} />
    </div>
  );
}
