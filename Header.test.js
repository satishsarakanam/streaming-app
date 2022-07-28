import { render, screen } from "@testing-library/react";
import Header from "../src/components/Header";

test("Render Demo Streaming", () => {
  render(<Header />);
  const linkElement = screen.getByText(/DEMO Streaming/i);
  expect(linkElement).toBeInTheDocument();
});

test("Render Onboarding login/registarion", () => {
  render(<Header />);
  const linkElement1 = screen.getByText(/Start your free trail/i);
  const linkElement2 = screen.getByText(/Log in/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});
