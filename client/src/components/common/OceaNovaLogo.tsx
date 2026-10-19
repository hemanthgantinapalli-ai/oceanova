import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const OceaNovaLogo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeMap = {
    sm: { mark: 'h-10 w-10', title: 'text-sm', subtitle: 'text-[7px]' },
    md: { mark: 'h-14 w-14', title: 'text-xl', subtitle: 'text-[8px]' },
    lg: { mark: 'h-[4.25rem] w-[4.25rem]', title: 'text-2xl', subtitle: 'text-[9px]' },
    xl: { mark: 'h-20 w-20', title: 'text-3xl', subtitle: 'text-[10px]' },
  };

  const styles = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <span className={`relative flex shrink-0 items-center justify-center overflow-hidden ${styles.mark}`}>
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-auto w-[123%] max-w-none -translate-x-1/2"
        />
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className={`font-display font-bold tracking-[0.13em] text-[#0A3C7B] ${styles.title}`}>
            OCEANO<span className="text-[#278a42]">VA</span>
          </span>
          <span className={`mt-1 whitespace-nowrap font-semibold tracking-[0.12em] text-[#0A2540] ${styles.subtitle}`}>
            BLUE ECONOMY FOUNDATION
          </span>
        </span>
      )}
    </div>
  );
};
