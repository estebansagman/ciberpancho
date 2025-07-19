import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createShaderMaterial } from './shader-waves.js';  // asegurate que esté bien el nombre y ruta
import { createShaderMaterial2 } from './shader-glich.js';  // asegurate que esté bien el nombre y ruta

let camera, scene, renderer, modelo, modelo2, giro;
giro = true

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();

  // Luz básica
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 7, 5).normalize();
  scene.add(light);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const loader = new GLTFLoader();

  loader.load(
    '/modelos/cara.glb',
    function (gltf) {
      modelo = gltf.scene;

      modelo.traverse((child) => {
        if (child.isMesh) {
          // Aplicar shader personalizado
          child.material = createShaderMaterial();
          child.geometry.computeVertexNormals();
          child.material.wireframe = true;
          modelo.rotation.y = 180.3
        }
      });

      modelo.scale.set(0.3, 0.3, 0.3);
      modelo.position.set(0, 0, 0);
      scene.add(modelo);

      console.log('Modelo GLB cargado con shader');
    },
    undefined,
    function (error) {
      console.error('Error cargando GLB:', error);
    }
  );

  loader.load(
    '/modelos/cara.glb',
    function (gltf) {
      modelo2 = gltf.scene;

      modelo2.traverse((child) => {
        if (child.isMesh) {
          // Aplicar shader personalizado
          child.material = createShaderMaterial2();
          child.geometry.computeVertexNormals();
          child.material.wireframe = true;
          modelo2.rotation.y = 180.26
        }
      });

      modelo2.scale.set(0.3, 0.3, 0.3);
      modelo2.position.set(0, 0, 0);
      scene.add(modelo2);

      console.log('Modelo GLB cargado con shader');
    },
    undefined,
    function (error) {
      console.error('Error cargando GLB:', error);
    }
  );

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time = 0) {
  requestAnimationFrame(animate);

  if (modelo) {
    if (modelo.rotation.y >= 180.8) {
        giro = false;
        console.log(modelo.rotation.y)
      }
      if (modelo.rotation.y <= 180.3) {
        giro = true;
        console.log(modelo.rotation.y)
      }

      if (giro) {
        modelo.rotation.y += 0.001;
        modelo2.rotation.y += 0.001;
        // console.log("girando +" + model.rotation.y);
      } else {
        modelo.rotation.y -= 0.001;
        modelo2.rotation.y -= 0.001;
        // console.log("girando -" + model.rotation.y);
      }
  }

  if (modelo2) {
      if (modelo2.rotation.y >= 180.8) {
        giro = false;
        console.log(modelo2.rotation.y)
      }
      if (modelo2.rotation.y <= 180.3) {
        giro = true;
        console.log(modelo2.rotation.y)
      }


  }


  // if (model) {
  //   model.rotation.y += 0.0015;
  // }

  // Actualizar el uniform 'time' para el shader
  scene.traverse((child) => {
    if (child.isMesh && child.material.uniforms?.time) {
      child.material.uniforms.time.value = time * 0.001;
    }
  });

  renderer.render(scene, camera);
}