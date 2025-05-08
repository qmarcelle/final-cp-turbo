import WelcomeBanner from "../../components/broker_portal_components/WelcomeBanner";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("WelcomeBanner component", () => {
  it("should render welcome message with name correctly",  () => {
    render(<WelcomeBanner titleText="Welcome," name="James Kilney"/>);
    expect(screen.getByText("Welcome, James Kilney")).toBeInTheDocument();
  });
});
