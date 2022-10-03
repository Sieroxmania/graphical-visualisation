window.onload = function () {
  var canvas = document.getElementById('triangleFigure');
  var gl = canvas.getContext('webgl');


  /*======== Defining and storing the geometry ===========*/

  var vertices = new Float32Array([
    -0.5,0.5,0.0,
    0.0,1.25,0.0,
    0.5,0.5,0.0,
   1.25,0.0,0.0,
    0.5,-0.5,0.0,
    0.0,-1.25,0.0,
    -0.5,-0.5,0.0,
    -1.25,0.0,0.0
  ]);

  
  var indices = new Uint16Array([
 0,1,2,0,7,6,4,5,6,4,3,2,4,6,0,4,2,0
  ]);

  var colors = new Float32Array([
0,0,1, 1,0,0, 0,1,0, 
1,0,1, 0,0,1,
1,0,0, 0,1,0, 
1,0,1,


  ]);

  // Create an empty buffer object to store vertex buffer
  var vertex_buffer = gl.createBuffer();
  // Bind appropriate array buffer to it
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  // Pass the vertex data to the buffer
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // Unbind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, null);


  // Create an empty buffer object to store Index buffer
  var Index_Buffer = gl.createBuffer();
  // Bind appropriate array buffer to it
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
  // Pass the vertex data to the buffer
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  // Unbind the buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


   // Create an empty buffer object and store color data
   var color_buffer = gl.createBuffer ();
   gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
   gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);


  /*================ Shaders ====================*/

  // Vertex shader source code
  var vertCode = 'attribute vec3 coordinates;'+
  'attribute vec3 color;'+
  'varying vec3 vColor;'+
  'void main(void) {' +
     ' gl_Position = vec4(coordinates, 1.5);' +
     'vColor = color;'+
  '}';
  // Create a vertex shader object
  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  // Attach vertex shader source code
  gl.shaderSource(vertShader, vertCode);
  // Compile the vertex shader
  gl.compileShader(vertShader);



  //fragment shader source code
  var fragCode = 'precision mediump float;'+
  'varying vec3 vColor;'+
  'void main(void) {'+
     'gl_FragColor = vec4(vColor, 1.);'+
  '}';

    
  // Create fragment shader object
  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  // Attach fragment shader source code
  gl.shaderSource(fragShader, fragCode);
  // Compile the fragmentt shader
  gl.compileShader(fragShader);



  // Create a shader program object to store
  // the combined shader program
  var shaderProgram = gl.createProgram();
  // Attach a vertex shader
  gl.attachShader(shaderProgram, vertShader);
  // Attach a fragment shader
  gl.attachShader(shaderProgram, fragShader);
  // Link both the programs
  gl.linkProgram(shaderProgram);
  // Use the combined shader program object
  gl.useProgram(shaderProgram);




  /*======= Associating shaders to buffer objects =======*/

  // Bind vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  // Bind index buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
  // Get the attribute location
  var coord = gl.getAttribLocation(shaderProgram, "coordinates");
  // Point an attribute to the currently bound VBO
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
  // Enable the attribute
  gl.enableVertexAttribArray(coord);

  //bind the color buffer
         gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
         // get the attribute location
         var color = gl.getAttribLocation(shaderProgram, "color");
         // point attribute to the volor buffer object
         gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;
         // enable the color attribute
         gl.enableVertexAttribArray(color);

  /*=========Drawing the triangle===========*/

  // Clear the canvas
  gl.clearColor(0,0,0,0);

  // Enable the depth test
  gl.enable(gl.DEPTH_TEST);

  // Clear the color buffer bit
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);

  // Draw the triangle
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

