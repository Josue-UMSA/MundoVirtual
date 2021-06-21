var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var ambientLight, light;


function init() {
	var canvasWidth = window.innerWidth * 0.9;
	var canvasHeight = window.innerHeight * 0.9;

	// CAMERA

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 80000 );
	camera.position.set(-5,5,15);
	camera.lookAt(0,0,0);

	// LIGHTS

	light = new THREE.DirectionalLight( 0xFFFFFF, 0.7 );
	light.position.set( 1, 1, 1 );
	light.target.position.set(0, 0, 0);
	light.target.updateMatrixWorld()

	var ambientLight = new THREE.AmbientLight( 0x111111 );

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( canvasWidth, canvasHeight );
	renderer.setClearColor( 0xAAAAAA, 1.0 );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	// Add to DOM
	var container = document.getElementById('container');
	container.appendChild( renderer.domElement );

	// CONTROLS
	cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
	cameraControls.target.set(0, 0, 0);

	// OBJECT


	scene = new THREE.Scene();
	scene.add( light );
	scene.add( ambientLight );

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
		escritorio(0.1+j/1.5,-1.1,-3+1.5*i,0);
		}
	}

	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 4; j++) {
		escritorio(3+j/1.5,-1.1,-3.5+1.5*i,0);
		}
	}
	
	//Laboratorio PGI
	pizarras(2.8,0,-4.35);
	pared(3,7.5,-0.1,0,-0.7,0);
	pared(1,1.4,-0.1,1,3.7,0);
	pared(2,0.45,-0.1,-0.5,4.175,0);
	pared(3,5.8,2.8,0,4.4,Math.PI/2);
	pared(3,8.8,5.7,0,0,0);
	pared(3,5.8,2.8,0,-4.4,Math.PI/2);
	suelo(5.8,8.8,2.8,-1.5,0,3,2);
	puerta(-0.2,-0.5,3.6,Math.PI/4);
	marco(-0.5,-0.5,3.5,Math.PI/2);

	//Pasillo
	suelo(5,15,-2.6,-1.5,-3.1,3,1);
	suelo(20,5,4.9,-1.5,-13.1,1,4);

	//Dirección de carrera
	puerta(12,-0.5,-15.63,0);
	marco(12,-0.5,-15.63,0);
	parket(4,8,12.9,-1.5,-19.59,4,2);


	parket(4,4,8.9,-1.5,-17.59,2,2)
	puerta(10.15,-0.5,-17.1,Math.PI+Math.PI/4);
	marco(10.45,-0.5,-17,Math.PI/2);

	pared(3,8,14.9,0,-19.59,0);
	pared(3,4,6.9,0,-17.59,0);
	pared(3,4,10.9,0,-21.59,0);

	pared(3,4,12.9,0,-23.59,Math.PI/2);
	pared(3,4,8.9,0,-19.59,Math.PI/2);
	pared(3,4,8.9,0,-15.59,Math.PI/2);

	pared(3,1.1,11.45,0,-15.59,Math.PI/2);
	pared(3,2,13.9,0,-15.59,Math.PI/2);
	pared(1,0.9,12.45,1,-15.59,Math.PI/2);

	pared(3,0.9,11.4,0,-20.59,Math.PI/2);
	pared(3,1.7,14,0,-20.59,Math.PI/2);
	pared(1,1.3,12.5,1,-20.59,Math.PI/2);

	pared(3,0.9,10.9,0,-16.1,0);
	pared(3,2.1,10.9,0,-18.5,0);
	pared(1,0.9,10.9,1,-17,0);

	escritorioMadera1(11.02,-1.1,-19);
	escritorioMadera1(12,-1.1,-22);
	escritorioMadera2(8,-1.1,-18);

	librero(7.8,-0.5,-19.4,0);
	librero(8.9,-0.5,-19.4,0);
	librero(10,-0.5,-19.4,0);

	librero(11.9,-0.5,-23.4,0);
	librero(13,-0.5,-23.4,0);
	librero(14.1,-0.5,-23.4,0);

	librero(14.6,-0.5,-19.6,-Math.PI/2);
	librero(14.6,-0.5,-18.6,-Math.PI/2);
	librero(14.6,-0.5,-17.6,-Math.PI/2);
	librero(14.6,-0.5,-16.6,-Math.PI/2);
	}

function animate() {
	window.requestAnimationFrame( animate );
	render();
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	renderer.render( scene, camera );
}

try {
	init();
	animate();
} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport+e);
}

function pared(altura,largo,x,y,z,r){

	var pared = new THREE.BoxGeometry(0.1,altura,largo);

	var textura = new THREE.ImageUtils.loadTexture( 'texturas/pared.jpg' );
	var material = new THREE.MeshBasicMaterial( { map: textura } );
	var objeto = new THREE.Mesh( pared, material );
	objeto.position.x=x;
	objeto.position.y=y;
	objeto.position.z=z;
	objeto.rotation.y=r;
	scene.add( objeto );
}

