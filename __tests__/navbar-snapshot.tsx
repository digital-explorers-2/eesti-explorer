import Navbar from "@/components/Navbar"
import { render } from "@testing-library/react";

describe("About page snapshot unchanged", () => {
  it("renders about page", () => {
    const { container } = render(<Navbar/>);
    expect(container).toMatchSnapshot();
  });
});