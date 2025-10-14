// src/components/DigitalClock.test.tsx
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import DigitalClock from "./DigitalClock";

describe("DigitalClock", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  test("muestra el título 'Reloj Digital'", () => {
    render(<DigitalClock />);
    expect(screen.getByText("Reloj Digital")).toBeInTheDocument();
  });

  test("muestra la hora actual en formato correcto", () => {
    render(<DigitalClock />);
    
    // Busca el div que contiene la hora usando una clase específica
    const timeDisplay = screen.getByText(/\d{2}:\d{2}:\d{2}/); //n hora aparece en formato hh:mm:ss usando regex.
    expect(timeDisplay).toBeInTheDocument();
    expect(timeDisplay).toHaveClass("bg-black", "text-green-400", "font-mono", "text-4xl");
  });

  test("actualiza la hora cada segundo", () => {
    render(<DigitalClock />);

    // Obtiene la hora inicial
    const initialTime = screen.getByText(/\d{2}:\d{2}:\d{2}/).textContent;
    expect(initialTime).toMatch(/\d{2}:\d{2}:\d{2}/);

    // Avanza 1 segundo
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Verifica que la hora sigue el formato correcto
    const updatedTime = screen.getByText(/\d{2}:\d{2}:\d{2}/).textContent;
    expect(updatedTime).toMatch(/\d{2}:\d{2}:\d{2}/);
  });

  test("tiene el estilo correcto para el display de tiempo", () => {
    render(<DigitalClock />);
    
    const timeDisplay = screen.getByText(/\d{2}:\d{2}:\d{2}/);
    expect(timeDisplay).toHaveClass("bg-black", "text-green-400", "font-mono", "text-4xl");
  });

  test("se actualiza automáticamente con setInterval", () => {
    render(<DigitalClock />);

    // Verifica que hay un intervalo activo
    expect(jest.getTimerCount()).toBe(1);

    // Avanza el tiempo
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Verifica que el intervalo sigue activo
    expect(jest.getTimerCount()).toBe(1);
  });

  test("formatea correctamente las horas con ceros a la izquierda", () => {
    // Mock de Date para una hora específica
    const mockDate = new Date("2023-01-01T09:05:03");
    const originalDate = global.Date;
    global.Date = jest.fn(() => mockDate) as any;
    
    render(<DigitalClock />);
    
    // Verifica que se muestra la hora formateada correctamente
    expect(screen.getByText("09:05:03")).toBeInTheDocument();
    
    // Restaura el Date original
    global.Date = originalDate;
  });

  test("maneja correctamente el cambio de día", () => {
    // Mock de Date para medianoche
    const mockDate = new Date("2023-01-01T23:59:59");
    const originalDate = global.Date;
    global.Date = jest.fn(() => mockDate) as any;
    
    render(<DigitalClock />);
    
    // Verifica que se muestra la hora formateada correctamente
    expect(screen.getByText("23:59:59")).toBeInTheDocument();
    
    // Restaura el Date original
    global.Date = originalDate;
  });
});
