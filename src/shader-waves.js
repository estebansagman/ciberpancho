import * as THREE from 'three';

export function createShaderMaterial() {
  const vertexShader = `
  
    uniform float time;
    varying vec2 vUv;

    void main() {
      vUv = uv;

      // Deformación simple en el eje Z:
      vec3 pos = position;
      pos.z += sin(pos.x * 10.0 + time * 5.0) * 0.1;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;

    void main() {
      float wave = 0.5 + 0.5 * sin(10.0 * vUv.x + time * 5.0);
      vec3 color = vec3(0.1, 1.2, 0.6);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  

  const uniforms = {
    time: { value: 0 }
  };

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,  // Opcional para que se vea bien por ambos lados
    wireframe: false,        // Cambialo a true si querés ver solo líneas
  });
}