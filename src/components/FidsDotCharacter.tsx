import React, { useEffect, useState, useRef } from 'react';
import { getCharacterMatrix } from '../utils/dotMatrixFont';
import { ThemeMode, DotColor } from '../types';
import { playFlipSound } from '../utils/audio';

interface FidsDotCharacterProps {
  char: string;
  theme: ThemeMode;
  dotColor: DotColor;
  soundEnabled?: boolean;
  animateOnChange?: boolean;
  className?: string;
  dotRadius?: number;
}

const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const FidsDotCharacter: React.FC<FidsDotCharacterProps> = ({
  char,
  theme,
  dotColor,
  soundEnabled = false,
  animateOnChange = true,
  className = '',
}) => {
  const [displayChar, setDisplayChar] = useState(char.toUpperCase() || ' ');
  const [isFlipping, setIsFlipping] = useState(false);
  const prevCharRef = useRef(char.toUpperCase() || ' ');

  useEffect(() => {
    const targetChar = (char || ' ').toUpperCase();
    if (prevCharRef.current === targetChar) {
      return;
    }

    if (!animateOnChange) {
      setDisplayChar(targetChar);
      prevCharRef.current = targetChar;
      return;
    }

    // Trigger authentic FIDS mechanical split-flap cycling animation
    setIsFlipping(true);
    if (soundEnabled && targetChar !== ' ') {
      playFlipSound(0.08);
    }

    let step = 0;
    const maxSteps = 2 + Math.floor(Math.random() * 3); // 2-4 rapid mechanical flips
    const interval = setInterval(() => {
      step++;
      if (step >= maxSteps) {
        clearInterval(interval);
        setDisplayChar(targetChar);
        setIsFlipping(false);
        prevCharRef.current = targetChar;
      } else {
        const rand = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
        setDisplayChar(rand);
        if (soundEnabled) {
          playFlipSound(0.06);
        }
      }
    }, 45);

    return () => clearInterval(interval);
  }, [char, animateOnChange, soundEnabled]);

  const matrix = getCharacterMatrix(displayChar);

  // Colors depending on theme & dotColor preference
  const isDark = theme === 'dark';

  let activeFill = '#111215'; // Light mode active dots
  let inactiveFill = '#d5dfec'; // Light mode inactive dots
  let glowStyle = 'none';

  if (isDark) {
    inactiveFill = '#18232f'; // Very faint ghost dots in dark mode
    switch (dotColor) {
      case 'amber':
        activeFill = '#9fc8f2';
        glowStyle = 'drop-shadow(0 0 3px rgba(159, 200, 242, 0.4))';
        break;
      case 'cyan':
        activeFill = '#74c4cc';
        glowStyle = 'drop-shadow(0 0 3px rgba(116, 196, 204, 0.4))';
        break;
      case 'green':
        activeFill = '#72bf94';
        glowStyle = 'drop-shadow(0 0 3px rgba(114, 191, 148, 0.4))';
        break;
      case 'monochrome':
      default:
        activeFill = '#e6eef8';
        glowStyle = 'drop-shadow(0 0 2px rgba(230, 238, 248, 0.3))';
        break;
    }
  }

  return (
    <div
      className={`inline-block relative select-none transition-transform duration-150 w-full max-w-[26px] sm:max-w-[34px] md:max-w-[40px] lg:max-w-[46px] xl:max-w-[52px] 2xl:max-w-[58px] ${
        isFlipping ? 'scale-y-95' : 'scale-y-100'
      } ${className}`}
      style={{
        aspectRatio: '5 / 7',
        filter: isDark ? glowStyle : 'none',
      }}
    >
      <svg
        viewBox="0 0 50 70"
        className="w-full h-full block"
        preserveAspectRatio="xMidYMid meet"
      >
        {matrix.map((row, rIdx) =>
          row.map((isActive, cIdx) => {
            const cx = cIdx * 10 + 5;
            const cy = rIdx * 10 + 5;
            const isDotActive = isActive === 1;

            return (
              <circle
                key={`${rIdx}-${cIdx}`}
                cx={cx}
                cy={cy}
                r={isDotActive ? 4.2 : isDark ? 2.0 : 3.0}
                fill={isDotActive ? activeFill : inactiveFill}
                className="transition-colors duration-100"
              />
            );
          })
        )}
      </svg>
    </div>
  );
};
