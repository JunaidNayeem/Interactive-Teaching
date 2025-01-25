import React, { useEffect, useRef } from 'react';

const AnimalCanvas = ({ animals, canvasRef }) => {
  // Ref to store image positions to avoid re-renders
  const imagePositionsRef = useRef([]);

  useEffect(() => {
    if (canvasRef.current && animals.length > 0) {
      const ctx = canvasRef.current.getContext('2d');

      animals.forEach((animal) => {
        const img = new Image();
        img.src = animal.image;

        img.onload = () => {
          // Generate random x, y positions
          const x = Math.random() * (canvasRef.current.width - 100); // Prevent overflow
          const y = Math.random() * (canvasRef.current.height - 100);

          // Draw the image on the canvas
          ctx.drawImage(img, x, y, 100, 100);

          // Store position data along with the animal sound
          imagePositionsRef.current.push({
            x,
            y,
            width: 100,
            height: 100,
            sound: animal.sound,
          });
        };
      });

      // Add click event listener for the entire canvas to detect image clicks
      const handleClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // Check if the click is inside any image
        imagePositionsRef.current.forEach((position) => {
          if (
            clickX >= position.x &&
            clickX <= position.x + position.width &&
            clickY >= position.y &&
            clickY <= position.y + position.height
          ) {
            const audio = new Audio(position.sound);
            audio.play();
          }
        });
      };

      // Attach the event listener
      canvasRef.current.addEventListener('click', handleClick);

      // Cleanup the event listener on unmount
      return () => {
        canvasRef.current.removeEventListener('click', handleClick);
      };
    }
  }, [animals, canvasRef]); // No need to watch imagePositions

  return null; // No need to render anything here
};

export default AnimalCanvas;