function suelo(ancho,largo,x,y,z,ws,wt){
	
	var suelo = new THREE.BoxGeometry(ancho,0.05,largo);

	var textura = new THREE.ImageUtils.loadTexture( 'texturas/azulejo.jpg' );
	textura.wrapS=THREE.RepeatWrapping;
	textura.wrapT=THREE.RepeatWrapping;
	textura.repeat.set(wt, ws);
	var material = new THREE.MeshBasicMaterial( { map: textura } );
	var objeto = new THREE.Mesh( suelo, material );
	objeto.position.x=x;
	objeto.position.y=y;
	objeto.position.z=z;
	scene.add( objeto );
}

function escritorio(x,y,z,r){

	// ESCRITORIO
	var texturaCara = new THREE.ImageUtils.loadTexture( 'texturas/melamina0.jpg' );
	var cara = new THREE.MeshBasicMaterial( { map: texturaCara } );

	var texturaBorde = new THREE.ImageUtils.loadTexture( 'texturas/melamina1.jpg' );
	var borde = new THREE.MeshBasicMaterial( { map: texturaBorde } );

	var materialesArray = [cara,cara,borde,borde,borde,borde];
	var materiales = new THREE.MeshFaceMaterial(materialesArray);
	var ladoEscritorio = new THREE.BoxGeometry(0.04,0.74,0.54);

	var objeto = new THREE.Mesh( ladoEscritorio, materiales );
	objeto.position.x=x;
	objeto.position.y=y;
	objeto.position.z=z;
	objeto.rotation.y=r;
	scene.add( objeto );

	objeto = new THREE.Mesh( ladoEscritorio, materiales );
	objeto.position.x=x+0.54;
	objeto.position.y=y;
	objeto.position.z=z;
	objeto.rotation.y=r;
	scene.add( objeto );

	ladoEscritorio = new THREE.BoxGeometry(0.04,0.60,0.57);
	objeto = new THREE.Mesh( ladoEscritorio, materiales );
	objeto.position.x=x+0.27;
	objeto.position.y=y+0.36;
	objeto.position.z=z;
	objeto.rotation.y=r;
	objeto.rotation.z=Math.PI/2;
	scene.add( objeto );

	ladoEscritorio = new THREE.BoxGeometry(0.04,0.54,0.54);
	objeto = new THREE.Mesh( ladoEscritorio, materiales );
	objeto.position.x=x+0.27;
	objeto.position.y=y-0.30;
	objeto.position.z=z;
	objeto.rotation.y=r;
	objeto.rotation.z=Math.PI/2;
	scene.add( objeto );

	ladoEscritorio = new THREE.BoxGeometry(0.04,0.54,0.24);
	objeto = new THREE.Mesh( ladoEscritorio, materiales );
	objeto.position.x=x+0.27;
	objeto.position.y=y+0.25;
	objeto.position.z=z+0.25;
	objeto.rotation.y=r;
	objeto.rotation.z=Math.PI/2;
	scene.add( objeto );

	//TECLADO
	var texturaTeclado = new THREE.ImageUtils.loadTexture( 'texturas/teclado0.jpg' );
	var teclas = new THREE.MeshBasicMaterial( { map: texturaTeclado } );

	var texturaMetal = new THREE.ImageUtils.loadTexture( 'texturas/tm.jpg' );
	var metal = new THREE.MeshBasicMaterial( { map: texturaMetal } );

	materialesArray = [metal,metal,teclas,metal,metal,metal];
	materiales = new THREE.MeshFaceMaterial(materialesArray);
	var teclado = new THREE.BoxGeometry(0.44,0.015,0.14);

	objeto = new THREE.Mesh( teclado, materiales );
	objeto.position.x=x+0.27;
	objeto.position.y=y+0.28;
	objeto.position.z=z+0.29;
	objeto.rotation.y=r;
	scene.add( objeto );

	//TORRE

	var texturaTorreFrente = new THREE.ImageUtils.loadTexture( 'texturas/torre0.jpg' );
	var torreFrente = new THREE.MeshBasicMaterial( { map: texturaTorreFrente } );

	var texturaTorreEspalda = new THREE.ImageUtils.loadTexture( 'texturas/torre1.jpg' );
	var torreEspalda = new THREE.MeshBasicMaterial( { map: texturaTorreEspalda } );

	var texturaTorreCostado = new THREE.ImageUtils.loadTexture( 'texturas/torre2.jpg' );
	var torreCostado = new THREE.MeshBasicMaterial( { map: texturaTorreCostado } );

	materialesArray = [metal,torreCostado,metal,metal,torreFrente,torreEspalda];
	materiales = new THREE.MeshFaceMaterial(materialesArray);
	var torre = new THREE.BoxGeometry(0.16,0.40,0.40);

	objeto = new THREE.Mesh( torre, materiales );
	objeto.position.x=x+0.4;
	objeto.position.y=y-0.1;
	objeto.position.z=z;
	objeto.rotation.y=r;
	scene.add( objeto );

	// MONITOR
	var texturaPantalla = new THREE.ImageUtils.loadTexture( 'texturas/pantalla.jpg' );
	var pantalla = new THREE.MeshBasicMaterial( { map: texturaPantalla } );

	materialesArray = [metal,metal,metal,metal,pantalla,metal];
	materiales = new THREE.MeshFaceMaterial(materialesArray);
	var monitor = new THREE.BoxGeometry(0.50,0.30,0.02);

	objeto = new THREE.Mesh( monitor, materiales );
	objeto.position.x=x+0.25;
	objeto.position.y=y+0.6;
	objeto.position.z=z;
	objeto.rotation.y=r;
	scene.add( objeto );

	var base = new THREE.BoxGeometry(0.22,0.01,0.2);

	objeto = new THREE.Mesh( base, metal );
	objeto.position.x=x+0.25;
	objeto.position.y=y+0.39;
	objeto.position.z=z;
	objeto.rotation.y=r;
	scene.add( objeto );

	var soporte = new THREE.BoxGeometry(0.06,0.08,0.02);

	objeto = new THREE.Mesh( soporte, metal );
	objeto.position.x=x+0.25;
	objeto.position.y=y+0.43;
	objeto.position.z=z-0.01;
	objeto.rotation.y=r;
	scene.add( objeto );

	//MOUSE
	var texturaMouse = new THREE.ImageUtils.loadTexture( 'texturas/mouse0.jpg' );
	var botones= new THREE.MeshBasicMaterial( { map: texturaMouse } );

	var texturaMouseRelleno = new THREE.ImageUtils.loadTexture( 'texturas/mouse1.jpg' );
	var mouseRelleno= new THREE.MeshBasicMaterial( { map: texturaMouseRelleno } );

	materialesArray = [mouseRelleno,mouseRelleno,botones,mouseRelleno,mouseRelleno,mouseRelleno];

	materiales = new THREE.MeshFaceMaterial(materialesArray);

	var mouse = new THREE.BoxGeometry(0.06,0.02,0.12);
   
    objeto = new THREE.Mesh( mouse, materiales );
	objeto.position.x=x+0.5;
	objeto.position.y=y+0.39;
	objeto.position.z=z+0.2;
	objeto.rotation.y=r;
	scene.add( objeto );

	//SILLA
	var texturaMetal = new THREE.ImageUtils.loadTexture( 'texturas/metal.jpg' );
	var acero= new THREE.MeshBasicMaterial( { map: texturaMetal } );
	
	var pata = new THREE.CylinderGeometry( 0.02, 0.02, 0.4, 8 );
	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x+0.05;
	objeto.position.y=y-0.2;
	objeto.position.z=z+0.5;
	objeto.rotation.y=r;
	objeto.rotation.x=Math.PI*0.05;
	scene.add( objeto );

	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x+0.45;
	objeto.position.y=y-0.2;
	objeto.position.z=z+0.5;
	objeto.rotation.y=r;
	objeto.rotation.x=Math.PI*0.05;
	scene.add( objeto );

	pata = new THREE.CylinderGeometry( 0.02, 0.02, 0.8, 8 );
	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x+0.1;
	objeto.position.y=y+0.01;
	objeto.position.z=z+0.9;
	objeto.rotation.y=r;
	scene.add( objeto );

	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x+0.45;
	objeto.position.y=y+0.01;
	objeto.position.z=z+0.9;
	objeto.rotation.y=r;
	scene.add( objeto );

	var texturaCuero = new THREE.ImageUtils.loadTexture( 'texturas/cuero.jpg' );
	var cuero= new THREE.MeshBasicMaterial( { map: texturaCuero } );
	
	var asiento = new THREE.BoxGeometry(0.46,0.05,0.46);
	objeto = new THREE.Mesh( asiento, cuero );
	objeto.position.x=x+0.27;
	objeto.position.y=y;
	objeto.position.z=z+0.7;
	objeto.rotation.y=r;
	scene.add( objeto );

	var espaldar = new THREE.BoxGeometry(0.44,0.3,0.05);
	objeto = new THREE.Mesh( espaldar, cuero );
	objeto.position.x=x+0.27;
	objeto.position.y=y+0.3;
	objeto.position.z=z+0.89;
	objeto.rotation.y=r;
	scene.add( objeto );
}

