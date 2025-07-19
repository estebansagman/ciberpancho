import * as THREE from 'three';

export function createShaderMaterial2() {
  const vertexShader = `
    varying vec2 vUv;
    uniform float time;

    void main() {
      vUv = uv;

      // deformación glitch tipo salto brusco
      vec3 pos = position;

      float glitchX = step(0.95, fract(sin(pos.y * 50.0 + time * 50.0) * 43758.5453));
      float glitchY = step(0.95, fract(sin(pos.x * 50.0 + time * 50.0) * 43758.5453));

      pos.x += glitchX * 0.05;
      pos.y += glitchY * 0.05;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;

    void main() {
      float wave = 0.5 + 0.5 * sin(10.0 * vUv.x + time * 1.0);
      vec3 color = vec3(0.4, 0.3, 0.3);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = {
    time: { value: 0 }
  };

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  });
}