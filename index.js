import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {RectAreaLightUniformsLib} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/lights/RectAreaLightUniformsLib.js';
import {RectAreaLightHelper} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/helpers/RectAreaLightHelper.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';

import WMill from  './OBJFiles/WMill.js';
import Car from  './OBJFiles/car.js';
import Teapot from  './OBJFiles/teapot.js';
import Sofa from  './OBJFiles/sofa.js';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  var objects = [];

  var avatarMesh;
  var avatarMesh2;
  var football;

  var carry_mode = 1;
  var dribble_mode = 0;
  var kick_mode = 0;

  var l1_flag = 1;
  var l2_flag = 1;
  var l3_flag = 1;
  var l4_flag = 1;
  var spot_flag = 1;
  var spot_flag2 = 1;
  
  var cam_flag = 0;
  var lookAngle = 0;
  
  const fov = 100;
  const aspect = 2;
  const near = 0.1;
  const far = 20;
  
  var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.y = 5;
  camera.position.z = 5;
  camera.position.x = 0;
  camera.lookAt(0,1,0);

  //orbit controls
  var controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();
  //scene.background = new THREE.Color('#FFFFFF');\

  //Lights properties
  const color = 0xFFFFFF;
  const color2 = 0xFF0000;
  const color3 = 0xFEE300;
  const intensity = 1;

  //Directional Light
  const dir_light = new THREE.DirectionalLight(color, intensity);
  dir_light.position.set(0, 6, 0);
  dir_light.target.position.set(0, 0, 0);
  scene.add(dir_light);
  scene.add(dir_light.target);

  //point light
  const sun_light1 = new THREE.PointLight(color, intensity);
  sun_light1.position.set(16, 2, 9.5);
  scene.add(sun_light1);

  const sun_light2 = new THREE.PointLight(color, intensity);
  sun_light2.position.set(-16, 2, 9.5);
  scene.add(sun_light2)

  const sun_light3 = new THREE.PointLight(color, intensity);
  sun_light3.position.set(-16, 2, -9.5);
  scene.add(sun_light3)

  const sun_light4 = new THREE.PointLight(color, intensity);
  sun_light4.position.set(16, 2, -9.5);
  scene.add(sun_light4)

  //spot_light
  const spot_light = new THREE.SpotLight(color2, intensity*3);
  spot_light.position.set(5, 4, -5);
  spot_light.target.position.set(0, 0, 0);

  scene.add(spot_light);
  scene.add(spot_light.target);

  //spot_light2
  const spot_light2 = new THREE.SpotLight(color3, intensity);
  spot_light2.position.set(0, 2, 0);
  spot_light2.target.position.set(0, 0, 0);

  scene.add(spot_light2);
  scene.add(spot_light2.target);

  //frame loader
  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 0, 1))
        .normalize();

    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  //floodlight1
  const flood1_gltfLoader = new GLTFLoader();
  flood1_gltfLoader.load('./lights2/stadium_light.gltf', (gltf) => {
    const flood_light1 = gltf.scene;
    flood_light1.scale.set(0.2,0.2,0.2);
    flood_light1.position.x = -16;
    flood_light1.position.y = 0;
    flood_light1.position.z = 9.5;
    flood_light1.position
    scene.add(flood_light1);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(flood_light1);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  //floodlight2
  const flood2_gltfLoader = new GLTFLoader();
  flood2_gltfLoader.load('./lights2/stadium_light.gltf', (gltf) => {
    const flood_light2 = gltf.scene;
    flood_light2.scale.set(0.2,0.2,0.2);
    flood_light2.position.x = 16;
    flood_light2.position.y = 0;
    flood_light2.position.z = 9.5;
    flood_light2.position
    scene.add(flood_light2);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(flood_light2);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  //floodlight3
  const flood3_gltfLoader = new GLTFLoader();
  flood3_gltfLoader.load('./lights2/stadium_light.gltf', (gltf) => {
    const flood_light3 = gltf.scene;
    flood_light3.scale.set(0.2,0.2,0.2);
    flood_light3.position.x = 16;
    flood_light3.position.y = 0;
    flood_light3.position.z = -9.5;
    flood_light3.position
    scene.add(flood_light3);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(flood_light3);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  //floodlight4
  const flood4_gltfLoader = new GLTFLoader();
  flood4_gltfLoader.load('./lights2/stadium_light.gltf', (gltf) => {
    const flood_light4 = gltf.scene;
    flood_light4.scale.set(0.2,0.2,0.2);
    flood_light4.position.x = -16;
    flood_light4.position.y = 0;
    flood_light4.position.z = -9.5;
    flood_light4.position
    scene.add(flood_light4);

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(flood_light4);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  // football field
  const gltfLoader = new GLTFLoader();
    gltfLoader.load('./grass/scene.gltf', (gltf) => {
      const root = gltf.scene;
      root.scale.set(1,1,1);
      scene.add(root);

      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
      frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
      controls.update();
    });

  // player 1
  const human_gltfLoader = new GLTFLoader();
  human_gltfLoader.load('./human/scene.gltf', (gltf) => {
    const avatar = gltf.scene;
    avatar.scale.set(0.0008,0.0008,0.0008);
    avatar.rotation.y = Math.PI;
    avatar.position.x = 0;
    avatar.position.y = 0;
    avatar.position.z = 2.5;

    scene.add(avatar);

    avatarMesh = avatar;

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(avatar);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  // player 2
  const human_gltfLoader2 = new GLTFLoader();
  human_gltfLoader2.load('./human/scene.gltf', (gltf) => {
    const avatar2 = gltf.scene;
    avatar2.scale.set(0.0008, 0.0008, 0.0008);
    avatar2.rotation.y = Math.PI;
    avatar2.position.x = -4;
    avatar2.position.y = 0;
    avatar2.position.z = 3;

    scene.add(avatar2);

    avatarMesh2 = avatar2;

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(avatar2);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);

    controls.update();
  });

  // football
  const football_gltfLoader = new GLTFLoader();
  football_gltfLoader.load('./football/scene.gltf', (gltf) => {
    const fb = gltf.scene;
    fb.scale.set(0.15,0.15,0.15);
    fb.position.x = 0;
    fb.position.y = 0.3;
    fb.position.z = 0;

    scene.add(fb);

    football = fb;

    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(fb);

    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());

    // set the camera to frame the box
    frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    // update the Trackball controls to handle the new size
    controls.maxDistance = boxSize * 10;
    controls.target.copy(boxCenter);
    controls.update();
  });

  objects = [avatarMesh, avatarMesh2, football];

  // scene.add(avatarMesh);
  // scene.add(avatarMesh2);
  // var newObj = new THREE.Object3D();
  // avatarMesh.add(football);

  // await new Promise(r => setTimeout(r, 2000));
  // await sleep(2000);

  // console.log(avatarMesh);
  // setTimeout(() => { console.log(avatarMesh); }, 2000);
  // setTimeout(() => {avatarMesh.add(football)}, 2000);

  var wmill = new WMill(scene);
  var car = new Car(scene);
  var teapot = new Teapot(scene);
  var sofa = new Sofa(scene);

  window.onload = () => {
    window.addEventListener('keydown', function(event) {
        
      console.log("Key pressed:",event.key);
      var decrease_intensity = 0;

      if(football){
        // goal
        if((football.position.z<-21 && football.position.x<2 && football.position.x>-2)
        || (football.position.z>21 && football.position.x<2 && football.position.x>-2))
            restart();

        // behind goal outline
        else if(football.position.z>23 || football.position.z<-23)
            restart();
        
        // side outline
        else if(football.position.x>14 || football.position.x<-14)
              restart();
      }

      switch (true) {
        
        // change to third person view
        case event.key == 'l' || event.key == 'L':
          cam_flag = 0;
          cameraView();
        break;

        // change to first person view
        case event.key == 'p' || event.key == 'P':
          cam_flag = 1;
          cameraView();
        break;
        
        // change textures
        case event.key == 'm' || event.key == 'M':
          wmill.updateTexture();
          car.updateTexture();
          teapot.updateTexture();
          sofa.updateTexture();
        break;

        // rotate head left
        case event.key == 'q' || event.key == 'Q':
          lookAngle -= 0.1;
          cameraView();
        break;

        // rotate head right
        case event.key == 'w' || event.key == 'W':
          lookAngle += 0.1;
          cameraView();
        break;

        // left arrow key
        case event.key == 'ArrowLeft':
          
          // check if player is touching the ball for carry
          if(modelBallCollision() && carry_mode == 1)
          {
            football.position.x -= 0.2;
            football.rotation.x -= 90;

            // check if ball collides with an obstacle
            if (checkCollisions()){
              football.position.x += 1.2;
            }
          }

          // check if player is touching the ball for dribble
          else if(modelBallCollision() && dribble_mode == 1)
          {
            football.position.x -= 0.40;
            football.rotation.x -= 120;

            // check if ball collides with an obstacle
            if (checkCollisions()){
              football.position.x += 2.4;
            }
          }

          avatarMesh.position.x -= 0.2;

          cameraView();

        break;

        case event.key == 'ArrowRight':

          // check if player is touching the ball for carry
          if(modelBallCollision() && carry_mode == 1)
          {
            football.position.x += 0.2;
            football.rotation.x += 90;

            // check if ball collides with an obstacle
            if (checkCollisions()){
              football.position.x -= 1.2;
            }
          }
          
          // check if player is touching the ball for dribble
          else if(modelBallCollision() && dribble_mode == 1)
          {
            football.position.x += 0.40;
            football.rotation.x += 120;

            // check if ball collides with an obstacle
            if (checkCollisions()){
              football.position.x -= 2.4;
            }
          }

          avatarMesh.position.x += 0.2;

          cameraView();

        break;

        case event.key == 'ArrowUp':
          
          // check if player is touching the ball for carry
          if(modelBallCollision() && carry_mode == 1)
          {
            football.position.z -= 0.2;
            football.rotation.z -= 90;

            // check if ball collides with an obstacle
            if (checkCollisions()){
              football.position.z += 1.2;
            }
          }
          
          // check if player is touching the ball for dribble
          else if(modelBallCollision() && dribble_mode == 1)
          {
            football.position.z -= 0.40;
            football.rotation.z -= 120;

            // check if ball collides with an obstacle
            if (checkCollisions()){
              football.position.z += 2.4;
            }
          }
          
          // check if player is touching the ball for kick
          else if(modelBallCollision() && kick_mode == 1)
          {
            football.position.z -= 2.4;
            football.rotation.z -= 120;

            if(football.position.x>0)
              football.position.x -= 0.5;
            if(football.position.x<0)
              football.position.x += 0.5;

            // check if ball collides with an obstacle
            if (checkCollisions()){
              football.position.z += 4.80;

              if(football.position.x>0)
                football.position.x -= 1;
              if(football.position.x<0)
                football.position.x += 1;
            }
          }

          avatarMesh.position.z -= 0.2;

          cameraView();

        break;

        case event.key == 'ArrowDown':
          
          // check if player is touching the ball for carry
          if(modelBallCollision() && carry_mode == 1)
          {
            football.position.z += 0.2;
            football.rotation.z += 90;

            if (checkCollisions()){
              football.position.z -= 1.2;
            }
          }
          
          // check if player is touching the ball for carry
          else if(modelBallCollision() && dribble_mode == 1)
          {
            football.position.z += 0.40;
            football.rotation.z += 120;

            if (checkCollisions()){
              football.position.x -= 2.4;
            }
          }
          
          // check if player is touching the ball for carry
          else if(modelBallCollision() && kick_mode == 1)
          {
            football.position.z += 2.4;
            football.rotation.z += 120;

            if(football.position.x>0)
              football.position.x -= 0.5;
            if(football.position.x<0)
              football.position.x += 0.5;

            // check if ball collides with an obstacle
            if (checkCollisions()){
              football.position.z -= 4.80;

              if(football.position.x>0)
                football.position.x -= 1;
              if(football.position.x<0)
                football.position.x += 1;
            }
          }

          avatarMesh.position.z += 0.2;

          cameraView();

        break;

        // enter carry mode
        case event.key == 'C'|| event.key == 'c':
          carry_mode = 1;
          dribble_mode = 0;
          kick_mode = 0;
        break;

        // enter dribble mode
        case event.key == 'D' || event.key == 'd':
          dribble_mode = 1;
          carry_mode = 0;
          kick_mode = 0;
        break;

        // enter kick mode
        case event.key == 'K' || event.key == 'k':
          kick_mode = 1;
          carry_mode = 0;
          dribble_mode = 0;
        break;

        // changing intensity for light 1
        case event.key == '!':
          if(sun_light2.intensity<=10 && sun_light2.intensity>=0){
            if(decrease_intensity == 0)
              sun_light1.intensity += 1;
            else
              sun_light1.intensity -= 1;
          }
        break;

        // changing intensity for light 2
        case event.key == '@':
          if(sun_light2.intensity<=10 && sun_light2.intensity>=0)
          {
            if(decrease_intensity == 0)
              sun_light2.intensity += 1;
            else
              sun_light2.intensity -= 1;
          }
        break;

        // changing intensity for light 3
        case event.key == '#':
          if(sun_light3.intensity<=10 && sun_light3.intensity>=0)
          {
            if(decrease_intensity == 0)
              sun_light3.intensity += 1;
            else
              sun_light3.intensity -= 1;
          }
        break;

        // changing intensity for light 4
        case event.key == '$':
          if(sun_light4.intensity<=10 && sun_light4.intensity>=0)
          {
            if(decrease_intensity == 0)
              sun_light4.intensity += 1;
            else
              sun_light4.intensity -= 1;
          }
        break;

        // changing intensity for light 5
        case event.key == '%':
          if(spot_light.intensity<=10 && spot_light.intensity>=0)
          {
            if(decrease_intensity == 0)
              spot_light.intensity += 3;
            else
              spot_light.intensity -= 3;
          }
        break;

        // changing intensity for light 6
        case event.key == '^':
          if(spot_light2.intensity<=10 && spot_light2.intensity>=0)
          {
            if(decrease_intensity == 0)
              spot_light2.intensity += 3;
            else
              spot_light2.intensity -= 3;
          }
        break;

        // increasing intensity mode
        case event.key == '+':
            decrease_intensity = 0;
        break;

        // decreasing intensity mode
        case event.key == '-':
            decrease_intensity = 1;
        break;

        // turn on/off light 1
        case event.key == '1':
          if(l1_flag == 1){
            sun_light1.intensity = 0;
            l1_flag = 0;
          }
          else{
            sun_light1.intensity = 1;
            l1_flag = 1;
          }
        break;

        // turn on/off light 2
        case event.key == '2':
          if(l2_flag == 1){
            sun_light2.intensity = 0;
            l2_flag = 0;
          }
          else{
            sun_light2.intensity = 1;
            l2_flag = 1;
          }
        break;

        // turn on/off light 3
        case event.key == '3':
          if(l3_flag == 1){
            sun_light3.intensity = 0;
            l3_flag = 0;
          }
          else{
            sun_light3.intensity = 1;
            l3_flag = 1;
          }
        break;

        // turn on/off light 4
        case event.key == '4':
          if(l4_flag == 1){
            sun_light4.intensity = 0;
            l4_flag = 0;
          }
          else{
            sun_light4.intensity = 1;
            l4_flag = 1;
          }
        break;

        // turn on/off light 5
        case event.key == '5':
          if(spot_flag == 1){
            spot_light.intensity = 0;
            dir_light.intensity = 0;
            spot_flag = 0;
          }
          else{
            spot_light.intensity = 1;
            dir_light.intensity = 1;
            spot_flag = 1;
          }
        break;

        // turn on/off light 6
        case event.key == '6':
          if(spot_flag2 == 1){
            spot_light2.intensity = 0;
            spot_flag2 = 0;
          }
          else{
            spot_light2.intensity = 1;
            spot_flag2 = 1;
          }
        break;
      }
    });
  }

  // toggle camera view
  function cameraView(){
    
    // third person view
    if (cam_flag == 0){
      camera.position.set(avatarMesh.position.x, avatarMesh.position.y+2, avatarMesh.position.z+2);
      camera.lookAt(avatarMesh.position.x, 0.5, avatarMesh.position.z);
    }

    // first person view
    else{
      camera.position.set(avatarMesh.position.x, avatarMesh.position.y+1.5, avatarMesh.position.z-0.3);
      camera.lookAt(avatarMesh.position.x, 1.5, avatarMesh.position.z-1);
      camera.rotation.y -= lookAngle;
    }
  }

  function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
  }
  
  // checking if avatar intersects ball
  function modelBallCollision(){
    if(football) {
      if(football.position.x > avatarMesh.position.x - 0.3 && football.position.x < avatarMesh.position.x + 0.3
        && football.position.z > avatarMesh.position.z - 0.3 && football.position.z < avatarMesh.position.z + 0.3) {
          return true;
      }
    }
  }

  // check collisions of ball with obstacles
  const checkCollisions = function() {
    
    let obstacleArray;
    if(wmill && car && teapot && sofa) {
      obstacleArray = [wmill , car, teapot, sofa];
    }

    for(let i = 0;i < obstacleArray.length;i++) {
      const obstaclebbox = new THREE.Box3().setFromObject(obstacleArray[i].container);
      const footballBbox = new THREE.Box3().setFromObject(football);
      
      const intersection = footballBbox.intersectsBox(obstaclebbox);
      if(intersection === true) {
        return true;
      }
    }
    return false;
  }

  // restart if goal scored or ball goes out of bounds
  function restart() {
    football.position.x = 0;
    football.position.y = 0.3;
    football.position.z = 0;

    avatarMesh.position.x = 0;
    avatarMesh.position.y = 0;
    avatarMesh.position.z = 2.5;

    // carry_mode = 1;
    // dribble_mode = 0;
    // kick_mode = 0;
  }

  // render scene
  function render(time) {

    if(football && spot_light)
    {
      spot_light.position.set(5, 2, 0);
      spot_light.target = football;
      spot_light2.position.set(football.position.x, football.position.y + 1, football.position.z);
      spot_light2.target = football;
    }

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    // player 2 moves towards the ball
    if(avatarMesh2 && (avatarMesh2.position.x!=football.position.x-0.5)){
      var delx = football.position.x -0.5 - avatarMesh2.position.x;
      delx = delx/100;
      avatarMesh2.position.x += delx;
    }
    if(avatarMesh2 && (avatarMesh2.position.z!=football.position.z-0.5)){
      var delz = football.position.z -0.5 - avatarMesh2.position.z;
      delz = delz/100;
      avatarMesh2.position.z += delz;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
