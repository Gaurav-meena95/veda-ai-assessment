import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | string;
}

const Badge: React.FC<BadgeProps> = ({ className, difficulty, ...props }) => {
  let badgeStyle = "bg-gray-100 text-gray-800"; // Fallback default

  if (difficulty === 'Easy') {
    badgeStyle = "bg-badge-easy-bg text-badge-easy-text";
  } else if (difficulty === 'Moderate') {
    badgeStyle = "bg-badge-moderate-bg text-badge-moderate-text";
  } else if (difficulty === 'Challenging') {
    badgeStyle = "bg-badge-challenging-bg text-badge-challenging-text";
  } else if (difficulty === 'pending') {
    badgeStyle = "bg-yellow-100 text-yellow-850";
  } else if (difficulty === 'generated') {
    badgeStyle = "bg-badge-easy-bg text-badge-easy-text";
  } else if (difficulty === 'failed') {
    badgeStyle = "bg-badge-challenging-bg text-badge-challenging-text";
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold select-none transition-colors",
        badgeStyle,
        className
      )}
      {...props}
    >
      {difficulty}
    </div>
  );
};

export { Badge };
export default Badge;