function parket(ancho,largo,x,y,z,ws,wt){
	
	var suelo = new THREE.BoxGeometry(ancho,0.05,largo);

	var textura = new THREE.ImageUtils.loadTexture( 'texturas/parket.jpg' );
	textura.wrapS=THREE.RepeatWrapping;
	textura.wrapT=THREE.RepeatWrapping;
	textura.repeat.set(wt, ws);
	var material = new THREE.MeshBasicMaterial( { map: textura } );
	var objeto = new THREE.Mesh( suelo, material );
	objeto.position.x=x;
	objeto.position.y=y;
	objeto.position.z=z;
	scene.add( objeto );
}

function puerta(x,y,z,r){
	


	var texturaPuerta = new THREE.ImageUtils.loadTexture( 'texturas/puerta.jpg' );
	var textura= new THREE.MeshBasicMaterial( { map: texturaPuerta } );

	var texturaPuertaI = new THREE.ImageUtils.loadTexture( 'texturas/puertaI.jpg' );
	var texturaI= new THREE.MeshBasicMaterial( { map: texturaPuertaI } );

	var texturaMadera = new THREE.ImageUtils.loadTexture( 'texturas/madera.jpg' );
	var madera = new THREE.MeshBasicMaterial( { map: texturaMadera } );

	materialesArray = [madera,madera,madera,madera,texturaI,textura];
		
	materiales = new THREE.MeshFaceMaterial(materialesArray);

	var puerta = new THREE.BoxGeometry(0.9,1.95,0.04);

	var objeto = new THREE.Mesh( puerta, materiales );
	objeto.position.x=x+0.45;
	objeto.position.y=y;
	objeto.position.z=z;
	objeto.rotation.y=r;
	scene.add( objeto );
}

