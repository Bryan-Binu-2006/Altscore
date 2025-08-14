import { useMemo } from "react";
import { CalculatedScores } from "../types/assessment";

interface ScoreVisualizationProps {
  scores: CalculatedScores;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreVisualization({ scores, size = 'md' }: ScoreVisualizationProps) {
  const { circumference, strokeDashoffset, dimensions } = useMemo(() => {
    const radius = size === 'lg' ? 80 : size === 'md' ? 60 : 40;
    const circumference = 2 * Math.PI * radius;
    const percentage = (scores.final / 10) * 100;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return {
      circumference,
      strokeDashoffset,
      dimensions: {
        width: (radius + 20) * 2,
        height: (radius + 20) * 2,
        radius
      }
    };
  }, [scores.final, size]);

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return "#3b82f6"; // Blue
    if (score >= 6.5) return "#10b981"; // Green
    if (score >= 4.5) return "#f59e0b"; // Yellow
    return "#ef4444"; // Red
  };

  const scoreColor = getScoreColor(scores.final);
  const textSize = size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-3xl' : 'text-xl';
  const labelSize = size === 'lg' ? 'text-base' : size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <div className="relative inline-block">
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="transform -rotate-90"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        {/* Background circle */}
        <circle
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          r={dimensions.radius}
          stroke="#e5e7eb"
          strokeWidth={size === 'lg' ? 8 : size === 'md' ? 6 : 4}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          r={dimensions.radius}
          stroke={scoreColor}
          strokeWidth={size === 'lg' ? 8 : size === 'md' ? 6 : 4}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="score-circle"
        />
      </svg>
      
      {/* Score text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`${textSize} font-bold text-gray-900`}>
            {scores.final.toFixed(1)}
          </div>
          <div className={`${labelSize} text-gray-600 capitalize`}>
            {scores.category}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ModelScoreCardProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  color: string;
  breakdown?: Record<string, number>;
}

export function ModelScoreCard({ title, score, icon, color, breakdown }: ModelScoreCardProps) {
  return (
    <div className="assessment-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className={`text-xl ${color}`}>{icon}</div>
      </div>
      
      <div className="text-center mb-4">
        <div className={`text-3xl font-bold ${color}`}>
          {score.toFixed(1)}
        </div>
        <div className="text-sm text-gray-600">Score out of 10</div>
      </div>

      {breakdown && (
        <div className="space-y-2">
          {Object.entries(breakdown).slice(0, 3).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="capitalize">{key.replace(/_/g, ' ')}</span>
              <span className="font-medium">{value.toFixed(1)}/10</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
