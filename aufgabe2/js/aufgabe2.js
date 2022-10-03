window.onload = function () {
  var canvas = document.getElementById('lineFigure');
  var gl = canvas.getContext('webgl');

  /*======== Defining and storing the geometry ===========*/

  var vertices = new Float32Array([
    //Symbol
    -0.5, 0,
    0, 1,
    0.5, 0,
    1, -1,
    0, -1,
    0.5, 0,
    -0.5, 0,
    -1, -1,
    0, -1,
    -0.5, 0,
    //Shield
    0, 1,
    0, 3.5,
    1.25, 3,
    2, 2,
    0.5, 0,
    2, 2,
    2.5, 0,
    2, -2,
    1, -1,
    2, -2,
    1.25, -3,
    0, -3.5,
    0, -1,
    0, -3.5,
    -1.25, -3,
    -2, -2,
    -1, -1,
    -2, -2,
    -2.5, 0,
    -2, 2,
    -0.5, 0,
    -2, 2,
    -1.25, 3,
    0, 3.5,
    0, 1,
    -0.5, 0
  ]);

  // Create an empty buffer object to store vertex buffer
  var vertex_buffer = gl.createBuffer();
  // Bind appropriate array buffer to it
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  // Pass the vertex data to the buffer
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);


  /*================ Shaders ====================*/

  // Vertex shader source code
  var vertCode =
    'attribute vec2 coordinates;' +

    'void main(void) {' +
    ' gl_Position = vec4(coordinates * 0.85, 0, 3);' +
    '}';
  // Create a vertex shader object
  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  // Attach vertex shader source code
  gl.shaderSource(vertShader, vertCode);
  // Compile the vertex shader
  gl.compileShader(vertShader);


  //fragment shader source code - Color
  var fragCode =
    'void main(void) {' +
    ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
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

  var coord = gl.getAttribLocation(shaderProgram, "coordinates");
  // Point an attribute to the currently bound VBO
  gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
  // Enable the attribute
  gl.enableVertexAttribArray(coord);


  /*=========Drawing the Lines===========*/

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);

  // Enable the depth test
  gl.enable(gl.DEPTH_TEST);

  // Clear the color buffer bit
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);

  // Draw the triangle
  gl.drawArrays(gl.LINE_LOOP, 0, 35);
}




