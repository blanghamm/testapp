import * as THREE from "three";
import React, { useEffect, useState } from "react";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";
import { useSprings, a } from "react-spring/three";
import io from "socket.io-client";

const endpoint = "http://localhost:3005/";
const socket = io(endpoint);

const number = 35;
const colors = [
  "#A2CCB6",
  "#FCEEB5",
  "#EE786E",
  "#e0feff",
  "lightpink",
  "lightblue"
];
const random = i => {
  const r = Math.random();
  return {
    position: [100 - Math.random() * 200, 100 - Math.random() * 200, i * 1.5],
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    scale: [1 + r * 14, 1 + r * 14, 1],
    rotation: [0, 0, THREE.Math.degToRad(Math.round(Math.random()) * 45)]
  };
};

const data = new Array(number).fill().map(() => {
  return {
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10]
  };
});

function Content() {
  const [thing, setThing] = useState(10);
  const [springs, set] = useSprings(number, i => ({
    from: random(i),
    ...random(i),
    config: { mass: thing, tension: 150, friction: 50 }
  }));
  useEffect(
    () =>
      void setInterval(() => set(i => ({ ...random(i), delay: i * 40 })), 3000),
    [set]
  );
  //   useEffect(() => {
  //     socket.on("three", data => {
  //       console.log(data);
  //       setThing(data);
  //     });
  //   });
  return data.map((d, index) => (
    <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
      <boxBufferGeometry attach="geometry" args={d.args} />
      <a.meshStandardMaterial
        attach="material"
        color={springs[index].color}
        roughness={0.75}
        metalness={0.5}
      />
    </a.mesh>
  ));
}

const Canvas = styled(c)`
  background-color: #cdcd;
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
      <Content />
    </Canvas>
  );
}
