import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';


export default class Car{
    
  constructor(scene){
    this.scene = scene;
    this.type = 0;
    this.object = this.Car();
    this.scene.add(this.object);
  }

  Car(){
    
    this.container = new THREE.Object3D();
    if(this.type==1)
      this.image = './OBJFiles/wind/car2.mtl';
    else if(this.type==2)
      this.image = './OBJFiles/wind/car3.mtl';
    else
      this.image = './OBJFiles/wind/car1.mtl';
        
    const mtlLoader = new MTLLoader();

    mtlLoader.load(this.image, (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();

      objLoader.setMaterials(mtl);
      objLoader.load('./OBJFiles/wind/car.obj', (root) => {
        root.position.set(-6, 0.6, 3);
        root.scale.set(0.3, 0.3, 0.3);
        this.container.add(root)
      });
    });
    return this.container;

  }      // compute the box that contains all the stuff

  getObject(){
    return this.object;
  }

  updateTexture(){
    this.type = (1+this.type)%3;
    this.object = this.Car();
    this.scene.add(this.object);
  }
}
