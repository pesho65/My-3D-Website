import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene1 = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})
//First renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene1, camera);
//Second
 



//Light
const light = new THREE.SpotLight(0xffffff, 100);
light.position.set(5,5,5);
scene1.add(light);


//3D objects - torus
const geometry = new THREE.TorusKnotGeometry( 10/1.85, 1.25, 300, 20); 
const material = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(geometry, material);
//scene1.add(torus);
torus.position.z = 10;
torus.position.setX(-5);
torus.position.setY(-6);
//Astronat model
let AstroModel;
const loader_astro = new GLTFLoader();
loader_astro.load(
  'assets/space_suit/scene.gltf',
  function(gltf){
    AstroModel = gltf.scene;
    AstroModel.traverse((child) => {
      if (child.isMesh) child.material = material;
    });

    AstroModel.position.z = 3;
    AstroModel.position.x = 3;
    AstroModel.scale.set(4,4,4);
    scene1.add(AstroModel);
    renderer.render(scene1, camera);
  } 
);
let MoonModel;
const loader_moon = new GLTFLoader();
loader_moon.load(
  'assets/moon/scene.gltf',
  function(gltf){
    MoonModel = gltf.scene;
    MoonModel.traverse((child) => {
      if (child.isMesh) child.material = material;
    });

    scene1.add(MoonModel);
    renderer.render(scene1, camera);

});




const controls = new OrbitControls(camera, renderer.domElement);

//Update Camera Movement
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  

  camera.position.z = t * -0.005;
  camera.position.x = 5;
  camera.position.y = 10 - window.scrollY/500;
}
document.body.onscroll = moveCamera;
moveCamera();

//Animation
function animate(){
  requestAnimationFrame(animate);
  
  //Moving
  AstroModel.rotation.y += 0.01;
  AstroModel.rotation.z += 0.0001;

  controls.update();
  renderer.render(scene1, camera);
}

animate();
