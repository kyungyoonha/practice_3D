import * as THREE from "https://cdn.skypack.dev/three@0.128.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js";
import Stats from "https://cdn.skypack.dev/three@0.128.0/examples/jsm/libs/stats.module.js";

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const fov = 60; // Field of View
const aspect = 1920 / 1080;
const near = 1;
const far = 1000;

var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(75, 20, 0);

const scene = new THREE.Scene();

// let light = new THREE.DirectionalLight(0xffffff, 1.0); // colo, intensity
// light.position.set(20, 100, 10);
// light.target.position.set(0, 0, 0);
// light.castShadow = true;
// scene.add(light);

// let AmbientlightColor = 0xffffffff;
// let AmbientLightIntensity = 1;
// const ambientLight = new THREE.AmbientLight(AmbientlightColor, AmbientLightIntensity);
// scene.add(ambientLight);

// 위에서 비추는 색, 아래에서 비추는 색, Intensity
const hemisphereLight = new THREE.HemisphereLight(0xffff80, 0x4040ff, 1);
scene.add(hemisphereLight);

const controls = new OrbitControls(camera, renderer.domElement);
let geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
let material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
});

const plane = new THREE.Mesh(geometry, material);
plane.castShadow = true;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// [ Sphere ]
// radius, widthSegment, heightSegment ,...
const Sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
    })
);

Sphere.position.set(0, 5, 0);
Sphere.castShadow = true;
Sphere.receiveShadow = true;
scene.add(Sphere);

// [ Box ]
// const box = new THREE.Mesh(
//     new THREE.BoxGeometry(2, 2, 2),
//     new THREE.MeshStandardMaterial({
//         color: 0xffffff,
//     })
// );

// box.position.set(0, 5, 0);
// box.castShadow = true;
// box.receiveShadow = true;
// scene.add(box);

// FPS 체크
let stats = new Stats();
document.body.appendChild(stats.dom);

const animate = function () {
    requestAnimationFrame(animate);
    stats.update();
    renderer.render(scene, camera);
};

animate();
