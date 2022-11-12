function switchData(){
    window.location='aufgabe4.html';
}

window.onload = function () {
  var canvas = document.getElementById('parameterizedFigure');
  var gl = canvas.getContext('webgl');

 // Pipeline setup.
 gl.clearColor(0.063, 0.133, 0.22, 1);          
	
 // Backface culling.
 gl.frontFace(gl.CCW);
 gl.enable(gl.CULL_FACE);
 gl.cullFace(gl.BACK);
 gl.enable(gl.DEPTH_TEST);
 gl.depthFunc(gl.LEQUAL);

 // Polygon offset of rastered Fragments.
 gl.enable(gl.POLYGON_OFFSET_FILL);
 gl.polygonOffset(1.0, 1.0);

 // Compile vertex shader.
 var vsSource = '' +
     'attribute vec3 pos;' +
     'attribute vec4 col;' +
     'varying vec4 color;' +
     'void main(){' + 'color = vec4(col.x, col.y, col.z, 1);' +
     'gl_Position = vec4(pos, 2.5);' +
     '}';
 var vs = gl.createShader(gl.VERTEX_SHADER);
 gl.shaderSource(vs, vsSource);
 gl.compileShader(vs);

 // Compile fragment shader.
 var fsSource = 'precision mediump float;' +
     'varying vec4 color;' +
     'void main() {' +
     'gl_FragColor = color;' +
     '}';
 var fs = gl.createShader(gl.FRAGMENT_SHADER);
 gl.shaderSource(fs, fsSource);
 gl.compileShader(fs);

 // Link shader together into a program.
 var prog = gl.createProgram();
 gl.attachShader(prog, vs);
 gl.attachShader(prog, fs);
 gl.bindAttribLocation(prog, 0, "pos");
 gl.linkProgram(prog);
 gl.useProgram(prog);

 // Vertex data Shape.
 // Positions, Index data.
 var verticesShape, normalsShape, indicesLinesShape, indicesTrisShape;

 // Fill the data arrays.
 createVertexDataShape();

 // Setup position vertex buffer object.
 var vboPosShape = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, vboPosShape);
 gl.bufferData(gl.ARRAY_BUFFER, verticesShape, gl.STATIC_DRAW);

 // Bind vertex buffer to attribute variable.
 var posAttribShape = gl.getAttribLocation(prog, 'pos');
 gl.vertexAttribPointer(posAttribShape, 3, gl.FLOAT, false, 0, 0);
 gl.enableVertexAttribArray(posAttribShape);
 
 // Setup normal vertex buffer object.
 var vboNormal = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, vboNormal);
 gl.bufferData(gl.ARRAY_BUFFER,
 normalsShape, gl.STATIC_DRAW);

 // Bind buffer to attribute variable.
 var colAttrib = gl.getAttribLocation(prog, 'col');
 gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
 gl.enableVertexAttribArray(colAttrib);

 // Setup lines index buffer object.
 var iboLinesShape = gl.createBuffer();
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLinesShape);
 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesLinesShape, gl.STATIC_DRAW);
 iboLinesShape.numberOfElements = indicesLinesShape.length;
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

 // Setup tris index buffer object.
 var iboTrisShape = gl.createBuffer();
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTrisShape);
 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesTrisShape, gl.STATIC_DRAW);
 iboTrisShape.numberOfElements = indicesTrisShape.length;
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

 // Clear framebuffer and render primitives.
 gl.clear(gl.COLOR_BUFFER_BIT);
 gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

 // START Aufgabe 4_2
 // Setup rendering tris.
 gl.disableVertexAttribArray(colAttrib);
 gl.vertexAttrib4f(colAttrib,0.769, 0.659, 0.024,1)
 
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTrisShape);
 gl.drawElements(gl.TRIANGLES, iboTrisShape.numberOfElements, gl.UNSIGNED_SHORT, 0);

 // Setup rendering lines.
 gl.disableVertexAttribArray(colAttrib);
 gl.vertexAttrib4f(colAttrib, 0.769, 0.419, 0.024,1)
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLinesShape);
 gl.drawElements(gl.LINES, iboLinesShape.numberOfElements, gl.UNSIGNED_SHORT, 0);
 
 //GOBLET to BONBON
function createVertexDataShape() {     
         var n = 50; 
         var m = 40; 
         var du = Math.PI / n; 
         var dv = 2*Math.PI / m;
        
         // Positions.
         verticesShape = new Float32Array(3 * (n + 1) * (m + 1)); 
         // Index data.
         indicesLinesShape = new Uint16Array(2 * 2 * n * m);
         indicesTrisShape = new Uint16Array(3 * 2 * n * m);
         // Normals.
         normalsShape = new Float32Array(3 * (n+1) * (m+1));

         // Counter for entries in index array.
         var iLines = 0;
         var iTris = 0;

         // Loop angle t.
         for (var i = 0, u = 0; i <= n; i++, u += du) {
             // Loop height u.
             for (var j = 0, v = 0; j <= m; j++, v += dv) {

                 var iVertex = i * (m + 1) + j

                 var r = Math.cos(u);
                 var y = 1.2*Math.cos(u)*Math.cos(2*v);
                 var z = Math.sin(u)*Math.cos(2*v);
                 var x = -1.75*Math.sin(v)*r;
              
                 // Set vertex positions.
                 verticesShape[iVertex * 3] = x;
                 verticesShape[iVertex * 3 + 1] = y;
                 verticesShape[iVertex * 3 + 2] = z;
                 
                 // Calc and set normals.
                 var vertexLength = Math.sqrt(x*x+y*y+z*z);
                 normalsShape[iVertex * 3] = x/vertexLength;
                 normalsShape[iVertex * 3 + 2] = y/vertexLength;
                 normalsShape[iVertex * 3 + 2] = z/vertexLength;

                 // Set index.
                 // Line on beam.
                 if (j > 0 && i > 0) {
                     indicesLinesShape[iLines++] = iVertex - 1;
                     indicesLinesShape[iLines++] = iVertex;
                 }
                 // Line on ring.
                 if (j > 0 && i > 0) {
                     indicesLinesShape[iLines++] = iVertex - (m + 1);
                     indicesLinesShape[iLines++] = iVertex;
                 }

                 // Set index.
                 // Two Triangles.
                 if (j > 0 && i > 0) {
                     indicesTrisShape[iTris++] = iVertex;
                     indicesTrisShape[iTris++] = iVertex - 1;
                     indicesTrisShape[iTris++] = iVertex - (m + 1);

                     indicesTrisShape[iTris++] = iVertex - 1;
                     indicesTrisShape[iTris++] = iVertex - (m + 1) - 1;
                     indicesTrisShape[iTris++] = iVertex - (m + 1);
                 }
             }
         }
 }
 // END Aufgabe 4_2
};
