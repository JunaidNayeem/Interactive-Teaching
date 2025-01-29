import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SketchPicker } from "react-color";
import { io } from "socket.io-client";

// const socket = io("https://bbb-canvas-backend.onrender.com");
const socket = io("http://localhost:5000");

const PaintFill = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#000000");

  useEffect(() => {
    // Receive initial shapes data from the server
    socket.on("init_shapes", (initialShapes) => {
      setShapes(initialShapes);
    });

    // Listen for updates to shapes from the server
    socket.on("update_shapes", (updatedShapes) => {
      setShapes(updatedShapes);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleShapeClick = (id) => {
    const updatedShapes = shapes.map((shape) =>
      shape.id === id ? { ...shape, color: selectedColor } : shape
    );
    setShapes(updatedShapes);

    // Emit the updated shapes to the server
    socket.emit("update_color", updatedShapes);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>
        Coloring Book App
      </h1>

      <div style={{ marginBottom: "24px" }}>
        <SketchPicker color={selectedColor} onChangeComplete={handleColorChange} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
      >
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            onClick={() => handleShapeClick(shape.id)}
            style={{
              cursor: "pointer",
              width: shape.type === "circle" ? "96px" : shape.type === "rectangle" ? "128px" : "0",
              height: shape.type === "circle" || shape.type === "rectangle" ? "96px" : "0",
              borderRadius: shape.type === "circle" ? "50%" : "0",
              backgroundColor: shape.type === "triangle" ? "transparent" : shape.color,
              borderLeft: shape.type === "triangle" ? "50px solid transparent" : undefined,
              borderRight: shape.type === "triangle" ? "50px solid transparent" : undefined,
              borderBottom: shape.type === "triangle" ? `100px solid ${shape.color}` : undefined,
            }}
            whileHover={{ scale: 1.1 }}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

export default PaintFill;
