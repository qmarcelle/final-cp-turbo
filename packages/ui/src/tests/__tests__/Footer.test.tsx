import Footer from "../../components/broker_portal_components/Footer";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Footer component", () => {
  it("should render UI correctly", async () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    const stringWithYear =
      "©1998-" +
      currentYear +
      " BlueCross BlueShield of Tennessee, Inc., an Independent Licensee of the Blue Cross Blue Shield Association. BlueCross BlueShield of Tennessee is a Qualified Health Plan issuer in the Health Insurance Marketplace.1 Cameron Hill Circle, Chattanooga TN 37402-0001";
    expect(screen.getByTestId("footerText")).toHaveTextContent(stringWithYear);
  });
});