function marco(x,y,z,r){
	var textura = new THREE.ImageUtils.loadTexture( 'texturas/madera.jpg' );
	var material = new THREE.MeshBasicMaterial( { map: textura } );
	var marco = new THREE.BoxGeometry(0.05,2,0.05);
	var objeto = new THREE.Mesh( marco, material );
	objeto.position.y=y;
	objeto.position.x=x;
	objeto.position.z=z;
	if (r>0) {
	objeto.position.x=x+0.45;
	objeto.position.z=z-0.45;
	}
	scene.add( objeto );

	objeto = new THREE.Mesh( marco, material );
	objeto.position.y=y;
	objeto.position.x=x+0.9;
	objeto.position.z=z;
	if (r>0) {
	objeto.position.x=x+0.45;
	objeto.position.z=z+0.45;
	}
	objeto.rotation.y=r;
	scene.add( objeto );

	marco = new THREE.BoxGeometry(0.05,1,0.06);
	objeto = new THREE.Mesh( marco, material );
	objeto.position.x=x+0.45;
	objeto.position.y=y+1;
	objeto.position.z=z;
	objeto.rotation.y=r;
	objeto.rotation.z=Math.PI/2;
	scene.add( objeto );
}

function pizarras(x,y,z){
	var pared = new THREE.BoxGeometry(5.7,2.9,0.05);
	var textura = new THREE.ImageUtils.loadTexture( 'texturas/paredVerde.jpg' );
	var material = new THREE.MeshBasicMaterial( { map: textura } );
	var objeto = new THREE.Mesh( pared, material );
	objeto.position.x=x;
	objeto.position.y=y;
	objeto.position.z=z;
	scene.add( objeto );

	var texturaFrente = new THREE.ImageUtils.loadTexture( 'texturas/pizarra.jpg' );
	var frente= new THREE.MeshBasicMaterial( { map: texturaFrente } );

	var texturaMetal = new THREE.ImageUtils.loadTexture( 'texturas/metal.jpg' );
	var acero= new THREE.MeshBasicMaterial( { map: texturaMetal } );

	materialesArray = [acero,acero,acero,acero,frente,acero];
		
	materiales = new THREE.MeshFaceMaterial(materialesArray);

	var pizarra = new THREE.BoxGeometry(2.3,1.2,0.04);

	objeto = new THREE.Mesh( pizarra, materiales );
	objeto.position.x=x-1.15;
	objeto.position.y=y+0.2;
	objeto.position.z=z+0.05;
	scene.add( objeto )

	objeto = new THREE.Mesh( pizarra, materiales );
	objeto.position.x=x+1.15;
	objeto.position.y=y+0.2;
	objeto.position.z=z+0.05;
	scene.add( objeto )
}

