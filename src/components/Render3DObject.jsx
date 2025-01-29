import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import io from "socket.io-client";

// Connect to the Socket.IO server
// const socket = io("https://bbb-canvas-backend.onrender.com");
const socket = io("http://localhost:5000");

function Box({ id, rotation, onInteraction }) {
  const meshRef = useRef();

  // Update the rotation when the value changes
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation.x;
      meshRef.current.rotation.y = rotation.y;
    }
  }, [rotation]);

  const handlePointerDown = (event) => {
    event.stopPropagation();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const deltaX = event.movementX * 0.01; // Horizontal mouse movement
    const deltaY = event.movementY * 0.01; // Vertical mouse movement

    // Calculate new rotation, ensuring full 360-degree rotation
    const newRotation = {
      x: (meshRef.current.rotation.x + deltaY) % (2 * Math.PI),
      y: (meshRef.current.rotation.y + deltaX) % (2 * Math.PI),
    };

    onInteraction(id, newRotation);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <mesh ref={meshRef} onPointerDown={handlePointerDown}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="hotpink" />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    </mesh>
  );
}

const Render3DObject = () => {
  const [objects, setObjects] = useState({
    box1: { rotation: { x: 0, y: 0 } }, // Initial rotation values
  });

  // Listen for updates from the server
  useEffect(() => {
    socket.on("init", (initialObjects) => {
      setObjects(initialObjects);
    });

    socket.on("objectRotated", ({ id, rotation }) => {
      setObjects((prev) => ({
        ...prev,
        [id]: { ...prev[id], rotation },
      }));
    });

    return () => {
      socket.off("init");
      socket.off("objectRotated");
    };
  }, []);

  const handleInteraction = (id, rotation) => {
    if (!objects[id]) return;

    // Emit rotation event to the server
    socket.emit("rotateObject", { id, rotation });
    setObjects((prev) => ({
      ...prev,
      [id]: { ...prev[id], rotation },
    }));
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [4, 5, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <OrbitControls />

        {Object.keys(objects).map((id) => (
          <Box
            key={id}
            id={id}
            rotation={objects[id].rotation}
            onInteraction={handleInteraction}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default Render3DObject;