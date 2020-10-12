function init() {

    const vtxShader = `
    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
    
    `





    window.addEventListener('resize', windowResized, false);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    // orthigraphic camera's near and far things looks same size, this kind of camera takes 6 parameters,
    //   left,right, top,bottom, near far
    // const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,10);
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color("#600022"));
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.add(camera);

    const plnGeometry = new THREE.PlaneGeometry(2, 3);
    const plnShaderMaterial = new THREE.ShaderMaterial();
    const PlaneObject = new THREE.Mesh(plnGeometry,plnShaderMaterial); 
    scene.add(PlaneObject);

    camera.position.z = 1;



    document.getElementById("webgls").appendChild(renderer.domElement);
    


    animate();
    // windowResized();

    // animate function
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function windowResized() {
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.updateProjectionMatrix();


    }
}