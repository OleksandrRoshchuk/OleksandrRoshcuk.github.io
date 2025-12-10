import React, { useRef, useState } from 'react';

const CYPHER_CHARS = 'abcdefghijklmnopqrstuvwxyz';

const ScrambleLink = ({ href, label }) => {
  const [text, setText] = useState(label);
  const intervalRef = useRef(null);

  const startScramble = () => {
    let iteration = 0;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText((prevText) =>
        label
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return label[index];
            }
            return CYPHER_CHARS[
              Math.floor(Math.random() * CYPHER_CHARS.length)
            ];
          })
          .join('')
      );

      if (iteration >= label.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current);
    setText(label);
  };

  return (
    <a href={href} onMouseEnter={startScramble} onMouseLeave={stopScramble}>
      <span className='original'>{label}</span>
      <span className='scrambled'>{text}</span>
    </a>
  );
};

export default ScrambleLink;
