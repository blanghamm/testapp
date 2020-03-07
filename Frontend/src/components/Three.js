import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "react-three-fiber";
import io from "socket.io-client";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";

const endpoint = "http://localhost:3005/";
const socket = io(endpoint);

function Content(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const { camera } = useThree();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [thing, setThing] = useState(200);
  console.log("turd " + thing);

  useEffect(() => {
    socket.on("three", data => {
      setThing(data);
    });
  }, []);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [50, 50, 50] : [100, 100, 100]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
        roughness={0.75}
        metalness={0.6}
      />
    </mesh>
  );
}

function Lights() {
  return (
    <group>
      <pointLight intensity={0.3} />
      <ambientLight intensity={2} />
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
}

const Canvas = styled(c)`
  position: absolute !important;
  margin: 0;
  padding: 0;
`;

export default function Box() {
  return (
    <Canvas
      shadowMap
      camera={{ position: [0, 0, 100], fov: 100 }}
      gl={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <Lights />
      <Content />
    </Canvas>
  );
}
