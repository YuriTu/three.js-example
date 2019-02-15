import * as THREE from 'three';


let SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;

let renderer,camera, scene;

class Main {
    constructor(){
        this.init = () => {
            this.initScene();
        }

        this.initScene = () => {
            // 创建场景
            scene = new THREE.Scene();
            // 创建相机
            camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, .1, 1000);
            // 创建渲染器
            renderer = new THREE.WebGLRenderer();
            // 添加渲染器至dom
            document.body.appendChild(renderer.domElement);

            alert('success! Your browser supports WebGL.')
        }

        this.animate = () => {
            window.requestAnimationFrame(this.animate.bind(this))
            renderer.render(scene,camera);
        }

        // 初始化构建
        this.init();
        // 动画启动与管理
        this.animate();
    }
}

let main = new Main();

