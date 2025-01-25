import React, { useEffect, useRef } from 'react';
import InfiniteCanvas from 'ef-infinite-canvas';

const InfiniteCanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Create InfiniteCanvas instance
      const infCanvas = new InfiniteCanvas(canvasRef.current);

      const ctx = infCanvas.getContext('2d');

      ctx.fillStyle = '#f00';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.rect(40, 30, 200, 100);
      ctx.fill();
      ctx.stroke();

    }
  }, []);

  return <canvas ref={canvasRef} style={{background:"green", width: '50%', height: '40%' }} />;
};

export default InfiniteCanvasComponent;
