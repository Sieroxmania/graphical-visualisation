//Soruce http://blog.andreaskahler.com/2009/06/creating-icosphere-mesh-in-code.html
// START Aufgabe 5
var icosphere = (function() {

    function createVertexData() {
        let recursionLevel = document.getElementById('recursionDepth').value;

        // Positions.
        var vertices = [];
        // Normals.
        let normals = [];
        // Index data.
        let indicesLines = [];
        let indicesTris = [];
      
        // create 12 vertices of a icosahedron 
        createIcoVertices(vertices, normals);

        // create 20 triangles of the icosahedron
        createIcoTriangles(indicesTris, indicesLines);

        // refine triangles
        for (let i = 0; i < recursionLevel; i++) {
            var indicesTris2 = [];
            indicesLines = [];
  
            for (let j = 0; j < indicesTris.length; j += 3) {
                // replace triangle by 4 triangles
                let a = getMiddlePoint(indicesTris[j + 0], indicesTris[j + 1], vertices, normals),
                    b = getMiddlePoint(indicesTris[j + 1], indicesTris[j + 2], vertices, normals),
                    c = getMiddlePoint(indicesTris[j + 2], indicesTris[j + 0], vertices, normals);

                addIndicesTris(indicesTris2, indicesLines, vec3.fromValues(indicesTris[j+0],  a, c));
                addIndicesTris(indicesTris2, indicesLines, vec3.fromValues(indicesTris[j+1],  b, a));
                addIndicesTris(indicesTris2, indicesLines, vec3.fromValues(indicesTris[j+2],  c, b));
                addIndicesTris(indicesTris2, indicesLines, vec3.fromValues(a, b, c));
                
            }
            indicesTris = indicesTris2;
        }
        this.vertices = Float32Array.from(vertices);
        this.normals = Float32Array.from(normals);
        this.indicesLines = Uint16Array.from(indicesLines);
        this.indicesTris = Uint16Array.from(indicesTris);
    }

    function createIcoVertices(vertices, normals) {
        let t = (1.0 + Math.sqrt(5.0)) / 2.0;

        addVertex(vec3.fromValues(-1,  t,  0), vertices, normals);
        addVertex(vec3.fromValues( 1,  t,  0), vertices, normals);
        addVertex(vec3.fromValues(-1, -t,  0), vertices, normals);
        addVertex(vec3.fromValues( 1, -t,  0), vertices, normals);
      
        addVertex(vec3.fromValues( 0, -1,  t), vertices, normals);
        addVertex(vec3.fromValues( 0,  1,  t), vertices, normals);
        addVertex(vec3.fromValues( 0, -1, -t), vertices, normals);
        addVertex(vec3.fromValues( 0,  1, -t), vertices, normals);
      
        addVertex(vec3.fromValues( t,  0, -1), vertices, normals);
        addVertex(vec3.fromValues( t,  0,  1), vertices, normals);
        addVertex(vec3.fromValues(-t,  0, -1), vertices, normals);
        addVertex(vec3.fromValues(-t,  0,  1), vertices, normals);
    }

    
    function createIcoTriangles(indicesTris, indicesLines) {
        // 5 faces around point 0
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(0, 11, 5));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(0, 5, 1));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(0, 1, 7));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(0, 7, 10));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(0, 10, 11));

        // 5 adjacent faces
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(1, 5, 9));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(5, 11, 4));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(11, 10, 2));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(10, 7, 6));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(7, 1, 8));
          
        // 5 faces around point 3
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(3, 9, 4));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(3, 4, 2));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(3, 2, 6));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(3, 6, 8));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(3, 8, 9));

        // 5 adjacent faces
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(4, 9, 5));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(2, 4, 11));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(6, 2, 10));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(8, 6, 7));
        addIndicesTris(indicesTris, indicesLines, vec3.fromValues(9, 8, 1));
    }

    // return index of point in the middle of a and b
    function getMiddlePoint(a, b, vertices, normals) {
        // Calculate coordinates of mid.
        let x = (vertices[3 * a + 0] + vertices[3 * b + 0]) / 2.0;
        let y = (vertices[3 * a + 1] + vertices[3 * b + 1]) / 2.0;
        let z = (vertices[3 * a + 2] + vertices[3 * b + 2]) / 2.0;

        // Return index
        return addVertex(vec3.fromValues(x, y, z), vertices, normals);
    }

    function addIndicesTris(_tris, _lines, _trisVertices) {
        // Add index data.
        _tris.push(
            _trisVertices[0],
            _trisVertices[1],
            _trisVertices[2]
        );
        _lines.push(
            _trisVertices[0],
            _trisVertices[1],
            _trisVertices[1],
            _trisVertices[2],
            _trisVertices[2],
            _trisVertices[0]
        );
    }

    // add vertex to mesh, fix position to be on unit sphere, return index
    function addVertex(_vertex, vertices, normals) {	
        let vertexLength = Math.sqrt(
            Math.pow(_vertex[0], 2)+
            Math.pow(_vertex[1], 2)+
            Math.pow(_vertex[2], 2));

        let x = _vertex[0] / vertexLength,
            y = _vertex[1] / vertexLength,
            z = _vertex[2] / vertexLength;

        // Set vertex positions for x, y, z
        vertices.push(x, y, z);
        // Set normals
        normals.push(x, y, z);
        //return index of current vertices
        return (vertices.length / 3) - 1;
    }

	return {
		createVertexData : createVertexData
	}

}());
// END Aufgabe 5