function escritorioMadera1(x,y,z){

	// ESCRITORIO
	var texturaEscritorio = new THREE.ImageUtils.loadTexture( 'texturas/maderaEO.jpg' );
	var madera = new THREE.MeshBasicMaterial( { map: texturaEscritorio } );

	var ladoEscritorio = new THREE.BoxGeometry(0.04,0.74,0.54);

	var objeto = new THREE.Mesh( ladoEscritorio, madera );
	objeto.position.x=x;
	objeto.position.y=y;
	objeto.position.z=z;
	scene.add( objeto );

	objeto = new THREE.Mesh( ladoEscritorio, madera );
	objeto.position.x=x+1;
	objeto.position.y=y;
	objeto.position.z=z;
	scene.add( objeto );

	ladoEscritorio = new THREE.BoxGeometry(0.04,1.2,0.57);
	objeto = new THREE.Mesh( ladoEscritorio, madera );
	objeto.position.x=x+0.5;
	objeto.position.y=y+0.36;
	objeto.position.z=z;
	objeto.rotation.z=Math.PI/2;
	scene.add( objeto );

	ladoEscritorio = new THREE.BoxGeometry(0.04,0.4,0.54);
	objeto = new THREE.Mesh( ladoEscritorio, madera );
	objeto.position.x=x+0.22;
	objeto.position.y=y-0.30;
	objeto.position.z=z;
	objeto.rotation.z=Math.PI/2;
	scene.add( objeto );

	ladoEscritorio = new THREE.BoxGeometry(0.04,1,0.24);
	objeto = new THREE.Mesh( ladoEscritorio, madera );
	objeto.position.x=x+0.5;
	objeto.position.y=y+0.25;
	objeto.position.z=z+0.25;
	objeto.rotation.z=Math.PI/2;
	objeto.rotation.x=Math.PI/2;
	scene.add( objeto );

	//TECLADO
	var texturaTeclado = new THREE.ImageUtils.loadTexture( 'texturas/teclado0.jpg' );
	var teclas = new THREE.MeshBasicMaterial( { map: texturaTeclado } );

	var texturaMetal = new THREE.ImageUtils.loadTexture( 'texturas/tm.jpg' );
	var metal = new THREE.MeshBasicMaterial( { map: texturaMetal } );

	materialesArray = [metal,metal,teclas,metal,metal,metal];
	materiales = new THREE.MeshFaceMaterial(materialesArray);
	var teclado = new THREE.BoxGeometry(0.44,0.015,0.14);

	objeto = new THREE.Mesh( teclado, materiales );
	objeto.position.x=x+0.35;
	objeto.position.y=y+0.39;
	objeto.position.z=z-0.15;
	objeto.rotation.y=Math.PI;
	scene.add( objeto );

	//TORRE

	var texturaTorreFrente = new THREE.ImageUtils.loadTexture( 'texturas/torre0.jpg' );
	var torreFrente = new THREE.MeshBasicMaterial( { map: texturaTorreFrente } );

	var texturaTorreEspalda = new THREE.ImageUtils.loadTexture( 'texturas/torre1.jpg' );
	var torreEspalda = new THREE.MeshBasicMaterial( { map: texturaTorreEspalda } );

	var texturaTorreCostado = new THREE.ImageUtils.loadTexture( 'texturas/torre2.jpg' );
	var torreCostado = new THREE.MeshBasicMaterial( { map: texturaTorreCostado } );

	materialesArray = [metal,torreCostado,metal,metal,torreFrente,torreEspalda];
	materiales = new THREE.MeshFaceMaterial(materialesArray);
	var torre = new THREE.BoxGeometry(0.16,0.40,0.40);

	objeto = new THREE.Mesh( torre, materiales );
	objeto.position.x=x+0.2;
	objeto.position.y=y-0.08;
	objeto.position.z=z;
	objeto.rotation.y=Math.PI;
	scene.add( objeto );

	// MONITOR
	var texturaPantalla = new THREE.ImageUtils.loadTexture( 'texturas/pantalla.jpg' );
	var pantalla = new THREE.MeshBasicMaterial( { map: texturaPantalla } );

	materialesArray = [metal,metal,metal,metal,pantalla,metal];
	materiales = new THREE.MeshFaceMaterial(materialesArray);
	var monitor = new THREE.BoxGeometry(0.50,0.30,0.02);

	objeto = new THREE.Mesh( monitor, materiales );
	objeto.position.x=x+0.25;
	objeto.position.y=y+0.6;
	objeto.position.z=z+0.05;
	objeto.rotation.y=Math.PI;
	scene.add( objeto );

	var base = new THREE.BoxGeometry(0.22,0.01,0.2);

	objeto = new THREE.Mesh( base, metal );
	objeto.position.x=x+0.25;
	objeto.position.y=y+0.39;
	objeto.position.z=z+0.05;
	scene.add( objeto );

	var soporte = new THREE.BoxGeometry(0.06,0.08,0.02);

	objeto = new THREE.Mesh( soporte, metal );
	objeto.position.x=x+0.25;
	objeto.position.y=y+0.43;
	objeto.position.z=z+0.06;
	scene.add( objeto );

	//MOUSE
	var texturaMouse = new THREE.ImageUtils.loadTexture( 'texturas/mouse0.jpg' );
	var botones= new THREE.MeshBasicMaterial( { map: texturaMouse } );

	var texturaMouseRelleno = new THREE.ImageUtils.loadTexture( 'texturas/mouse1.jpg' );
	var mouseRelleno= new THREE.MeshBasicMaterial( { map: texturaMouseRelleno } );

	materialesArray = [mouseRelleno,mouseRelleno,botones,mouseRelleno,mouseRelleno,mouseRelleno];

	materiales = new THREE.MeshFaceMaterial(materialesArray);

	var mouse = new THREE.BoxGeometry(0.06,0.02,0.12);
   
    objeto = new THREE.Mesh( mouse, materiales );
	objeto.position.x=x+0.02;
	objeto.position.y=y+0.39;
	objeto.position.z=z-0.15;
	objeto.rotation.y=Math.PI;
	scene.add( objeto );

	//SILLA
	var texturaMetal = new THREE.ImageUtils.loadTexture( 'texturas/metal.jpg' );
	var acero= new THREE.MeshBasicMaterial( { map: texturaMetal } );
	
	var pata = new THREE.CylinderGeometry( 0.02, 0.02, 0.4, 8 );
	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x+0.1;
	objeto.position.y=y-0.2;
	objeto.position.z=z-0.5;
	objeto.rotation.x=-Math.PI*0.05;
	scene.add( objeto );

	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x+0.46;
	objeto.position.y=y-0.2;
	objeto.position.z=z-0.5;
	objeto.rotation.x=-Math.PI*0.05;
	scene.add( objeto );

	pata = new THREE.CylinderGeometry( 0.02, 0.02, 0.8, 8 );
	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x+0.11;
	objeto.position.y=y+0.01;
	objeto.position.z=z-0.9;
	scene.add( objeto );

	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x+0.46;
	objeto.position.y=y+0.01;
	objeto.position.z=z-0.9;
	scene.add( objeto );

	var texturaCuero = new THREE.ImageUtils.loadTexture( 'texturas/cuero.jpg' );
	var cuero= new THREE.MeshBasicMaterial( { map: texturaCuero } );
	
	var asiento = new THREE.BoxGeometry(0.46,0.05,0.46);
	objeto = new THREE.Mesh( asiento, cuero );
	objeto.position.x=x+0.28;
	objeto.position.y=y;
	objeto.position.z=z-0.7;
	scene.add( objeto );

	var espaldar = new THREE.BoxGeometry(0.44,0.3,0.05);
	objeto = new THREE.Mesh( espaldar, cuero );
	objeto.position.x=x+0.28;
	objeto.position.y=y+0.3;
	objeto.position.z=z-0.89;
	scene.add( objeto );

	//Pila de Papel

	var texturaEncima = new THREE.ImageUtils.loadTexture( 'texturas/papel0.jpg' );
	var encima= new THREE.MeshBasicMaterial( { map: texturaEncima } );

	var texturaPila = new THREE.ImageUtils.loadTexture( 'texturas/papel1.jpg' );
	var pila= new THREE.MeshBasicMaterial( { map: texturaPila } );

	materialesArray = [pila,pila,encima,pila,pila,pila];

	materiales = new THREE.MeshFaceMaterial(materialesArray);

	var papel = new THREE.BoxGeometry(0.20,0.04,0.26);
   
    objeto = new THREE.Mesh( papel, materiales );
	objeto.position.x=x+0.75;
	objeto.position.y=y+0.39;
	objeto.position.z=z-0.13;
	objeto.rotation.y=Math.PI;
	scene.add( objeto );

	// Impresora
	var texturaImpFrente = new THREE.ImageUtils.loadTexture( 'texturas/impresora0.jpg' );
	var ImpFrente = new THREE.MeshBasicMaterial( { map: texturaImpFrente } );

	var texturaImpEncima = new THREE.ImageUtils.loadTexture( 'texturas/impresora1.jpg' );
	var ImpEncima = new THREE.MeshBasicMaterial( { map: texturaImpEncima } );

	materialesArray = [metal,metal,ImpEncima,metal,ImpFrente,metal];
	materiales = new THREE.MeshFaceMaterial(materialesArray);
	var impresora = new THREE.BoxGeometry(0.30,0.10,0.20);

	objeto = new THREE.Mesh( impresora, materiales );
	objeto.position.x=x+0.8;
	objeto.position.y=y+0.425;
	objeto.position.z=z+0.15;
	objeto.rotation.y=Math.PI;
	scene.add( objeto );

}

