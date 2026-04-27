interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean;
}

export default function Logo({ size = 'md', dark = false }: LogoProps) {
  const sizes = {
    sm: { outer: 'w-8 h-8', text: 'text-sm', sub: 'text-xs' },
    md: { outer: 'w-10 h-10', text: 'text-base', sub: 'text-xs' },
    lg: { outer: 'w-16 h-16', text: 'text-2xl', sub: 'text-sm' },
  };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-3">
      <div className={`${s.outer} rounded-xl bg-red-600 flex items-center justify-center shadow-lg flex-shrink-0`}>
        <svg viewBox="0 0 40 40" className="w-3/4 h-3/4" fill="none">
          <path d="M4 28 L8 16 L12 12 L28 12 L32 16 L36 28 Z" fill="white" opacity="0.9"/>
          <circle cx="12" cy="29" r="3.5" fill="white"/>
          <circle cx="28" cy="29" r="3.5" fill="white"/>
          <path d="M4 24 L36 24" stroke="white" strokeWidth="1.5" opacity="0.5"/>
          <rect x="14" y="16" width="12" height="7" rx="1" fill="white" opacity="0.4"/>
        </svg>
      </div>
      <div>
        <div className={`${s.text} font-black tracking-tight leading-none ${dark ? 'text-gray-900' : 'text-white'}`}>
          FRANCO
          <span className="text-red-500"> AUTO</span>
          <span className={dark ? 'text-gray-900' : 'text-white'}>MOTORS</span>
        </div>
        <div className={`${s.sub} font-medium tracking-widest uppercase ${dark ? 'text-gray-500' : 'text-white/70'} leading-tight`}>
          Miami, Florida
        </div>
      </div>
    </div>
  );
}
