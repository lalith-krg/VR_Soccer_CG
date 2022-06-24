import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';


export default class Sofa{
    
  constructor(scene){
    this.scene = scene;
    this.type = 0;
    this.object = this.createSofa();
    this.scene.add(this.object);
  }

  createSofa(){
    this.container = new THREE.Object3D();
    if(this.type==1)
      this.image = './OBJFiles/wind/Sofa.mtl';
    else if(this.type==2)
      this.image = './OBJFiles/wind/Sofa2.mtl';
    else
      this.image = './OBJFiles/wind/Sofa3.mtl';
      
    const mtlLoader = new MTLLoader();
    mtlLoader.load(this.image, (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load('./OBJFiles/wind/Sofa.obj', (root) => {
        root.position.set(-5, 0.5, -5);
        root.scale.set(1, 1, 1);
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
    this.object = this.createSofa();
    this.scene.add(this.object);
  }
}
