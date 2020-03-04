import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import io from "socket.io-client";

const endpoint = "http://localhost:3005/";
const socket = io(endpoint);

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [rotation, setRotation] = useState(0.1);

  useEffect(() => {
    //This is not working, continues to update three js until it crashes.
    socket.on("three", data => {
      console.log(data);
    });
  }, []);

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(
  //   () => (mesh.current.rotation.x = mesh.current.rotation.y += rotation)
  // );

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}

export default Box;
