import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import './common.less';

let SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;

let renderer,camera, scene, controls;

class Main {
    constructor(){

        this.state = {};
        this.mouse = new THREE.Vector2();
        this.ray = new THREE.Raycaster();

        this.init = () => {
            this.initScene();
            this.initDevTool();
            this.initList();
            this.handleEvent();

            window.scene = scene;
            this.addCube();
        }

        this.initScene = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, .1, 1000);
            camera.position.z = 50;
            camera.position.x = 10;
            camera.position.y = 10;

            renderer = new THREE.WebGLRenderer()
            renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
            renderer.setPixelRatio( window.devicePixelRatio);
            document.body.appendChild(renderer.domElement);

            let AmbientLight = new THREE.AmbientLight(0xffffff);
            scene.add(AmbientLight);
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
            let li = ['addcube','changecolor','addlight','changeMaterial', 'toggleRotate'];
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
                    case /addlight/.test(type):
                        this.addPointLight();
                        break;
                    case /changeMaterial/.test(type):
                        this.changeMaterial();
                        break;
                    case /toggleRotate/.test(type):
                        this.toggleRotate();
                        break;
                }
            })

            document.addEventListener('click', (e) => {
                this.mouse.x = (e.clientX / SCREEN_WIDTH) * 2 -1;
                this.mouse.y = -(e.clientY / SCREEN_HEIGHT) * 2 + 1;
                console.log(this.mouse.x,this.mouse.y)
                let intersects = this.ray.intersectObjects( scene.children );
                console.log(intersects)

                for ( var i = 0; i < intersects.length; i++ ) {

                    if (intersects[i].object.type === 'Mesh'){
                        alert('success click!');
                    }

                }
            })
        }

        this.addCube = () => {
            if (this.state.cube) {
                return;
            }
            this.state.cube = true;
            let geometry = new THREE.BoxGeometry( 10, 10, 10 );
            let material = new THREE.MeshLambertMaterial( { color: 0x4285f4 } );
            this.cube = new THREE.Mesh( geometry, material );
            scene.add( this.cube );
        }

        this.changeColor = () => {
            this.cube.material.color = new THREE.Color(Math.random(),Math.random(),Math.random());
        }

        this.addPointLight = () => {
            if (this.state.light) {
                return;
            }
            this.state.light = true;
            let light = new THREE.PointLight(0xffffff,2);
            light.position.set(10,0,10);
            scene.add(light);

        }

        this.changeMaterial = () => {
            let color = this.cube.material.color;
            let phongMaterial = new THREE.MeshPhongMaterial({color : color});
            let lambertMaterial = new THREE.MeshLambertMaterial({color : color});
            if (this.cube.material.type === "MeshPhongMaterial" ){
                this.cube.material = lambertMaterial;
                this.cube.material.needsUpdate = true;
            } else {
                this.cube.material = phongMaterial;
                this.cube.material.needsUpdate = true;
            }
        }

        this.toggleRotate = () => {
            this.cube.update = () => {
                let y = this.cube.rotation.y + 0.05;
                this.cube.rotation.set(0,y,0);
            }
        }

        this.animate = () => {
            window.requestAnimationFrame(this.animate.bind(this));
            controls && controls.update();
            this.ray.setFromCamera(this.mouse,camera);

            this.cube.update && this.cube.update();
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

