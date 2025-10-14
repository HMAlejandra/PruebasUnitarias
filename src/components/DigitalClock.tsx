import { useState, useEffect } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState<string>("");

  // Función para formatear la hora en HH:MM:SS
  const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Función para obtener la fecha actual (permite mock en tests)
  const getCurrentTime = () => new Date();

  useEffect(() => {
    // Inicializa el reloj
    const now = getCurrentTime();
    setTime(formatTime(now));

    // Actualiza cada segundo
    const interval = setInterval(() => {
      const current = getCurrentTime();
      setTime(formatTime(current));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Reloj Digital</h1>
      <div className="bg-black text-green-400 font-mono text-4xl px-6 py-4 rounded-lg shadow">
        {time}
      </div>
    </div>
  );
}
