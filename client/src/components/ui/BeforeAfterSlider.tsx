import React, { useState } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Baseline (2024)',
  afterLabel = 'Restored Bio-Shield (2026)'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <div
      className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-cyan-500/20 shadow-glass"
      onMouseMove={handleSliderMove}
      onTouchMove={handleSliderMove}
    >
      {/* After Image (Full background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4 bg-ocean-900/80 backdrop-blur text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/30">
        {afterLabel}
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: '100%', maxWidth: 'none' }}
        />
        <div className="absolute top-4 left-4 bg-ocean-900/80 backdrop-blur text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-electric-blue shadow-glow-cyan"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-electric-blue text-ocean-900 flex items-center justify-center font-bold text-xs shadow-lg">
          ↔
        </div>
      </div>
    </div>
  );
};
