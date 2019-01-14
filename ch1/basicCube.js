import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import './common.less';

let SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;

let renderer,camera, scene, controls;

class Main {
    constructor(){

        this.state = {};

        this.init = () => {
            this.initScene();
            this.initDevTool();
            this.initList();
            this.handleEvent();
        }

        this.initScene = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, .1, 1000);
            camera.position.z = 1000;
            camera.position.x = 10;
            camera.position.y = 10;

            renderer = new THREE.WebGLRenderer()
            renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
            renderer.setPixelRatio( window.devicePixelRatio);
            document.body.appendChild(renderer.domElement);
        }

        this.initDevTool = () => {
            // axes
            scene.add(new THREE.AxesHelper(2000));
            controls = new TrackballControls(camera);
            controls.rotateSpeed = 1.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [65, 83, 68];
            controls.addEventListener('change', () => {
                this.render(scene,camera);
            });
        }

        this.initList = () => {
            let li = ['addcube','changecolor'];
            let list = document.createElement('ul');
            list.innerHTML = li.map(i => `<li>${i}</li>`).join('');
            document.body.appendChild(list);
        }
        this.handleEvent = () => {
            document.querySelector('ul').addEventListener('click',(e) => {
                let type = e.target.innerText;
                switch (true){
                    case /addcube/.test(type):
                        this.addCube();
                        break;
                    case /changecolor/.test(type):
                        this.changeColor();
                        break;
                }
            })
        }

        this.addCube = () => {
            if (this.state.cube) {
                return;
            }
            this.state.cube = true;
            let geometry = new THREE.BoxGeometry( 100, 100, 100 );
            let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            this.cube = new THREE.Mesh( geometry, material );
            scene.add( this.cube );
        }

        this.changeColor = () => {
            this.cube.material.color = new THREE.Color(Math.random(),Math.random(),Math.random());
        }

        this.animate = () => {
            window.requestAnimationFrame(this.animate.bind(this));
            controls && controls.update();
            this.render();
        }

        this.render = () => {
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

