import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [seconds, setSeconds] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const startCountdown = () => {
    if (seconds === null || isNaN(seconds) || seconds <= 0) return;
    setTimeLeft(seconds);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning || timeLeft === null) return;

    if (timeLeft === 0) {
      setIsRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  return (
    <div className="h-full w-full p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Contador Regresivo</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          className="border rounded-lg p-2 w-32"
          placeholder="Segundos"
          value={seconds ?? ""}
          disabled={isRunning}
          onChange={(e) => setSeconds(parseInt(e.target.value))}
        />
        <button
          onClick={startCountdown}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg text-white transition ${
            isRunning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Iniciar
        </button>
      </div>

      {timeLeft !== null && (
        <div className="bg-gray-100 rounded-lg p-6 shadow text-4xl font-mono">
          {timeLeft}
        </div>
      )}
    </div>
  );
}
