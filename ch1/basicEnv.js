import * as THREE from 'three';


let SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;

let renderer,camera, scene;

class Main {
    constructor(){
        this.init = () => {
            initScene();
        }

        this.animate = () => {
            window.requestAnimationFrame(this.animate.bind(this))
            renderer.render(scene,camera);
        }

        this.init();
    }
    start(){
        this.animate();
    }
}

let main = new Main();
main.start();


// ---

function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, .1, 1000);
    camera.position.z = 1000;
    camera.position.x = 10;
    camera.position.y = 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    renderer.setPixelRatio( window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    // axes
    let axes = new THREE.AxesHelper(2000);
    scene.add(axes);
}
