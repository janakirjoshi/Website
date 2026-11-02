import React from 'react';

interface FooterProps {
  bookingLink: string;
  whatsappLink: string;
  email: string;
}

export const Footer: React.FC<FooterProps> = ({
  bookingLink,
  whatsappLink,
  email,
}) => {
  return (
    <footer
      data-theme="ink"
      className="bg-[#1B2A4A] border-t border-[#F7F1E6]/10 text-[#F7F1E6] py-16 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Left: Logo on cream panel & City */}
        <div className="space-y-4 max-w-md">
          {/* logo on a small cream rounded panel */}
          <div className="bg-[#F7F1E6] rounded-2xl p-1.5 inline-block shadow-sm">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-11-01_at_10.10.30_PM_f1dfc110.jpeg"
              alt="Mohanwebsitestudio"
              className="h-10 w-10 md:h-12 md:w-12 rounded-xl object-cover"
            />
          </div>

          <p className="text-xs sm:text-sm text-[#F7F1E6]/75 leading-relaxed">
            I live near the city of Bangalore, in Tumkur, and I want clients from Bangalore.
          </p>
        </div>

        {/* Right: Three contact links, year and Business name */}
        <div className="flex flex-col md:items-end gap-4 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-6 text-[#F7F1E6]/85">
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E8590C] transition-colors underline underline-offset-4"
            >
              Book a 20 minute call
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E8590C] transition-colors underline underline-offset-4"
            >
              Message me on WhatsApp
            </a>
            <a
              href={`mailto:${email}`}
              className="hover:text-[#E8590C] transition-colors underline underline-offset-4"
            >
              {email}
            </a>
          </div>

          <p className="text-[#F7F1E6]/50 tracking-tight pt-2">
            2026 Mohanwebsitestudio
          </p>
        </div>
      </div>
    </footer>
  );
};
