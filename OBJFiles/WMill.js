import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';


export default class WMill{

  constructor(scene){
    this.scene = scene;
    this.type = 1;
    this.object = this.createWMill();
    this.scene.add(this.object);
  }

  createWMill(){
    this.container = new THREE.Object3D();
    this.image = './OBJFiles/wind/windmill.mtl';
    
    if(this.type == -1){
        this.image = './OBJFiles/wind/windmill2.mtl';
    }
    
    const mtlLoader = new MTLLoader();
    
    mtlLoader.load(this.image, (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();

      objLoader.setMaterials(mtl);
      objLoader.load('./OBJFiles/wind/windmill.obj', (root) => {
        root.rotation.y = Math.PI;
        root.position.set(6, 0, 0);
        root.scale.set(0.5, 0.5, 0.5);
        this.container.add(root)  
      });
    });
    return this.container;
  }      // compute the box that contains all the stuff      

  getObject(){
    return this.object;
  }

  updateTexture(){
    this.type = (-1)*this.type;
    this.object = this.createWMill();
    this.scene.add(this.object);
  }
}