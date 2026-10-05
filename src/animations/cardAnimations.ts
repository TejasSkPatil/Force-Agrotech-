export interface TiltOptions {
  maxRotation?: number;
  perspective?: number;
  scale?: number;
}

export function handleCardTilt(
  e: React.MouseEvent<HTMLDivElement>,
  card: HTMLDivElement,
  options: TiltOptions = {}
) {
  const { maxRotation = 7, perspective = 1000, scale = 1.02 } = options;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -maxRotation;
  const rotateY = ((x - centerX) / centerX) * maxRotation;

  card.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
  card.style.transition = 'transform 0.1s ease-out';
}

export function resetCardTilt(card: HTMLDivElement) {
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
}
