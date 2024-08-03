import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//new Date();
// getMonth();
//getDay();
// getTime();
//getFullyear();
let previousActive="Digital";


window.changeTab = function changeTab(e) {
    const activeClass = e.getAttribute('value');
    document.querySelectorAll(`.${previousActive}`)[0].classList.remove('active');
    const setClassActive = document.querySelectorAll(`.${activeClass}`)[0];
    setClassActive.classList.add('active');
    previousActive=activeClass;
}

const Hour = document.querySelectorAll('#hour');
const Minute = document.querySelectorAll('#minute');
const hoursHand = document.getElementsByClassName('Hours')[0];
const minutesHand = document.getElementsByClassName('Minutes')[0];
const secHand = document.getElementsByClassName('Seconds')[0];

function setTime() {
    const dateTime = new Date();
    const Minutes = dateTime.getMinutes();
    const Hours = dateTime.getHours();
    const Seconds = dateTime.getSeconds();

    let currentHours = ((dateTime.getHours() % 12) || 12);
    let currentMinutes = dateTime.getMinutes() % 60 || "00";
    // update hours
    if(parseInt(Hour[0].innerText + Hour[1].innerText) != currentHours) {
      currentHours= (currentHours < 10 ? `0${currentHours}`:`${currentHours}`);
      currentHours.toString().split('').map((v,i) => {
       if(Hour[i].innerText !== v) {
        Hour[i].innerText = v;
        Hour[i].style.animation = "rotateCard 1s ";
        const timeOut = setTimeout(() => {
            Hour[i].style.cssText = "";
            clearTimeout(timeOut);
        },2000)
         
       }
    }
        ); 

    }

    if(parseInt(Minute[0].innerText + Minute[1].innerText) != currentMinutes) {
        currentMinutes= (currentMinutes < 10 ? `0${currentMinutes}`:`${currentMinutes}`);
        currentMinutes.toString().split('').map((v,i) => {
            if(Minute[i].innerText !== v) {
            Minute[i].innerText=v;
            Minute[i].style.animation="rotateCard 1s ";
           const timeOut= setTimeout(() => {
            Minute[i].style.cssText ="";
            minutesHand.style.setProperty('--rotate',30);
            clearTimeout(timeOut);
           },2000);

            }
            }
        );
    }
    
    const secRatio = Seconds*6;
    const minRatio = Minutes*6;
    const hourRatio = Hours*30;
    rotatehand(hoursHand,hourRatio);
    rotatehand(minutesHand,minRatio);
    rotatehand(secHand,secRatio);
     
}

function rotatehand(element,rotateDegree) {
    element.style.setProperty('--rotate',rotateDegree);

}

setInterval(setTime,1000);
setTime();

// 360%60 => 6
// so we have to do 6*(Minutes/seconds) 
// for Hours we can use 360%12 => 30 we can use 30*Hours


// app.js
let sceneEarth;
let camera;
let renderer;
let controls;
let earth;


function init() {

    // initialize scene 
    sceneEarth = new THREE.Scene();
    

    //create sphere shape and wrap shpere with earth image
   const geometry = new THREE.SphereGeometry(10, 64, 64);
    const texture = new THREE.TextureLoader().load('./earth_texture.jpeg');
    //const material = new THREE.MeshBasicMaterial({ map: texture });
    const verticalGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -5, 0), new THREE.Vector3(0, 5, 0)]);
    const verticalMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const verticalLine = new THREE.Line(verticalGeometry, verticalMaterial);
    sceneEarth.add(verticalLine);

    // Create horizontal line
    const horizontalGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0)]);
    const horizontalMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const horizontalLine = new THREE.Line(horizontalGeometry, horizontalMaterial);
    sceneEarth.add(horizontalLine);
    //earth = new THREE.Mesh(geometry, material);
    sceneEarth.background = new THREE.Color('#FFFFFF');
    //sceneEarth.add(earth);

    // set-up camera perspective 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 3, 2000);
    camera.position.set(10,10,10);
    sceneEarth.add(camera);

    // Add a light source
    const light = new THREE.PointLight(0xFFFFFF,4,50);
    light.position.set(50, 50, 50);
    sceneEarth.add(light);


    const Globe = document.querySelector('.Earth');
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    document.body.appendChild(renderer.domElement);

     controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZOOM = false;
    //  controls.minZoom = 5;
    //  controls.maxZOOM = 10;
    //  controls.maxTargetRadius = 10;
    //  controls.minTargetRaius = 5;
     //controls.minDistance = 2;
    // controls.maxDistance = 1000;

    // Create the Earth globe

    // Add latitude and longitude lines
    //addLatitudeLongitudeLines();

    // Handle window resize
   // window.addEventListener('resize', onWindowResize, false);


    // Handle mouse click
   // document.addEventListener('click', onMouseClick, false);
}

function addLatitudeLongitudeLines() {
    const lineMaterial = new THREE.LineBasicMaterial({ color: '#000000' });

    // Latitude lines
    for (let lat = -90; lat <= 90; lat += 30) {
        const latLineGeometry = new THREE.BufferGeometry();
        const latLinePositions = [];
    
        for (let lon = -180; lon <= 180; lon += 5) {
          const vertex = getVertex(lat, lon);
          latLinePositions.push(vertex.x, vertex.y, vertex.z);
        }
    
        latLineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(latLinePositions), 3));
        const latLine = new THREE.Line(latLineGeometry, lineMaterial);
        camera.position.set(10,10,10);
        sceneEarth.add(latLine);
      }
    
      // Longitude lines
      for (let lon = -180; lon <= 180; lon += 30) {
        const lonLineGeometry = new THREE.BufferGeometry();
        const lonLinePositions = [];
    
        for (let lat = -90; lat <= 90; lat += 5) {
          const vertex = getVertex(lat, lon);
          lonLinePositions.push(vertex.x, vertex.y, vertex.z);
        }
    
        lonLineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lonLinePositions), 3));
        const lonLine = new THREE.Line(lonLineGeometry, lineMaterial);
        sceneEarth.add(lonLine);
      }

      renderer.render(sceneEarth, camera);
    
}

function getVertex(lat, lon) {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon + 180);
    const x = Math.sin(phi) * Math.cos(theta) * 2;
    const y = Math.cos(phi) * 2;
    const z = Math.sin(phi) * Math.sin(theta) * 2;

    return new THREE.Vector3(x, y, z);
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.clear();
    renderer.setClearColor(0x000000);
    renderer.render(sceneEarth, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseClick(event) {
    event.preventDefault();

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(earth);

    if (intersects.length > 0) {
        const latLon = getLatLonFromIntersection(intersects[0].point);
        console.log('Clicked at Latitude:', latLon.lat, 'Longitude:', latLon.lon);
        const longitude = parseFloat(latLon.lon);
        const UTCtimestamp = longitude*4;
        console.log(UTCtimestamp);
    }
}

function getLatLonFromIntersection(point) {
    const phi = Math.acos(point.y / 2);
    const theta = Math.atan2(point.z, point.x);
    const lat = 90 - THREE.MathUtils.radToDeg(phi);
    const lon = THREE.MathUtils.radToDeg(theta) - 180;

    return { lat, lon };
}

init();
animate();