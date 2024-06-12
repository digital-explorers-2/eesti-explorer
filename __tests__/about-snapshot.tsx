import About from "@/components/LandingPage/About"
import { render } from "@testing-library/react";

describe("About page snapshot unchanged", () => {
  it("renders about page", () => {
    const { container } = render(<About/>);
    expect(container).toMatchSnapshot();
  });
});