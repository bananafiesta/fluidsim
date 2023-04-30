import * as THREE from 'three';

/** 
 *  Takes in a texture and jacobi's it idk what jacobi is
 */
export default class Jacobi {
    constructor(res) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
        this.gridRes = res;

        this.uniforms = {
            alpha: {type: 'f', value: null},   // alpha
            rbeta: {type: 'f', value: null},  // reciprocal beta
            x: {type: 't', value: null},      // x vector (Ax = b)
            b: {type: 't', value: null},      // b vector (Ax = b)

            gridSize: {type: 'v2', value: this.gridRes},
            gridScale: {type: 'f', value: 1.0},
          }

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: document.getElementById( 'jacobiFrag' ).innerHTML,
            depthWrite: false,
            depthTest: false,
            blending: THREE.NoBlending
        })

        this.geometry = new THREE.PlaneGeometry( 2, 2 );
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
    }

    jacobi_texture(renderer, alpha, rbeta, x, b, output) {
        this.renderer = renderer;
        this.uniforms.alpha = alpha;
        this.uniforms.rbeta = rbeta;
        this.uniforms.x = x;
        this.uniforms.b = b;
  
        this.renderer.setRenderTarget(output);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setRenderTarget(null);
    }
}