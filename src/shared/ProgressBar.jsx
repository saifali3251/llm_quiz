export default function ProgressBar({ progress }) {
    return (
      <div className="progress-bar">
        <div className="fill" style={{ width: `${progress * 100}%` }}></div>
      </div>
    );
  }