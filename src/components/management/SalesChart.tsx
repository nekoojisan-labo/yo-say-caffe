interface ChartData {
  labels: string[];
  values: number[];
}

interface SalesChartProps {
  data: ChartData;
  width?: number;
  height?: number;
}

export function SalesChart({ data, height = 150 }: SalesChartProps) {
  const { labels, values } = data;

  if (values.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-gray-400"
        style={{ height }}
      >
        データがありません
      </div>
    );
  }

  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values);

  // ポイントを計算
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - ((v - minValue) / (maxValue - minValue || 1)) * 100;
    return { x, y, value: v };
  });

  // SVGのパスを生成
  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  // 塗りつぶしのパス
  const areaPath = `${linePath} L 100 100 L 0 100 Z`;

  return (
    <div style={{ height }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* グリッドライン */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#E5E7EB"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        ))}

        {/* 塗りつぶし */}
        <path
          d={areaPath}
          fill="url(#gradient)"
          opacity="0.3"
        />

        {/* グラデーション定義 */}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB6C1" />
            <stop offset="100%" stopColor="#FFB6C1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ライン */}
        <path
          d={linePath}
          fill="none"
          stroke="#FF6B9D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* データポイント */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2"
            fill="white"
            stroke="#FF6B9D"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* ラベル */}
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        {labels.map((label, i) => (
          <span
            key={i}
            className={i === 0 || i === labels.length - 1 ? '' : 'hidden sm:inline'}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Y軸ラベル */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 pointer-events-none">
        <span>{maxValue.toLocaleString()}</span>
        <span>{minValue.toLocaleString()}</span>
      </div>
    </div>
  );
}
