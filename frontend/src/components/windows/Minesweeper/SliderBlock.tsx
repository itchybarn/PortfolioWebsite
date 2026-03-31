import { useState } from "react";
import "@src/css/SliderBlock.css"

interface SliderBlockProps {
  title: string;
  min: number;
  max: number;
  originalValue: number;
  onChange: (value: number) => void;
}

const SliderBlock = ({
  title,
  min,
  max,
  originalValue,
  onChange,
}: SliderBlockProps) => {
  const [value, setValue] = useState(originalValue);
  return (
    <div className="slider-block">
        <div className="slider-values">
            <div className="min-value">{min}</div>
            <div className="cur-value">{value}</div>
            <div className="max-value">{max}</div>
        </div>
      <input
        className="slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
          onChange(Number(e.target.value));
        }}
        step={1}
      />
      <div className="slider-title">{title}</div>
    </div>
  );
};

export default SliderBlock;
