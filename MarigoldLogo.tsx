import React from 'react';
import logoImg from '../assets/images/milk_marigold_logo_1788288506125.jpg';
import { useStoredImage } from '../utils/imageStore';

interface MarigoldLogoProps {
  className?: string;
  size?: number;
  alt?: string;
}

export const MarigoldLogo: React.FC<MarigoldLogoProps> = ({
  className = 'w-9 h-9',
  size,
  alt = 'Milk & Marigold Butterfly Logo'
}) => {
  const [currentLogo] = useStoredImage('brand_logo', logoImg);

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <img
        src={currentLogo}
        alt={alt}
        className="w-full h-full object-cover rounded-full"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};


