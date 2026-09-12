import React from 'react';

interface EmblemProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'shield' | 'eagle' | 'helmet';
}

export const EmblemKastrioti: React.FC<EmblemProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'shield' 
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  };

  if (variant === 'helmet') {
    return (
      <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer glow ring */}
          <circle cx="50" cy="50" r="46" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          
          {/* Goat Horns (Përkrenarja e Skënderbeut) */}
          <path 
            d="M50 35 C42 22 28 15 20 22 C15 27 22 35 32 37 C42 39 46 45 46 50" 
            stroke="#eab308" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            fill="none" 
          />
          <path 
            d="M50 35 C58 22 72 15 80 22 C85 27 78 35 68 37 C58 39 54 45 54 50" 
            stroke="#eab308" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* Horn ridges */}
          <path d="M26 21 L29 25" stroke="#ca8a04" strokeWidth="2" />
          <path d="M33 26 L36 30" stroke="#ca8a04" strokeWidth="2" />
          <path d="M74 21 L71 25" stroke="#ca8a04" strokeWidth="2" />
          <path d="M67 26 L64 30" stroke="#ca8a04" strokeWidth="2" />

          {/* Goat head base */}
          <path 
            d="M44 38 C44 34 56 34 56 38 L54 48 C53 50 47 50 46 48 Z" 
            fill="#ca8a04" 
            stroke="#fde047" 
            strokeWidth="1.5" 
          />

          {/* Helmet Dome */}
          <path 
            d="M30 68 C30 48 38 46 50 46 C62 46 70 48 70 68 C70 76 65 82 50 82 C35 82 30 76 30 68 Z" 
            fill="#1e293b" 
            stroke="#eab308" 
            strokeWidth="2.5" 
          />
          
          {/* Visor & Crown rib */}
          <path d="M50 46 L50 81" stroke="#fde047" strokeWidth="2" />
          <path d="M34 68 C42 72 58 72 66 68" stroke="#ca8a04" strokeWidth="2" />
          
          {/* Gold Star of Kastrioti */}
          <polygon 
            points="50,53 52,57 56,58 53,61 54,65 50,63 46,65 47,61 44,58 48,57" 
            fill="#eab308" 
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#991b1b" />
            <stop offset="50%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>
          <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>
        </defs>

        {/* Shield contour */}
        <path 
          d="M12 10 L88 10 C88 10 90 65 50 112 C10 65 12 10 12 10 Z" 
          fill="url(#shieldGrad)" 
          stroke="url(#goldBorder)" 
          strokeWidth="3.5" 
        />
        
        {/* Inner subtle border */}
        <path 
          d="M17 15 L83 15 C83 15 85 62 50 104 C15 62 17 15 17 15 Z" 
          stroke="#ca8a04" 
          strokeWidth="1" 
          opacity="0.6" 
          fill="none" 
        />

        {/* Six-pointed Star of the Kastrioti (Ylli me 6 cepa) above eagle */}
        <polygon 
          points="50,18 52,24 58,24 53,28 55,34 50,30 45,34 47,28 42,24 48,24" 
          fill="#fde047" 
          stroke="#ca8a04" 
          strokeWidth="0.8" 
        />

        {/* Double-Headed Black Eagle (Shqiponja Dykrenare e Kastriotëve) */}
        {/* Left Head */}
        <path 
          d="M48 37 C46 32 38 31 34 35 C31 38 34 41 38 41 C41 41 44 42 46 45" 
          fill="#09090b" 
          stroke="#18181b" 
          strokeWidth="1.5" 
        />
        <polygon points="32,36 27,37 32,39" fill="#eab308" /> {/* Beak Left */}

        {/* Right Head */}
        <path 
          d="M52 37 C54 32 62 31 66 35 C69 38 66 41 62 41 C59 41 56 42 54 45" 
          fill="#09090b" 
          stroke="#18181b" 
          strokeWidth="1.5" 
        />
        <polygon points="68,36 73,37 68,39" fill="#eab308" /> {/* Beak Right */}

        {/* Eagle Body & Breast */}
        <path 
          d="M46 44 C42 48 41 58 44 68 C46 75 50 78 50 78 C50 78 54 75 56 68 C59 58 58 48 54 44 Z" 
          fill="#09090b" 
        />

        {/* Left Wing & Feathers */}
        <path 
          d="M44 47 C36 45 23 48 20 56 C18 64 24 72 32 74 C36 75 42 71 43 68 C40 64 36 57 44 47 Z" 
          fill="#09090b" 
        />
        <path d="M22 56 L15 54 M24 62 L17 62 M27 68 L21 70" stroke="#09090b" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right Wing & Feathers */}
        <path 
          d="M56 47 C64 45 77 48 80 56 C82 64 76 72 68 74 C64 75 58 71 57 68 C60 64 64 57 56 47 Z" 
          fill="#09090b" 
        />
        <path d="M78 56 L85 54 M76 62 L83 62 M73 68 L79 70" stroke="#09090b" strokeWidth="2.5" strokeLinecap="round" />

        {/* Tail Feathers */}
        <path 
          d="M45 78 L42 92 C46 95 54 95 58 92 L55 78 Z" 
          fill="#09090b" 
        />
        
        {/* Talons */}
        <path d="M43 76 L39 82 M45 78 L43 84" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
        <path d="M57 76 L61 82 M55 78 L57 84" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};
