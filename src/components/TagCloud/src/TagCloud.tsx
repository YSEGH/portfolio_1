import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

const SPHERE_RADIUS = 65;
const NUM_POINTS = 21;
const CAMERA_DISTANCE = 300;
const FONT = "/fonts/poligon_light_regular.json";
const FONT_SIZE = 8;

export type Tag = {
  id: number;
  name: string;
  rate: number;
};

export default class TagCloud {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private tags: Tag[];
  private meshes: THREE.Mesh[];
  private hoverMesh: THREE.Mesh | null = null;
  private clickMesh: THREE.Mesh | null = null;
  private containerId: string;
  private callback: Function;
  private mDown: boolean = false;
  private mDragging: boolean = false;
  private lastScrollPosition: number = window.scrollY;

  constructor(containerId: string, tags: Tag[], callback: Function) {
    const width =
      document.getElementById(containerId)?.getBoundingClientRect().width ??
      window.innerWidth;
    const height =
      document.getElementById(containerId)?.getBoundingClientRect().height ??
      window.innerHeight;
    this.containerId = containerId;
    this.callback = callback;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xff4d4d);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    this.camera.position.set(0, 0, CAMERA_DISTANCE);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.maxPolarAngle = 2.5;
    this.controls.minPolarAngle = 0.5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1).normalize();
    this.scene.add(directionalLight);

    this.tags = tags;
    this.meshes = [];
    this.createMeshes();
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.appendChild(this.renderer.domElement);
    }
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    /*     window.addEventListener("mousemove", (event) => this.setupMeshHover(event));
    window.addEventListener("mousedown", () => {
      this.mDown = true;
    });
    window.addEventListener("mouseup", (event: MouseEvent) => {
      if (this.mDragging === false) {
        this.onMeshClick(event);
      }
      this.mDown = false;
      this.mDragging = false;
    }); */
    /*     window.addEventListener("scroll", (event) => this.handleScroll(event));
     */
    this.animate();
  }

  private handleScroll = (event: Event) => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > this.lastScrollPosition) {
      // Scroll vers le bas
      this.updateCamera("bottom");
    } else if (currentScrollPosition < this.lastScrollPosition) {
      // Scroll vers le haut
      this.updateCamera("top");
    }

    // Mettez à jour la dernière position du scroll
    this.lastScrollPosition = currentScrollPosition;
  };

  private updateCamera(to: string) {
    switch (to) {
      case "top":
        this.camera.position.y += 0.5;
        break;
      default:
        this.camera.position.y -= 0.5;
        break;
    }
  }

  private onMeshClick(event: MouseEvent) {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObjects(this.meshes, true);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object as THREE.Mesh;

      if (this.clickMesh && clickedMesh !== this.clickMesh) {
        this.handleMeshActive(this.clickMesh, false);
      }

      this.clickMesh = clickedMesh;
      this.handleMeshActive(this.clickMesh, true);
      (clickedMesh.material as THREE.MeshBasicMaterial[])[0].color.setHex(
        0xff0000
      );
      this.callback(clickedMesh.name);
    } else {
      if (this.clickMesh) {
        this.handleMeshActive(this.clickMesh, false);
        this.clickMesh = null;
        this.callback(null);
      }
    }
  }

  private handleMeshActive(mesh: THREE.Mesh, isActive: boolean) {
    const material = mesh.material as THREE.MeshBasicMaterial[];
    material[0].color.setHex(isActive ? 0xff0000 : 0x000000);
  }

  private setCursor(isActive: boolean) {
    document.getElementById(this.containerId)!.style.cursor = isActive
      ? "pointer"
      : "auto";
  }

  private setupMeshHover(event: MouseEvent) {
    if (this.mDown) {
      this.mDragging = true;
    }
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObjects(this.meshes, true);

    if (intersects.length > 0) {
      // Hovered on a mesh
      const hoverMesh = intersects[0].object as THREE.Mesh;
      if (hoverMesh !== this.clickMesh) {
        this.setCursor(true);
      } else {
        this.setCursor(false);
      }
      if (hoverMesh !== this.hoverMesh) {
        // Reset the previous hoverMesh color
        if (this.hoverMesh && this.hoverMesh !== this.clickMesh) {
          this.handleMeshActive(this.hoverMesh, false);
        }

        // Set the new hoverMesh and change its color

        this.hoverMesh = hoverMesh;
        this.handleMeshActive(this.hoverMesh, true);
      }
    } else {
      // No hover, reset the color of the previous hoverMesh
      if (this.hoverMesh && this.hoverMesh !== this.clickMesh) {
        this.handleMeshActive(this.hoverMesh, false);
        this.hoverMesh = null;
      }
      this.setCursor(false);
    }
  }

  private createMeshes() {
    /*     const sphereGeometry = new THREE.SphereGeometry(50, 32, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x2c2c2c,
      wireframe: true,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.scene.add(sphereMesh); */

    const points = this.calculateSphericalPoints(SPHERE_RADIUS, NUM_POINTS);

    const usedPoints: THREE.Vector3[] = [];

    for (let i = 0; i < NUM_POINTS; i++) {
      let point: THREE.Vector3 | undefined;

      // Chercher un point non utilisé
      for (let j = 0; j < points.length; j++) {
        if (!usedPoints.includes(points[j])) {
          point = points[j];
          usedPoints.push(point);
          break;
        }
      }

      if (!point) {
        console.error("Pas assez de points disponibles.");
        break;
      }

      const loader = new FontLoader();

      loader.load(FONT, (font) => {
        const geometry = new TextGeometry(this.tags[i].name, {
          font: font,
          size: FONT_SIZE,
          height: 1,
          curveSegments: 20,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 4,
          bevelOffset: 0,
          bevelSegments: 5,
        });

        const material = [
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
          }),
        ];

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.copy(point!);
        mesh.geometry.computeBoundingBox();
        mesh.geometry.translate(-mesh.geometry.boundingBox!.max.x / 2.5, 0, 0);
        mesh.name = this.tags[i].name;
        this.meshes.push(mesh);
        this.scene.add(mesh);
      });
    }
  }

  private calculateSphericalPoints(
    radius: number,
    numPoints: number,
    minDistance: number = 30
  ): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];

    const isTooClose = (
      point: THREE.Vector3,
      existingPoints: THREE.Vector3[]
    ) => {
      for (const existingPoint of existingPoints) {
        if (point.distanceTo(existingPoint) < minDistance) {
          return true;
        }
      }
      return false;
    };

    let i = 0;
    while (i < numPoints) {
      const u = Math.random();
      const v = Math.random();

      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const point = new THREE.Vector3(x, y, z);

      if (!isTooClose(point, points)) {
        points.push(point);
        i++;
      }
    }

    return points;
  }

  private updateOpacity() {
    const cameraDirection = new THREE.Vector3();
    this.camera.getWorldDirection(cameraDirection);

    this.meshes.forEach((mesh) => {
      const meshDirection = mesh.position.clone().normalize();

      const dotProduct = cameraDirection.dot(meshDirection);
      const opacity = Math.max(0, dotProduct); // Minimum opacity is 0

      (mesh.material as THREE.MeshBasicMaterial[])[0].opacity = 1 - opacity;
    });
  }

  private animate() {
    this.meshes.forEach((mesh) => {
      mesh.lookAt(this.camera.position);
    });

    this.updateOpacity();

    requestAnimationFrame(this.animate.bind(this));

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize() {
    /*  const width = window.innerWidth;
    const height = window.innerHeight; */
    const container = document.getElementById(this.containerId);
    const width = container?.getBoundingClientRect().width ?? 0;
    const height = container?.getBoundingClientRect().height ?? 0;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
