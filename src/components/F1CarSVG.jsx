export default function F1CarSVG({
  color = "#DC2626",
  secondary = "#000000",
  accent = "#FCD800",
}) {
  const bodyGradientId = `body-gradient-${color.replace("#", "")}`;
  const tireGradientId = `tire-gradient-${color.replace("#", "")}`;

  return (
    <svg
      viewBox="0 0 240 480"
      className="h-full w-full overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={bodyGradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>

        <linearGradient
          id={tireGradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#111" />
          <stop offset="20%" stopColor="#333" />
          <stop offset="80%" stopColor="#333" />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
      </defs>

      {/* Underbody */}
      <path
        d="M60 140 L180 140 L190 350 L50 350 Z"
        fill="#111"
        opacity="0.9"
      />

      {/* Front wing */}
      <g transform="translate(0 20)">
        <path
          d="M40 20 L200 20 L190 0 L50 0 Z"
          fill={secondary}
        />
        <path
          d="M40 20 C80 30 160 30 200 20"
          fill="none"
          stroke={accent}
          strokeWidth="2"
        />
        <rect
          x="40"
          y="0"
          width="160"
          height="20"
          fill={color}
          opacity="0.5"
        />
      </g>

      {/* Nose cone */}
      <path
        d="M100 20 L140 20 L135 110 L105 110 Z"
        fill={color}
      />
      <path
        d="M110 30 L130 30 L128 50 L112 50 Z"
        fill={secondary}
      />

      {/* Front suspension */}
      <g stroke="#222" strokeWidth="4">
        <line x1="80" y1="90" x2="40" y2="100" />
        <line x1="160" y1="90" x2="200" y2="100" />
        <line x1="90" y1="70" x2="50" y2="60" />
        <line x1="150" y1="70" x2="190" y2="60" />
      </g>

      {/* Front tyres */}
      <g>
        <rect
          x="20"
          y="60"
          width="45"
          height="70"
          rx="8"
          fill={`url(#${tireGradientId})`}
        />
        <rect
          x="175"
          y="60"
          width="45"
          height="70"
          rx="8"
          fill={`url(#${tireGradientId})`}
        />
        <rect
          x="30"
          y="70"
          width="5"
          height="50"
          fill={accent}
          opacity="0.8"
        />
        <rect
          x="205"
          y="70"
          width="5"
          height="50"
          fill={accent}
          opacity="0.8"
        />
      </g>

      {/* Sidepods and main body */}
      <path
        d="M70 140 C50 160 50 280 75 320 L95 360 L145 360 L165 320 C190 280 190 160 170 140 L70 140 Z"
        fill={`url(#${bodyGradientId})`}
      />

      {/* Sidepod inlets */}
      <path d="M70 140 L90 140 L85 170 L65 170 Z" fill="#111" />
      <path d="M170 140 L150 140 L155 170 L175 170 Z" fill="#111" />

      {/* Cockpit */}
      <rect
        x="100"
        y="160"
        width="40"
        height="60"
        rx="10"
        fill="#1a1a1a"
      />
      <circle
        cx="120"
        cy="190"
        r="12"
        fill={accent}
        stroke="#fff"
        strokeWidth="2"
      />

      {/* Halo */}
      <path
        d="M105 150 L135 150 L120 200"
        fill="none"
        stroke="#333"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="120"
        y1="150"
        x2="120"
        y2="200"
        stroke="#333"
        strokeWidth="3"
      />

      {/* Engine cover */}
      <path
        d="M110 220 L130 220 L125 380 L115 380 Z"
        fill={color}
      />
      <path
        d="M118 230 L122 230 L122 360 L118 360 Z"
        fill="#111"
        opacity="0.5"
      />

      {/* Rear suspension */}
      <g stroke="#222" strokeWidth="5">
        <line x1="90" y1="340" x2="50" y2="360" />
        <line x1="150" y1="340" x2="190" y2="360" />
      </g>

      {/* Rear tyres */}
      <g>
        <rect
          x="10"
          y="320"
          width="55"
          height="80"
          rx="10"
          fill={`url(#${tireGradientId})`}
        />
        <rect
          x="175"
          y="320"
          width="55"
          height="80"
          rx="10"
          fill={`url(#${tireGradientId})`}
        />
        <rect
          x="25"
          y="335"
          width="5"
          height="50"
          fill={accent}
          opacity="0.8"
        />
        <rect
          x="210"
          y="335"
          width="5"
          height="50"
          fill={accent}
          opacity="0.8"
        />
      </g>

      {/* Rear wing */}
      <g transform="translate(0 410)">
        <rect
          x="50"
          y="0"
          width="140"
          height="30"
          rx="2"
          fill={color}
        />
        <rect
          x="50"
          y="5"
          width="140"
          height="20"
          fill="none"
          stroke={secondary}
          strokeWidth="2"
        />
        <text
          x="120"
          y="20"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          letterSpacing="2"
        >
          DRS
        </text>
        <rect
          x="50"
          y="-10"
          width="5"
          height="40"
          fill={secondary}
        />
        <rect
          x="185"
          y="-10"
          width="5"
          height="40"
          fill={secondary}
        />
      </g>

      {/* Rear rain light */}
      <rect
        x="115"
        y="400"
        width="10"
        height="10"
        fill="red"
        className="animate-pulse"
      />
    </svg>
  );
}