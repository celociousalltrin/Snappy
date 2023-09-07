import React from "react";

const shapes = ["circle", "square", "triangle"];
const colors = ["#FFC107", "#3F51B5", "#E91E63", "#4CAF50"];
const patterns = ["stripes", "dots", "squares", "crosshatch"];

function generateAvatar() {
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];

  return {
    shape,
    color,
    pattern,
  };
}

function MyAvatar() {
  const { shape, color, pattern } = generateAvatar();

  return (
    // <svg width="100" height="100">
    //   {shape === "circle" && <circle cx="50" cy="50" r="40" fill={color} />}
    //   {shape === "square" && (
    //     <rect x="30" y="30" width="40" height="40" fill={color} />
    //   )}
    //   {shape === "triangle" && (
    //     <polygon points="50,10 90,90 10,90" fill={color} />
    //   )}
    //   {pattern === "stripes" && (
    //     <line
    //       x1="0"
    //       y1="0"
    //       x2="100"
    //       y2="100"
    //       stroke={color}
    //       strokeWidth="8"
    //       strokeLinecap="round"
    //     />
    //   )}
    //   {pattern === "dots" && <circle cx="20" cy="20" r="8" fill={color} />}
    //   {pattern === "squares" && (
    //     <rect x="60" y="40" width="20" height="20" fill={color} />
    //   )}
    // </svg>
    <svg width="200" height="200">
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="#FDD7B5"
        stroke="#E6B89C"
        stroke-width="10"
      />

      <circle cx="70" cy="80" r="20" fill="#FFFFFF" />
      <circle cx="130" cy="80" r="20" fill="#FFFFFF" />
      <rect x="80" y="150" width="40" height="10" fill="#E6B89C" />

      <path
        d="M 70 120 Q 100 140 130 120"
        stroke="#E6B89C"
        stroke-width="10"
        fill="none"
      />
    </svg>
  );
}

export default MyAvatar;
