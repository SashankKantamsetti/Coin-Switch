import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x201d34);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const element = document.querySelector('.coin')
element.appendChild(renderer.domElement);

// Increase ambient light intensity for a more pronounced gold appearance
const ambientLight = new THREE.AmbientLight(0xFFD700, 5);
scene.add(ambientLight);

// Increase directional light intensity for a stronger light effect
const directionalLightLeft = new THREE.DirectionalLight(0xFFD700, 10);
directionalLightLeft.position.set(5, 2, 5).normalize();
scene.add(directionalLightLeft);

const directionalLightBottom = new THREE.DirectionalLight(0xFFD700, 10);
directionalLightBottom.position.set(0, 4, 0).normalize();
scene.add(directionalLightBottom);

const spotlight = new THREE.SpotLight(0xFFD700, 2, 20, Math.PI / 6, 1);
spotlight.position.set(0, 0, 5);
scene.add(spotlight);


/*var ambLight = new THREE.AmbientLight(Oxffffff, 1);
scene.add(ambLight)

var pointLightLeft = new THREE.PointLight(Ox77aa88, 1);
pointLightLeft.position.set(-2, -1, 10);
scene.add(pointLightLeft);

var pointLightRight = new THREE.PointLight(0xff8833, 1);
pointLightRight.position.set(2. - 1, 2);
scene.add(pointLightRight);

var whitePointLight = new THREE.PointLight(0xffffff, 0.3);
whitePointLight.position.set(0, 2, 1);
scene.add(whitePointLight);

var dirLight = new THREE.DirectionalLight(Oxff8833, l);
dirLight.position.z = 2;
scene.add(dirLight);*/

const loader = new GLTFLoader();
let coin;

const coinGroup = new THREE.Group(); // Create a group to contain the coin
const pivot = new THREE.Group(); // Create a pivot point

loader.load('./threed/scene.gltf', function (gltf) {
    coin = gltf.scene;

    // Adjust scale of the loaded model
    coin.scale.set(0.1, 0.1, 0.1); // Adjust the scale as needed

    // Adjust the position of the coin within the group to align with its center
    const box = new THREE.Box3().setFromObject(coin);
    const center = new THREE.Vector3();
    box.getCenter(center);
    coin.position.sub(center);

    coinGroup.add(coin); // Add the coin to the group
    pivot.add(coinGroup); // Add the group to the pivot
    scene.add(pivot); // Add the pivot to the scene

    // Add texture mapping for additional details
    coin.traverse((child) => {
        if (child instanceof THREE.Mesh) {

            const textureLoader = new THREE.TextureLoader()
            // Load texture files
            const metallicRoughnessTexture = new THREE.TextureLoader().load('./threed/textures/Scene_-_Root_metallicRoughness.png');
            const normalTexture = new THREE.TextureLoader().load('./threed/textures/Scene_-_Root_normal.png');

            textureLoader.load('./threed/textures/Scene_-_Root_baseColor.png', (baseColorTexture) => {
                baseColorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                baseColorTexture.wrapS = THREE.RepeatWrapping;
                baseColorTexture.wrapT = THREE.RepeatWrapping;
                baseColorTexture.repeat.set(1, 1);

                normalTexture.wrapS = THREE.RepeatWrapping;
                normalTexture.wrapT = THREE.RepeatWrapping;
                normalTexture.repeat.set(1, 1);

                child.material.map = baseColorTexture;
                child.material.metalnessMap = metallicRoughnessTexture;
                child.material.roughnessMap = metallicRoughnessTexture;


                // Adjust the material properties
                child.material.metalness = 1; // Full metalness for a metallic appearance
                child.material.roughness = 2;
                child.material.reflectivity = 1; // Adjust the roughness for shininess


            })


        }
    });

    // Add OrbitControls for mouse interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.touches = {
        ONE: THREE.TOUCH.PAN,
        TWO: THREE.TOUCH.DOLLY_PAN
    };
    controls.panSpeed = 0.8;
    controls.zoomSpeed = 100;

    animate();
});

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

window.addEventListener('resize', function () {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Listen for mouse down event to enable rotation
let isMouseDown = false;

document.addEventListener('mousedown', () => {
    isMouseDown = true;
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Rotate the pivot when the mouse is moved while holding down
document.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const rotationSpeed = 0.005;
        pivot.rotation.y += event.movementX * rotationSpeed;
        pivot.rotation.x += event.movementY * rotationSpeed;
    }
});
