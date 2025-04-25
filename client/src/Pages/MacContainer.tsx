import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useScroll, useTexture } from '@react-three/drei';
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber';
export default function MacContainer() {
    let model = useGLTF("/mac.glb");
    let meshes = {};
    let text = useTexture("./red.jpg")
    console.log(text)
    model.scene.traverse(e => {

        meshes[e.name] = e;

    });
    meshes.screen.rotation.x = THREE.MathUtils.degToRad(180);
    meshes.matte.material.map = text;
    meshes.matte.material.emissiveIntensity = 0;
    meshes.matte.material.metalness = 0;
    meshes.matte.material.roughness = 1;
    let data = useScroll()
    useFrame((state, delta) => {
        meshes.screen.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90)
    })
    return (
        <group position={[0, -12, 20]}>
            {/* <OrbitControls /> */}

            <primitive object={model.scene} />
        </group>
    )

}


