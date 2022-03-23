import "./styles.css";
import p5Types from "p5";
import Sketch from "react-p5";
import { useControls } from "leva";

export default function App() {
  const data = useControls(() => ({
    Color: "#030405"
  }));

  const sketch = (p: p5Types) => {
    const GetFromCenterX = (x: number) => {
      return p.windowWidth / 2 + x;
    };

    const GetFromCenterY = (y: number) => {
      return p.windowHeight / 2 + y;
    };

    const GetFromP5X = (x: number) => {
      return x - p.windowWidth / 2;
    };

    const GetFromP5Y = (y: number) => {
      return y - p.windowHeight / 2;
    };

    const Dot = (x1: number, y1: number, x2: number, y2: number) => {
      return x1 * x2 + y1 * y2;
    };

    const Normalize = (x: number, y: number) => {
      const l = Math.sqrt(x * x + y * y);
      return { X: x / l, Y: y / l };
    };

    return {
      draw: () => {
        p.background("#808183");

        const mV = Normalize(GetFromP5X(p.mouseX), GetFromP5Y(p.mouseY));
        const lineV = Normalize(
          GetFromCenterX(p.windowWidth / 10),
          GetFromCenterY(0)
        );
        const d = Dot(mV.X, mV.Y, lineV.X, lineV.Y);

        // 光を受けた玉
        p.stroke(255 * d, 255 * d, 255 * d);
        p.strokeWeight(10);
        p.circle(GetFromCenterX(70), GetFromCenterY(0), p.windowWidth / 100);

        // 中心から光への線
        p.strokeWeight(5);
        p.stroke("#FFFF0033");
        p.fill("#FFFF0033");

        p.line(GetFromCenterX(0), GetFromCenterY(0), p.mouseX, p.mouseY);

        // 光
        p.strokeWeight(0);

        p.stroke("#FFFF0033");
        p.fill("#FFFF00");
        p.circle(p.mouseX, p.mouseY, p.windowWidth / 20);

        // 中心の円
        p.fill("#00FF00");
        p.circle(GetFromCenterX(0), GetFromCenterY(0), p.windowWidth / 10);
      }
    };
  };

  const setup = (p: p5Types, canvasParentRef: Element) => {
    p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasParentRef);
  };
  const draw = (p: p5Types) => {
    sketch(p).draw();
  };

  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}
