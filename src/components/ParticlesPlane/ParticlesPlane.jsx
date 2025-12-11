// Done with the help of AI

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import './ParticlesPlane.scss';

const COLOR_TOP = '#9D50FE';
const COLOR_BOTTOM = '#F8D4D0';

const ParticlesMaterial = {
  vertexShader: `
    uniform float uTime;
    uniform vec3 uMouse;
    
    varying float vInitialY;
    
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vInitialY = position.y;

      vec3 pos = position;
      
      float globalCurve = sin(pos.x * 0.05 + uTime * 0.2) * 8.0; 
      pos.y += globalCurve;

      float timeScale = uTime * 0.4;
      float noiseScale = 0.06;
      float amplitude = 3.0;

      float noiseX = snoise(vec3(pos.x * noiseScale, pos.y * noiseScale, timeScale));
      float noiseY = snoise(vec3(pos.x * noiseScale + 100.0, pos.y * noiseScale + 100.0, timeScale));
      float noiseZ = snoise(vec3(pos.x * noiseScale + 200.0, pos.z * noiseScale + 200.0, timeScale));

      pos.x += noiseX * amplitude;
      pos.y += noiseY * amplitude;
      pos.z += noiseZ * amplitude;

      float dist = distance(pos.xy, uMouse.xy);
      float radius = 12.0;

      if (dist < radius) {
        float force = (radius - dist) / radius;
        force = pow(force, 2.0); 
        vec3 dir = normalize(pos - uMouse);
        pos += dir * force * 15.0; 
      }

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = 180.0 / -mvPosition.z; 
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColorTop;
    uniform vec3 uColorBottom;
    
    varying float vInitialY;

    void main() {
      float r = distance(gl_PointCoord, vec2(0.5));
      if (r > 0.5) discard;
      
      float gradientFactor = smoothstep(-7.0, 7.0, vInitialY);
      
      vec3 finalColor = mix(uColorBottom, uColorTop, gradientFactor);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

const Particles = () => {
  const pointsRef = useRef();
  const mouseMoved = useRef(false);
  const count = 8000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const width = 100;
    const height = 14;
    const depth = 14;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * width;
      pos[i * 3 + 1] = (Math.random() - 0.5) * height;
      pos[i * 3 + 2] = (Math.random() - 0.5) * depth;
    }
    return pos;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(10000, 10000, 0) },
      uColorTop: { value: new THREE.Color(COLOR_TOP) },
      uColorBottom: { value: new THREE.Color(COLOR_BOTTOM) },
    }),
    []
  );

  React.useEffect(() => {
    const handleMouseMove = () => {
      mouseMoved.current = true;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value =
        state.clock.getElapsedTime();

      if (mouseMoved.current) {
        const x = (state.pointer.x * state.viewport.width) / 2;
        const y = (state.pointer.y * state.viewport.height) / 2;
        pointsRef.current.material.uniforms.uMouse.value.set(x, y, 0);
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        attach='material'
        vertexShader={ParticlesMaterial.vertexShader}
        fragmentShader={ParticlesMaterial.fragmentShader}
        uniforms={uniforms}
        transparent={false}
        depthWrite={true}
      />
    </points>
  );
};

export default function ParticlesPlane() {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={`${
        ready ? 'particles-plane particles-plane--show' : 'particles-plane'
      }`}
      style={{
        opacity: ready ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 50], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={() => {
          setTimeout(() => setReady(true), 300);
        }}
      >
        <OrbitControls enableRotate={false} enableZoom={false} />
        <Particles />
      </Canvas>
    </div>
  );
}
