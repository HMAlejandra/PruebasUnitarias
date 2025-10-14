// src/components/CountdownTimer.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CountdownTimer from "./CountdownTimer";

describe("CountdownTimer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  test("muestra el tiempo inicial correctamente", () => {
    render(<CountdownTimer />);

    const input = screen.getByPlaceholderText("Segundos");
    const button = screen.getByRole("button", { name: /Iniciar/i });

    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.click(button);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("disminuye en intervalos de un segundo", () => {
    render(<CountdownTimer />);

    const input = screen.getByPlaceholderText("Segundos");
    const button = screen.getByRole("button", { name: /Iniciar/i });

    fireEvent.change(input, { target: { value: "3" } });
    fireEvent.click(button);

    // Estado inicial
    expect(screen.getByText("3")).toBeInTheDocument();

    // Avanza 1 segundo
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("2")).toBeInTheDocument();

    // Avanza 1 segundo más
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("se detiene en 0", () => {
    render(<CountdownTimer />);

    const input = screen.getByPlaceholderText("Segundos");
    const button = screen.getByRole("button", { name: /Iniciar/i });

    fireEvent.change(input, { target: { value: "2" } });
    fireEvent.click(button);

    // Avanza 2 segundos
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText("0")).toBeInTheDocument();

    // Avanza tiempo extra → sigue en 0
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("deshabilita input y botón mientras corre", () => {
    render(<CountdownTimer />);

    const input = screen.getByPlaceholderText("Segundos") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /Iniciar/i });

    fireEvent.change(input, { target: { value: "2" } });
    fireEvent.click(button);

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();

    // Avanza hasta que llegue a 0
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Cuando termina, deberían estar habilitados de nuevo
    expect(input).not.toBeDisabled();
    expect(button).not.toBeDisabled();
  });

  test("no inicia con valores inválidos", () => {
    render(<CountdownTimer />);

    const input = screen.getByPlaceholderText("Segundos");
    const button = screen.getByRole("button", { name: /Iniciar/i });

    // Prueba con valor 0
    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.click(button);
    expect(screen.queryByText("0")).not.toBeInTheDocument();

    // Prueba con valor negativo
    fireEvent.change(input, { target: { value: "-5" } });
    fireEvent.click(button);
    expect(screen.queryByText("-5")).not.toBeInTheDocument();

    // Prueba con valor vacío - no debería mostrar el display de tiempo
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);
    // Verifica que no hay display de tiempo visible
    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
  });

  test("resetea correctamente después de completar", () => {
    render(<CountdownTimer />);

    const input = screen.getByPlaceholderText("Segundos") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /Iniciar/i });

    // Inicia con 1 segundo
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(button);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();

    // Avanza 1 segundo
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(input).not.toBeDisabled();
    expect(button).not.toBeDisabled();

    // Puede iniciar de nuevo
    fireEvent.change(input, { target: { value: "3" } });
    fireEvent.click(button);
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
