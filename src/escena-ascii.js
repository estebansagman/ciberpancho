import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer, effect, cube, model, loader, giro;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshNormalMaterial();

  cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);  // si querés, lo podés activar

  loader = new GLTFLoader();

  loader.load(
    '/modelos/cara.glb',
    function (gltf) {
      model = gltf.scene;
      model.scale.set(0.3, 0.3, 0.3);
      model.position.set(0, 0, 0);
      model.rotation.y = 180.3;
      giro = true;
      scene.add(model);
      console.log('Modelo GLB cargado');
    },
    undefined,
    function (error) {
      console.error('Error cargando GLB:', error);
    }
  );

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 7, 5).normalize();
  scene.add(light);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = 'lime';
  effect.domElement.style.backgroundColor = 'black';

  document.body.appendChild(effect.domElement);

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  effect.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;

  if (model) {
    if (model.rotation.y >= 180.8) {
      giro = false;
    }
    if (model.rotation.y <= 180.3) {
      giro = true;
    }

    if (giro) {
      model.rotation.y += 0.001;
      // console.log("girando +" + model.rotation.y);
    } else {
      model.rotation.y -= 0.001;
      // console.log("girando -" + model.rotation.y);
    }
  }

  effect.render(scene, camera);
}