import { useState } from 'react';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  placeholderColor?: string;
  placeholderIcon?: string;
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

const roundedStyles = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

export function ImagePlaceholder({
  src,
  alt,
  width = '100%',
  height = 'auto',
  placeholderColor = '#FFE4E9',
  placeholderIcon = '🖼️',
  className = '',
  rounded = 'lg',
  objectFit = 'cover',
}: ImagePlaceholderProps) {
  const [isLoading, setIsLoading] = useState(!!src);
  const [hasError, setHasError] = useState(false);

  const showPlaceholder = !src || hasError;

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (showPlaceholder) {
    return (
      <div
        className={`
          flex flex-col items-center justify-center
          ${roundedStyles[rounded]}
          ${className}
        `}
        style={{
          ...style,
          backgroundColor: placeholderColor,
        }}
      >
        <span className="text-4xl mb-2">{placeholderIcon}</span>
        <span className="text-xs text-gray-500 text-center px-2">{alt}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${roundedStyles[rounded]} ${className}`}
      style={style}
    >
      {/* ローディング表示 */}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center animate-pulse"
          style={{ backgroundColor: placeholderColor }}
        >
          <span className="text-2xl">⏳</span>
        </div>
      )}

      {/* 実際の画像 */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ objectFit }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}

// キャラクター立ち絵用のプレースホルダー
interface CharacterPlaceholderProps {
  characterId: string;
  expression?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function CharacterPlaceholder({
  characterId,
  expression = 'normal',
  width = 300,
  height = 500,
  className = '',
}: CharacterPlaceholderProps) {
  // 実際の画像パスを構築
  const imagePath = `assets/images/characters/${characterId}/${expression}.png`;

  return (
    <ImagePlaceholder
      src={imagePath}
      alt={`${characterId} (${expression})`}
      width={width}
      height={height}
      placeholderColor="#E6E6FA"
      placeholderIcon="🧚‍♂️"
      className={className}
      rounded="none"
      objectFit="contain"
    />
  );
}

// 背景用のプレースホルダー
interface BackgroundPlaceholderProps {
  backgroundId: string;
  className?: string;
}

export function BackgroundPlaceholder({
  backgroundId,
  className = '',
}: BackgroundPlaceholderProps) {
  const imagePath = `assets/images/backgrounds/${backgroundId}.png`;

  const backgroundColors: Record<string, string> = {
    cafe_interior: '#FFE4E9',
    garden: '#98FF98',
    sunset: '#FFB347',
    night: '#4A5568',
    park: '#90EE90',
  };

  return (
    <ImagePlaceholder
      src={imagePath}
      alt={backgroundId}
      width="100%"
      height="100%"
      placeholderColor={backgroundColors[backgroundId] || '#E6E6FA'}
      placeholderIcon="🏞️"
      className={className}
      rounded="none"
      objectFit="cover"
    />
  );
}