function escritorioMadera2(x,y,z){

	// ESCRITORIO
	var texturaEscritorio = new THREE.ImageUtils.loadTexture( 'texturas/maderaEO.jpg' );
	var madera = new THREE.MeshBasicMaterial( { map: texturaEscritorio } );

	var ladoEscritorio = new THREE.BoxGeometry(0.04,0.74,0.54);

	var objeto = new THREE.Mesh( ladoEscritorio, madera );
	objeto.position.x=x;
	objeto.position.y=y;
	objeto.position.z=z;

	objeto.rotation.y=Math.PI/2;
	scene.add( objeto );

	objeto = new THREE.Mesh( ladoEscritorio, madera );
	objeto.position.x=x;
	objeto.position.y=y;
	objeto.position.z=z+1;
	objeto.rotation.y=Math.PI/2;
	scene.add( objeto );

	ladoEscritorio = new THREE.BoxGeometry(0.04,1.2,0.57);
	objeto = new THREE.Mesh( ladoEscritorio, madera );
	objeto.position.x=x;
	objeto.position.y=y+0.36;
	objeto.position.z=z+0.5;
	objeto.rotation.z=Math.PI/2;
	objeto.rotation.y=Math.PI/2;
	scene.add( objeto );

	ladoEscritorio = new THREE.BoxGeometry(0.04,0.4,0.54);
	objeto = new THREE.Mesh( ladoEscritorio, madera );
	objeto.position.x=x;
	objeto.position.y=y-0.30;
	objeto.position.z=z+0.22;
	objeto.rotation.z=Math.PI/2;
	objeto.rotation.y=Math.PI/2;
	scene.add( objeto );

	ladoEscritorio = new THREE.BoxGeometry(0.04,1,0.24);
	objeto = new THREE.Mesh( ladoEscritorio, madera );
	objeto.position.x=x+0.25;
	objeto.position.y=y+0.25;
	objeto.position.z=z+0.5;
	objeto.rotation.x=Math.PI/2;
	scene.add( objeto );

	//TECLADO
	var texturaTeclado = new THREE.ImageUtils.loadTexture( 'texturas/teclado0.jpg' );
	var teclas = new THREE.MeshBasicMaterial( { map: texturaTeclado } );

	var texturaMetal = new THREE.ImageUtils.loadTexture( 'texturas/tm.jpg' );
	var metal = new THREE.MeshBasicMaterial( { map: texturaMetal } );

	materialesArray = [metal,metal,teclas,metal,metal,metal];
	materiales = new THREE.MeshFaceMaterial(materialesArray);
	var teclado = new THREE.BoxGeometry(0.44,0.015,0.14);

	objeto = new THREE.Mesh( teclado, materiales );
	objeto.position.x=x-0.15;
	objeto.position.y=y+0.39;
	objeto.position.z=z+0.15;
	objeto.rotation.y=Math.PI+Math.PI/2;
	scene.add( objeto );

	//TORRE

	var texturaTorreFrente = new THREE.ImageUtils.loadTexture( 'texturas/torre0.jpg' );
	var torreFrente = new THREE.MeshBasicMaterial( { map: texturaTorreFrente } );

	var texturaTorreEspalda = new THREE.ImageUtils.loadTexture( 'texturas/torre1.jpg' );
	var torreEspalda = new THREE.MeshBasicMaterial( { map: texturaTorreEspalda } );

	var texturaTorreCostado = new THREE.ImageUtils.loadTexture( 'texturas/torre2.jpg' );
	var torreCostado = new THREE.MeshBasicMaterial( { map: texturaTorreCostado } );

	materialesArray = [metal,torreCostado,metal,metal,torreFrente,torreEspalda];
	materiales = new THREE.MeshFaceMaterial(materialesArray);
	var torre = new THREE.BoxGeometry(0.16,0.40,0.40);

	objeto = new THREE.Mesh( torre, materiales );
	objeto.position.x=x;
	objeto.position.y=y-0.08;
	objeto.position.z=z+0.2;
	objeto.rotation.y=Math.PI+Math.PI/2;
	scene.add( objeto );

	// MONITOR
	var texturaPantalla = new THREE.ImageUtils.loadTexture( 'texturas/pantalla.jpg' );
	var pantalla = new THREE.MeshBasicMaterial( { map: texturaPantalla } );

	materialesArray = [metal,metal,metal,metal,pantalla,metal];
	materiales = new THREE.MeshFaceMaterial(materialesArray);
	var monitor = new THREE.BoxGeometry(0.50,0.30,0.02);

	objeto = new THREE.Mesh( monitor, materiales );
	objeto.position.x=x+0.05;
	objeto.position.y=y+0.6;
	objeto.position.z=z+0.25;
	objeto.rotation.y=Math.PI+Math.PI/2;
	scene.add( objeto );

	var base = new THREE.BoxGeometry(0.22,0.01,0.2);

	objeto = new THREE.Mesh( base, metal );
	objeto.position.x=x+0.05;
	objeto.position.y=y+0.39;
	objeto.position.z=z+0.25;
	scene.add( objeto );

	var soporte = new THREE.BoxGeometry(0.06,0.08,0.02);

	objeto = new THREE.Mesh( soporte, metal );
	objeto.position.x=x+0.06;
	objeto.position.y=y+0.43;
	objeto.position.z=z+0.25;
	objeto.rotation.y=Math.PI/2;
	scene.add( objeto );

	//MOUSE
	var texturaMouse = new THREE.ImageUtils.loadTexture( 'texturas/mouse0.jpg' );
	var botones= new THREE.MeshBasicMaterial( { map: texturaMouse } );

	var texturaMouseRelleno = new THREE.ImageUtils.loadTexture( 'texturas/mouse1.jpg' );
	var mouseRelleno= new THREE.MeshBasicMaterial( { map: texturaMouseRelleno } );

	materialesArray = [mouseRelleno,mouseRelleno,botones,mouseRelleno,mouseRelleno,mouseRelleno];

	materiales = new THREE.MeshFaceMaterial(materialesArray);

	var mouse = new THREE.BoxGeometry(0.06,0.02,0.12);
   
    objeto = new THREE.Mesh( mouse, materiales );
	objeto.position.x=x-0.15;
	objeto.position.y=y+0.39;
	objeto.position.z=z+0.48;
	objeto.rotation.y=Math.PI+Math.PI/2;
	scene.add( objeto );

	//SILLA
	var texturaMetal = new THREE.ImageUtils.loadTexture( 'texturas/metal.jpg' );
	var acero= new THREE.MeshBasicMaterial( { map: texturaMetal } );
	
	var pata = new THREE.CylinderGeometry( 0.02, 0.02, 0.4, 8 );
	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x-0.5;
	objeto.position.y=y-0.2;
	objeto.position.z=z+0.1;
	objeto.rotation.z=Math.PI*0.05;
	scene.add( objeto );

	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x-0.5;
	objeto.position.y=y-0.2;
	objeto.position.z=z+0.46;
	objeto.rotation.z=Math.PI*0.05;
	scene.add( objeto );

	pata = new THREE.CylinderGeometry( 0.02, 0.02, 0.8, 8 );
	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x-0.9;
	objeto.position.y=y+0.01;
	objeto.position.z=z+0.11;
	scene.add( objeto );

	objeto = new THREE.Mesh( pata, acero );
	objeto.position.x=x-0.9;
	objeto.position.y=y+0.01;
	objeto.position.z=z+0.46;
	scene.add( objeto );

	var texturaCuero = new THREE.ImageUtils.loadTexture( 'texturas/cuero.jpg' );
	var cuero= new THREE.MeshBasicMaterial( { map: texturaCuero } );
	
	var asiento = new THREE.BoxGeometry(0.46,0.05,0.46);
	objeto = new THREE.Mesh( asiento, cuero );
	objeto.position.x=x-0.7;
	objeto.position.y=y;
	objeto.position.z=z+0.28;
	scene.add( objeto );

	var espaldar = new THREE.BoxGeometry(0.44,0.3,0.05);
	objeto = new THREE.Mesh( espaldar, cuero );
	objeto.position.x=x-0.89;
	objeto.position.y=y+0.3;
	objeto.position.z=z+0.28;
	objeto.rotation.y=Math.PI/2;
	scene.add( objeto );

	// Pila de Papel

	var texturaEncima = new THREE.ImageUtils.loadTexture( 'texturas/papel0.jpg' );
	var encima= new THREE.MeshBasicMaterial( { map: texturaEncima } );

	var texturaPila = new THREE.ImageUtils.loadTexture( 'texturas/papel1.jpg' );
	var pila= new THREE.MeshBasicMaterial( { map: texturaPila } );

	materialesArray = [pila,pila,encima,pila,pila,pila];

	materiales = new THREE.MeshFaceMaterial(materialesArray);

	var papel = new THREE.BoxGeometry(0.20,0.04,0.26);
   
    objeto = new THREE.Mesh( papel, materiales );
	objeto.position.x=x-0.13;
	objeto.position.y=y+0.39;
	objeto.position.z=z+0.75;
	objeto.rotation.y=Math.PI+Math.PI/2;
	scene.add( objeto );

	// Impresora
	var texturaImpFrente = new THREE.ImageUtils.loadTexture( 'texturas/impresora0.jpg' );
	var ImpFrente = new THREE.MeshBasicMaterial( { map: texturaImpFrente } );

	var texturaImpEncima = new THREE.ImageUtils.loadTexture( 'texturas/impresora1.jpg' );
	var ImpEncima = new THREE.MeshBasicMaterial( { map: texturaImpEncima } );

	materialesArray = [metal,metal,ImpEncima,metal,ImpFrente,metal];
	materiales = new THREE.MeshFaceMaterial(materialesArray);
	var impresora = new THREE.BoxGeometry(0.30,0.10,0.20);

	objeto = new THREE.Mesh( impresora, materiales );
	objeto.position.x=x+0.15;
	objeto.position.y=y+0.425;
	objeto.position.z=z+0.8;
	objeto.rotation.y=Math.PI+Math.PI/2;
	scene.add( objeto );
}

function librero(x,y,z,r){
	var texturaFrente = new THREE.ImageUtils.loadTexture( 'texturas/libros.jpg' );
	texturaFrente.wrapS=THREE.RepeatWrapping;
	texturaFrente.wrapT=THREE.RepeatWrapping;
	texturaFrente.repeat.set(1, 2);
	var frente= new THREE.MeshBasicMaterial( { map: texturaFrente } );


	var texturaMadera = new THREE.ImageUtils.loadTexture( 'texturas/maderaE.jpg' );
	var madera= new THREE.MeshBasicMaterial( { map: texturaMadera } );

	materialesArray = [madera,madera,madera,madera,frente,madera];
		
	materiales = new THREE.MeshFaceMaterial(materialesArray);

	var librero = new THREE.BoxGeometry(1,2,0.3);

	var objeto = new THREE.Mesh( librero, materiales );
	objeto.position.x=x;
	objeto.position.y=y;
	objeto.position.z=z;
	objeto.rotation.y=r;
	scene.add( objeto )

}