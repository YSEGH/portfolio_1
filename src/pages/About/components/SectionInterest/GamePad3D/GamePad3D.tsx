import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls, Stats } from "@react-three/drei";
import * as THREE from "three";
import useScrollPosition from "../../../../../hooks/useScrollPosition";

type Props = {};

const Model: React.FC<Props> = ({}: Props) => {
  const model = useRef();
  const fbx = useLoader(FBXLoader, "/models/NintendoGamepad.fbx");

  const container = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useScrollPosition(container);
  const scroll = useRef(0);

  useEffect(() => {
    container.current = document.querySelector(
      "#section__interest"
    ) as HTMLDivElement;
  }, []);

  useEffect(() => {
    scroll.current = scrollPosition.top;
    return () => {};
  }, [scrollPosition.top]);

  useFrame((state, delta) => {
    if (model.current) {
      (model.current as THREE.Group).rotation.y = THREE.MathUtils.degToRad(
        (scroll.current * 0.00015 * 360) / 1
      );
      (model.current as THREE.Group).rotation.x = THREE.MathUtils.degToRad(
        (scroll.current * 0.00015 * 360) / 1
      );
    }
  });

  return <primitive ref={model} object={fbx} position={[0, 0, 0]} />;
};

const MyScene: React.FC = () => {
  return (
    <Canvas camera={{ position: [-50, 100, 130] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 100, 0]} intensity={2} />
      <Model />
      {/*       <OrbitControls />
       */}
    </Canvas>
  );
};

const GamePad3D: React.FC = () => {
  return <MyScene />;
};

export default GamePad3D;
