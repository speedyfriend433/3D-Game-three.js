const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const floorGeometry = new THREE.PlaneGeometry(50, 50);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 0.5;
scene.add(player);

const obstacleGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
obstacle.position.set(0, 0.5, -10);
scene.add(obstacle);

camera.position.z = 10;
camera.position.y = 5;
camera.lookAt(0, 0, 0);

const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

let isGameOver = false;

function checkCollision() {
  const playerBox = new THREE.Box3().setFromObject(player);
  const obstacleBox = new THREE.Box3().setFromObject(obstacle);

  if (playerBox.intersectsBox(obstacleBox)) {
    isGameOver = true;
    alert("Game Over! Reload to play again.");
  }
}

function animate() {
  if (isGameOver) return;

  requestAnimationFrame(animate);

  if (keys["ArrowLeft"]) player.position.x -= 0.1;
  if (keys["ArrowRight"]) player.position.x += 0.1;
  if (keys["ArrowUp"]) player.position.z -= 0.1;
  if (keys["ArrowDown"]) player.position.z += 0.1;

  obstacle.position.z += 0.05;
  if (obstacle.position.z > 10) {
    obstacle.position.set((Math.random() - 0.5) * 20, 0.5, -10);
  }

  checkCollision();

  renderer.render(scene, camera);
}

animate();
