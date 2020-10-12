                GLSL is not JavaScript

1. opengl works with triangles of three points.
2. these points are called vertices.
3. these verices can be in a 3D space
which we have to project on a 2D screen.    
4. there's two ways of rendering a triangle
    + position the vertices
    + color the pixels
5. GLSL  in two parts 
    + vertex shader: it moves vertices from model coordinate to (our screen) clip space coordinates. vertex shader is called for every vertex in the model 
    + fragment Shader:  it colors the model pixels in RGBA() fromate.

    + Z-buffering: holds the distance of a pixel from the camera. It calculates overlaping color. We dont need to concern about it Renderer handels this for us. We just move the vertices and color the pixels.

                    Variable in GLSL: GLSL is called strongly "typed"

1. int num = 1;
2. float num1 = 2.4;
3. bool isFacing = false;
GLSL is strongly strict about variable combining.
4. Wrong!!! 
            int myVar = 12.4 * 4;

            correct: int myVar = int(12.4) * 4;
5. GLSL contains VEC class
    vec2 v = vec2(0.5);  will create two values in v. we can access them by
    v.x = 0.5 and v.y = 0.5;
    
     w = v * 2.0;
     // now w.x = 1.0 and w.y = 1.0;
    
    where in JS we will have to create our own code for that. 

    vec3 contains three values and vec4 contains 4 values.
     vec3 v = vec3(0.5);  // access with v.x, v.y, v.z
     vec4 t = vec4(20.3); // access with t.x, t.y, t.z, t.w

6. vec variables stores float values. if we want to use integer values we need to use
    ivec2 i1 = ivec2(34);
    ivec3 i2 = ivec3(34);
    ivec4 i3 = ivec4(34);

7. conditional if statement is same as javascript.

    if(condition){
        // somthing will happen
    } else {
        // something else will happen
    }

8. for loop is different
JS: 
    let count = 10;
    for (let i=0; i<count; i++){
        count += 2;
    }

GLSL:

    const int count = 10;  // const qualifier must be used.
    for(let i=0;i<count; i++){
        count+=2;
    }

9. Functions
JS:  we need to write function keyword it goes exactly like this

    function createRect(position, rect){
        let result = false;
            // do sometiong ade return result value
            // change result to true
        return result; 
    }

    in js if we create another function with same name but different input agruments first function will be supersid. first function will not work.
    
      function createRect(position,width, height,x,y, rect){
        let result = false;
            // do sometiong ade return result value
            // change result to true
        return result; 
    } // now previous function will not work any more

GLSL: but we start with return type to write function in glsl also we provide 
input type. remember glsl is strongly typed language.

    bool createRect(vec2 position, vec4 rect){  // bool is return type, vec2 and vec4 are input type
        bool result = false;
            // do sometiong ade return result value
            // change result to true
        return result;
    }

but in GLSL we can create complete different function with same name but different input types both function will work depending on how many parameters are provided during function is called. 
 
    bool createRect(vec2 position, vec4 rect, float x, float y, float width, float height){  // bool is return type, vec2 and vec4 are input type
            bool result = false;
                // do sometiong ade return result value
                // change result to true
            return result;
    } // both are different functions, its called function overloading

10. to create a scene on page we need
    a. const scene = new THREE.Scene();
    b. cosnt camera = new THREE.OrthographicCamera(sixparameters: left,right,top,bottom,near,far);
        or const camera = new THREE.PrespectiveCamera(four parameters: FieldOfView(fov),aspectRatio,near,  far);
    c. const renderer = new THREE.WebGLRenderer();
    d. now we need to set size of the renderer

        renderer.setSize(window.innerWidth,window.innerHeight);

    e.  Now we need to add domElements. When renderer is initialized it creates domElemnts which can hold 2D and 3D graphics.  
    
        document.getElementsByID('webgl').appendChild(renderer.domElemnts);
    f. now we  need to add camera to the scene that we created. 

        scene.add(camera);

    g. we can now also add geometries to our scene.
        const planeGeometry = new THREE.PlaneGeometry(2,2); // width,height
        const PlaneShaderMaterial = new THREE.ShaderMaterial();
        cosnt plane = new THREE.Mesh(planeGeometry, PlaneShaderMaterial);

        // note if we do not pass any shader material three.js weill add red color to the material.
    
        new plane is created we have to add it on the secne.



11. Each Shader should have two parts. vertex shader and fragment shader. 
    Each of part MUST include a void main(){...} function.
    main function is always void type because it does not return  value.
 
   for vertexShader we write: 

   const vxShader = `
   void main(){
       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
   }
   `
    gl_Position is the position of the vertex. it has 4 values and type is vec4().
    x,y,x and w. w is set to 1.0
     
     _      _    _   _   
     |a b a b|   |p.x |
     |c d c e|   |p.y |
     |e f s t| * |p.z |
     |g h r s|   | 1.0|
     |i j q y|   |_  _|
     |_     _|   

     gl_Position must be set for every vertex in the mesh.

     now we need to pass the vxShader material to our code.    
