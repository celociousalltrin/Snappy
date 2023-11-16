import React from "react";
import "./style.css";

const EditorProgressIcon = ({
  textLength = 50,
  outerStrokeWidth = 5,
  maxTextLength = 100,
  iconSize = 25,
}) => {
  if (textLength > maxTextLength) {
    var iconSize = iconSize + 8;
  }

  const circumference = 2 * Math.PI * ((iconSize - outerStrokeWidth) / 2);

  const number = textLength > maxTextLength ? maxTextLength : textLength;

  const progress = (number / maxTextLength) * circumference;

  const editorProgressStyle = (num) => {
    let customStyle = { position: "absolute", top: "19%" };
    if (num < 10) {
      customStyle = { ...customStyle, right: "38%" };
    } else if (num >= 10 && num <= 99) {
      customStyle = { ...customStyle, right: "28%" };
    } else {
      customStyle = { ...customStyle, right: "20%" };
    }
    return customStyle;
  };

  return (
    <div className="editor-progress-container me-2 ms-2">
      <svg style={{ height: "2.5rem", width: "2.5rem" }}>
        <circle
          cx="50%"
          cy="21"
          r={(iconSize - outerStrokeWidth) / 2}
          fill="transparent"
          stroke="rgb(168, 168, 168)"
          strokeWidth={outerStrokeWidth}
        />
        <circle
          cx="79"
          cy="50%"
          r={(iconSize - outerStrokeWidth) / 2}
          fill="transparent"
          stroke={
            maxTextLength < textLength
              ? "rgb(220, 53, 69)"
              : "rgb(13, 110, 253)"
          }
          strokeWidth={outerStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform={`rotate(-90 ${50} ${50})`}
        />
      </svg>

      {textLength > maxTextLength && (
        <span
          style={editorProgressStyle(textLength - number)}
          className="text-danger"
        >
          {textLength - number}
        </span>
      )}
    </div>
  );
};

export default EditorProgressIcon;
