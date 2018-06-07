var i1;
var i2;
var ficha = null;
var fichaA = null;
var start = false;
var dado = 0;
var mover = -1;
var pos = new Array();
var turno = 0;
var golL = 0;
var golV = 0;
var colocadas = false;


function comenzar(){
	i1 = document.querySelector("section").querySelector("div").querySelector("p:nth-of-type(2)").querySelector("input").value;
	i2 = document.querySelector("section").querySelector("div").querySelector("p:nth-of-type(3)").querySelector("input").value;
	but = document.querySelector("section").querySelector("div").querySelector("button");
	if (i1 != "" && i2 != ""){
		but.disabled = false;
	}else{
		but.disabled = true;
	}
}

function alJuego(){
	sessionStorage.setItem("local", i1);
    sessionStorage.setItem("visitante", i2);
	window.location.replace("game.html");
}

function recargar(){
	i1 = document.querySelector("section").querySelector("div").querySelector("p:nth-of-type(2)").querySelector("input");
	i2 = document.querySelector("section").querySelector("div").querySelector("p:nth-of-type(3)").querySelector("input");
	if(sessionStorage.getItem('local') != null){
        i1.value = sessionStorage.local;
    }
    if(sessionStorage.getItem('visitante') != null){
        i2.value = sessionStorage.visitante;
    }
    comenzar();

}

function dibujarCuadricula() {
    let cv = document.querySelector("section:first-of-type").querySelector("canvas"),
        ctx = cv.getContext('2d'),
        dim = cv.width / 20;
        dimG = cv.width / 2;
        im = new Image();
        im.onload = function(){
        	ctx.beginPath();
        	ctx.drawImage(im, 0,0,cv.width, cv.height);
        	ctx.beginPath(); 
		    ctx.lineWidth = 1;
		    ctx.strokeStyle = 'white';
		    for (let i = 1; i <= 19; i++) {
		        //lineas verticales
		        ctx.moveTo(dim * i, 0);
		        ctx.lineTo(i * dim, cv.height);

		    }


		    for (let i = 0; i <= 9; i++) {
		        //lineas hoizontales
		        ctx.moveTo(dim,dim * i);
		        ctx.lineTo(cv.width-dim,i * dim);
		    }

		    ctx.stroke(); 

		    ctx.beginPath();
		    //dibujar bordes rojos
		    ctx.lineWidth = 3;
		    ctx.strokeStyle = 'red';
		    //verticales
		    ctx.moveTo(dimG, 0);
		    ctx.lineTo(dimG, cv.height);

		    ctx.moveTo(dim, 0);
		    ctx.lineTo(dim, cv.height);

		    ctx.moveTo(dim * 19, 0);
		    ctx.lineTo(dim * 19, cv.height);
		    //horizontales
		    ctx.moveTo(dim,0);
		    ctx.lineTo(cv.width-dim,0);

		    ctx.moveTo(dim,dim * 9);
		    ctx.lineTo(cv.width-dim,9 * dim);
		    

		    ctx.stroke(); 

		    //color porteria 1
		    ctx.beginPath();
		    ctx.fillStyle = 'lightgray';
		    ctx.fillRect(0, dim*3, dim, dim*3);
		    ctx.stroke();

		    //color porteria 2
		    ctx.beginPath();
		    ctx.fillStyle = 'lightgray';
		    ctx.fillRect(dim*19, dim*3, dim, dim*3);
		    ctx.stroke();

		    ctx.beginPath();
		    //dibjar porteria 1
		    ctx.lineWidth = 2;
		    ctx.strokeStyle = 'black';
		    //horizntales
		    ctx.moveTo(0, dim*3);
		    ctx.lineTo(dim, cv.height/9*3);

		    ctx.moveTo(0, dim*4);
		    ctx.lineTo(dim, cv.height/9*4);

		    ctx.moveTo(0, dim*5);
		    ctx.lineTo(dim, cv.height/9*5);

		    ctx.moveTo(0, dim*6);
		    ctx.lineTo(dim, cv.height/9*6);
		    //verticales
		    ctx.moveTo(0, dim*3);
		    ctx.lineTo(0, dim*6);

		    //dibujar porteria 2
		    //horizntales
		    ctx.moveTo(dim*19, dim*3);
		    ctx.lineTo(dim*20, cv.height/9*3);

		    ctx.moveTo(dim*19, dim*4);
		    ctx.lineTo(dim*20, cv.height/9*4);

		    ctx.moveTo(dim*19, dim*5);
		    ctx.lineTo(dim*20, cv.height/9*5);

		    ctx.moveTo(dim*19, dim*6);
		    ctx.lineTo(dim*20, cv.height/9*6);
		    //verticales
		    ctx.moveTo(dim*20, dim*3);
		    ctx.lineTo(dim*20, dim*6);

		    ctx.stroke(); 

		    ctx.beginPath();
		    //dibujar area 1
		    ctx.lineWidth = 3;
		    ctx.strokeStyle = 'red';
		    //horizntales
		    ctx.moveTo(dim, dim*2);
		    ctx.lineTo(dim*4,dim*2);

		    ctx.moveTo(dim, dim*7);
		    ctx.lineTo(dim*4,dim*7);
		    //verticales
		    ctx.moveTo(dim*4, dim*2);
		    ctx.lineTo(dim*4,dim*7);

		    //dibujar area 2
		    ctx.lineWidth = 3;
		    ctx.strokeStyle = 'red';
		    //horizntales
		    ctx.moveTo(dim*16, dim*2);
		    ctx.lineTo(dim*19,dim*2);

		    ctx.moveTo(dim*16, dim*7);
		    ctx.lineTo(dim*19,dim*7);
		    //verticales
		    ctx.moveTo(dim*16, dim*2);
		    ctx.lineTo(dim*16,dim*7);

		    ctx.stroke(); 

		    ctx.beginPath();
		    //circulos
		    ctx.arc(dim*10,dim*4.5,36,0,2*Math.PI);

		    ctx.stroke(); 

		    ctx.beginPath();
		    ctx.arc(dim*4,dim*4.5,36,4.71,1.57);
		    ctx.stroke(); 

		    ctx.beginPath();
		    ctx.arc(dim*16,dim*4.5,36,1.57,4.71);
		    ctx.stroke();

        }
        im.src = "resources/campo.jpg";
}

function dibujarCuadriculaLineas() {
    let cv = document.querySelector("section:first-of-type").querySelector("canvas"),
        ctx = cv.getContext('2d'),
        dim = cv.width / 20;
        dimG = cv.width / 2;

	ctx.beginPath(); 
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';
    for (let i = 1; i <= 19; i++) {
        //lineas verticales
        ctx.moveTo(dim * i, 0);
        ctx.lineTo(i * dim, cv.height);

    }


    for (let i = 0; i <= 9; i++) {
        //lineas hoizontales
        ctx.moveTo(dim,dim * i);
        ctx.lineTo(cv.width-dim,i * dim);
    }

    
    ctx.stroke(); 

    ctx.beginPath();
    //dibujar bordes rojos
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    //verticales
    ctx.moveTo(dimG, 0);
    ctx.lineTo(dimG, cv.height);

    ctx.moveTo(dim, 0);
    ctx.lineTo(dim, cv.height);

    ctx.moveTo(dim * 19, 0);
    ctx.lineTo(dim * 19, cv.height);
    //horizontales
    ctx.moveTo(dim,0);
    ctx.lineTo(cv.width-dim,0);

    ctx.moveTo(dim,dim * 9);
    ctx.lineTo(cv.width-dim,9 * dim);
    

    ctx.stroke(); 

    //color porteria 1
    ctx.beginPath();
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, dim*3, dim, dim*3);
    ctx.stroke();

    //color porteria 2
    ctx.beginPath();
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(dim*19, dim*3, dim, dim*3);
    ctx.stroke();

    ctx.beginPath();
    //dibjar porteria 1
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    //horizntales
    ctx.moveTo(0, dim*3);
    ctx.lineTo(dim, cv.height/9*3);

    ctx.moveTo(0, dim*4);
    ctx.lineTo(dim, cv.height/9*4);

    ctx.moveTo(0, dim*5);
    ctx.lineTo(dim, cv.height/9*5);

    ctx.moveTo(0, dim*6);
    ctx.lineTo(dim, cv.height/9*6);
    //verticales
    ctx.moveTo(0, dim*3);
    ctx.lineTo(0, dim*6);

    //dibujar porteria 2
    //horizntales
    ctx.moveTo(dim*19, dim*3);
    ctx.lineTo(dim*20, cv.height/9*3);

    ctx.moveTo(dim*19, dim*4);
    ctx.lineTo(dim*20, cv.height/9*4);

    ctx.moveTo(dim*19, dim*5);
    ctx.lineTo(dim*20, cv.height/9*5);

    ctx.moveTo(dim*19, dim*6);
    ctx.lineTo(dim*20, cv.height/9*6);
    //verticales
    ctx.moveTo(dim*20, dim*3);
    ctx.lineTo(dim*20, dim*6);

    ctx.stroke(); 

    ctx.beginPath();
    //dibujar area 1
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    //horizntales
    ctx.moveTo(dim, dim*2);
    ctx.lineTo(dim*4,dim*2);

    ctx.moveTo(dim, dim*7);
    ctx.lineTo(dim*4,dim*7);
    //verticales
    ctx.moveTo(dim*4, dim*2);
    ctx.lineTo(dim*4,dim*7);

    //dibujar area 2
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    //horizntales
    ctx.moveTo(dim*16, dim*2);
    ctx.lineTo(dim*19,dim*2);

    ctx.moveTo(dim*16, dim*7);
    ctx.lineTo(dim*19,dim*7);
    //verticales
    ctx.moveTo(dim*16, dim*2);
    ctx.lineTo(dim*16,dim*7);

    ctx.stroke(); 

    ctx.beginPath();
    //circulos
    ctx.arc(dim*10,dim*4.5,36,0,2*Math.PI);

    ctx.stroke(); 

    ctx.beginPath();
    ctx.arc(dim*4,dim*4.5,36,4.71,1.57);
    ctx.stroke(); 

    ctx.beginPath();
    ctx.arc(dim*16,dim*4.5,36,1.57,4.71);
    ctx.stroke();

}

function comprobarEquipos(){
	if(sessionStorage.getItem('local') == null || sessionStorage.getItem('visitante') == null){
       window.location.replace("index.html");
    }else{
    	dibujarCuadricula();
    	dragAndDrop();
    	seEmpieza();
    	comenzarJuego();
    }
}


function borrar(){
	sessionStorage.clear();
	window.location.replace("index.html");
}

function dragAndDrop() {
	if(start == false){
		 //ZONA DRAG
	    let v = document.querySelectorAll('body>section:nth-of-type(2)>h2+div>img');
	    ficha = document.querySelectorAll('body>section:nth-of-type(2)>h2+div>img');
	    let fi = 0;
	    let ocupado = false;

	    for (let i = 0; i < v.length; i++) {
	        v[i].setAttribute('draggable', 'true');
	        v[i].id = i;
	        v[i].ondragstart = function (e) {
	            e.dataTransfer.setData('text/plain', v[i].id);
	            fi = v[i].id;
	        }
	    }

	    let cv = document.querySelector("section:first-of-type").querySelector("canvas");
	    cv.ondragover = function (e) {
	    	ocupado = false;
	        e.preventDefault();
	        e.stopPropagation();
	        let x = e.offsetX,
	            y = e.offsetY,
	            ctx = cv.getContext('2d'),
	            dim = cv.width / 20,
	            fila = Math.floor(y / dim),
	            columna = Math.floor(x / dim);
	        dibujarCuadriculaLineas();
	        ctx.beginPath();
	        ctx.strokeStyle = '#f00';
	        ctx.lineWidth = 2;

	        for (i=0;i<=9;i++){
	        	if (ficha[i].fila != null){
	        		if (ficha[i].fila == columna*dim && ficha[i].columna == fila*dim){
	        			ocupado = true;
	        		}
	        	}
	        }

	        if (fi <= 4){
	        	if (columna*dim < dim*10 && columna*dim>=dim){
	        		if (ocupado == false)
	        			ctx.strokeRect(columna * dim, fila * dim, dim, dim); 
	        	}
	        }else{
	        	if (columna*dim >= dim*10 && columna*dim<dim*19){
	        		if (ocupado == false)
	        			ctx.strokeRect(columna * dim, fila * dim, dim, dim); 
	        	}
	        }

	    }

	    cv.ondrop = function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        let x = e.offsetX,
	            y = e.offsetY,
	            id = e.dataTransfer.getData('text/plain'),
	            ctx = cv.getContext('2d'),
	            img = new Image();

	        img.onload = function () {
	            let dim = cv.width / 20,
	                fila = Math.floor(y / dim),
	                columna = Math.floor(x / dim);
	            dibujarCuadricula();
	            if (fi <= 4){
		        	if (columna*dim < dim*10 && columna*dim>=dim){
		        		if (ocupado == false){
			        		ctx.drawImage(img, columna * dim, fila * dim, dim, dim);
		            		v[fi].style.visibility = "hidden"; 
		            		ficha[fi].fila = columna * dim;
		            		ficha[fi].columna = fila * dim;
	            		}
		        	}
		        }else{
		        	if (columna*dim >= dim*10 && columna*dim<dim*19){
		        		if (ocupado == false){
			        		ctx.drawImage(img, columna * dim, fila * dim, dim, dim);
		            		v[fi].style.visibility = "hidden";
		            		ficha[fi].fila = columna * dim;
		            		ficha[fi].columna = fila * dim;
	            		}
		        	}
		        }
		        redibujarFichas();
	            
	        }
	        img.src = document.getElementById(id).src;
	    }
	}	       
}

function seleccionar(img){
	fichaA = img;
	let v = document.querySelectorAll('body>section:nth-of-type(2)>h2+div>img');
	for (let i = 0; i < v.length; i++) {
		v[i].style.border = "none";
	}
	img.style.border = "2px solid black"
}

function redibujarFichas(){
	let cv = document.querySelector("section:first-of-type").querySelector("canvas");
	ctx = cv.getContext('2d');
	let img = new Image();
	let imgA = new Image();
	let dim = cv.width/20;
	img.onload = function(){
		for (i=0;i<=9;i++){
	    	if (ficha[i].fila != null){
	    		if (i<=4)
	    			ctx.drawImage(img, ficha[i].fila, ficha[i].columna, dim, dim);
	    		else
	    			ctx.drawImage(imgA, ficha[i].fila, ficha[i].columna, dim, dim);
	    	}
	    }
	}
    img.src = "resources/fichaRoja.svg";
    imgA.src = "resources/fichaAmarilla.svg";
}

function aleatorioL(){
	if(start == false){
		dibujarCuadricula();
		let v = document.querySelectorAll('body>section:nth-of-type(2)>h2+div>img');
		let rand = document.querySelector('body>section:nth-of-type(2)>h2+div>button:nth-of-type(1)');
	    ficha = document.querySelectorAll('body>section:nth-of-type(2)>h2+div>img');
	    let cv = document.querySelector("section:first-of-type").querySelector("canvas"),
	    ctx = cv.getContext('2d');
	    let img = new Image();
	    let ocupado = false;
	    let dim = cv.width / 20;
	    let columna;
	    let fila;
		img.onload = function(){
			for (i=0;i<=4;i++){
				ocupado = true;
				while(ocupado == true){
					ocupado = false;
					fila = Math.floor((Math.random()*9));
					columna = Math.floor((Math.random()*9)+1);

					for (x=0;x<=4;x++){
			        	if (ficha[x].fila != null){
			        		if (ficha[x].fila == columna*dim && ficha[x].columna == fila*dim){
			        			ocupado=true;
			        		}
			        	}
			        }
				}
				ficha[i].fila = columna * dim;
		        ficha[i].columna = fila * dim;
				ctx.drawImage(img, dim * columna, dim * fila, dim, dim);
				v[i].style.visibility = "hidden";
				ocupado = false;
			}
			redibujarFichas();
			seEmpieza();
		}
		img.src = "resources/fichaRoja.svg";
	}
}

function aleatorioV(){
	if(start == false){
		dibujarCuadricula();
		let v = document.querySelectorAll('body>section:nth-of-type(2)>h2+div>img');
		let rand = document.querySelector('body>section:nth-of-type(2)>h2+div>button:nth-of-type(2)');
	    ficha = document.querySelectorAll('body>section:nth-of-type(2)>h2+div>img');
	    let cv = document.querySelector("section:first-of-type").querySelector("canvas"),
	    ctx = cv.getContext('2d');
	    let img = new Image();
	    let ocupado = false;
	    let dim = cv.width / 20;
	    let columna;
	    let fila;
		img.onload = function(){
			for (i=5;i<=9;i++){
				ocupado = true;
				while(ocupado == true){
					ocupado = false;
					fila = Math.floor((Math.random()*9));
					columna = Math.floor((Math.random()*9)+1);
					columna = columna + 9;

					for (x=5;x<=9;x++){
			        	if (ficha[x].fila != null){
			        		if (ficha[x].fila == columna*dim && ficha[x].columna == fila*dim){
			        			ocupado=true;
			        		}
			        	}
			        }
				}
				ficha[i].fila = columna * dim;
		        ficha[i].columna = fila * dim;
				ctx.drawImage(img, dim * columna, dim * fila, dim, dim);
				v[i].style.visibility = "hidden";
				ocupado = false;
			}
			redibujarFichas();
			seEmpieza();
		}
		img.src = "resources/fichaAmarilla.svg";
	}
}

function getCursorPositionOnCanvas(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    x = x/36;
    y = y/36;
    x = Math.trunc(x);
    y = Math.trunc(y);

    if(fichaA != null){
    	colocarFicha(x,y);
    }

    if (start == true){
    	if (mover != -1){
    		moverFicha(x,y);
    	}else{
    		movimiento(x,y);
    	}
    	
    }


}

function colocarFicha(x,y){
	if(start == false){
		let cv = document.querySelector("section:nth-of-type(1)").querySelector("canvas:first-of-type");
		ctx = cv.getContext('2d');
		dim = cv.width / 20;
		let ocupado = false;
		ctx.beginPath();
		id = parseInt(fichaA.id);
		if(id <= 4 && id >= 0){
			if(x > 0 && x < 10){
				for (z=0;z<=4;z++){
		        	if (ficha[z].fila != null){
		        		if (ficha[z].fila == x*dim && ficha[z].columna == y*dim){
		        			ocupado=true;
		        		}
		        	}
		        }
		        if(ocupado == false){
		        	ctx.drawImage(fichaA,x * dim, y * dim, dim, dim);
					fichaA.style.visibility = "hidden";
					ficha[id].fila = x * dim;
			        ficha[id].columna = y * dim;
					fichaA = null;
		        }
			}
		}
		else if(id <= 9 && id >= 5){
			if(x > 9 && x < 19){
				for (z=5;z<=9;z++){
		        	if (ficha[z].fila != null){
		        		if (ficha[z].fila == x*dim && ficha[z].columna == y*dim){
		        			ocupado=true;
		        		}
		        	}
		        }
		        if(ocupado == false){
					ctx.drawImage(fichaA,x * dim, y * dim, dim, dim);
					fichaA.style.visibility = "hidden";
					ficha[id].fila = x * dim;
			        ficha[id].columna = y * dim;
					fichaA = null;
		        }
			}
		}
	}
}

function seEmpieza(){
	let f =  0;
	if(start == false){
		for (i=0;i<=9;i++){
			if (ficha != null && ficha[i].fila != null){
				f++;
			}
		}
		if (f == 10){
			let b = document.querySelector("section:first-of-type>p:nth-of-type(2)>button:nth-of-type(1)");
			b.disabled = false;
			colocadas = true;
			sessionStorage.setItem("colocadas",colocadas);
		}
	}
}

function comenzarJuego(){
	if (colocadas == true){
		start = true;
		sessionStorage.setItem("fichas", JSON.stringify(ficha));
		console.log("otro");
		let b = document.querySelector("section:first-of-type>p:nth-of-type(2)>button:nth-of-type(1)");
		b.disabled = true;
		start = true;
		let mar = document.querySelector("section:nth-of-type(1)>p:first-of-type");
		let p = document.querySelector("section:nth-of-type(1)>p:nth-of-type(2)");
		let d = document.querySelector("section:nth-of-type(1)>p:nth-of-type(3)");
		let s2 = document.querySelector("section:nth-of-type(2)");
		s2.style.display = "none";
		mar.style.display = "inline-flex";
		d.style.display = "block";
		d.style.top = "5px";
		mar.style.top = "-5px";
		sessionStorage.setItem("start",start);
		let n = document.querySelector("section:nth-of-type(1)>p:nth-of-type(3)>span");
		n.innerHTML = dado;
	}
}

function mouse_move(e) {
	if(start == false){
	    let cv = e.target,
	        x = e.offsetX,
	        y = e.offsetY,
	        dim = cv.width / 20,
	        fila = Math.floor(y / dim),
	        columna = Math.floor(x / dim),
	        ocupado = false;

	    if (cv.getAttribute('data-down')) { 
	        id = cv.getAttribute('fi');
	        if (id<=4 && columna > 0 && columna < 10){
	        	for (z=0;z<=4;z++){
		        	if (ficha[z].fila != null){
		        		if (ficha[z].fila == columna*dim && ficha[z].columna == fila*dim){
		        			ocupado=true;
		        		}
		        	}
		        }
	        	if (ocupado == false){
		        	if(ficha[id].fila != columna*dim || ficha[id].columna != fila*dim) {
			            ficha[id].fila = columna*dim;
			            ficha[id].columna = fila*dim;
						dibujarCuadricula();
			            redibujarFichas();
			        }
		        }
	        }else if(id>=5 && columna > 9 && columna < 19){
	        	for (z=5;z<=9;z++){
		        	if (ficha[z].fila != null){
		        		if (ficha[z].fila == columna*dim && ficha[z].columna == fila*dim){
		        			ocupado=true;
		        		}
		        	}
		        }
	        	if (ocupado == false){
		        	if(ficha[id].fila != columna*dim || ficha[id].columna != fila*dim) {
			            ficha[id].fila = columna*dim;
			            ficha[id].columna = fila*dim;
						dibujarCuadricula();
			            redibujarFichas();
			        }
		        }
	        }
	        ocupado = false;
	    }
	}
}

function mouse_down(e) {
    let cv = e.target,
        x = e.offsetX,
        y = e.offsetY,
        dim = cv.width / 20,
        fila = Math.floor(y / dim),
        columna = Math.floor(x / dim);

    for(i=0;i<=9;i++){
	    if (ficha[i].fila == columna*dim && ficha[i].columna == fila*dim) {
	        cv.setAttribute('data-down', 'true');
	        cv.setAttribute('fi',ficha[i].id); 
	    }
	}



}

function mouse_up(e) {
    let cv = e.target,
        x = e.offsetX,
        y = e.offsetY,
        dim = cv.width / 3,
        fila = Math.floor(y / dim),
        columna = Math.floor(x / dim);

    cv.removeAttribute('data-down');
    cv.removeAttribute('fi'); 

}

function random(but){

	let i = Math.floor((Math.random()*6)+1);
	let n = document.querySelector("section:nth-of-type(1)>p:nth-of-type(3)>span");
	n.innerHTML = i;
	dado = i;
	but.disabled = true;
	sessionStorage.setItem("dado", dado);
}

function movimiento(x,y){
	let existe = false;
	for (z=0;z<=9;z++){
    	if (ficha[z].fila != null){
    		if (ficha[z].fila == x*36 && ficha[z].columna == y*36){
    			existe=true;
    			id = ficha[z].id;
    		}
    	}
    }
    if (existe == true){
    	let c = false;
		if (turno == 0){
			if (id <=4){
				 c = true;
			}
		}else{
			if (id>=5){
				c = true;
			}
		}
		if (c==true){
	    	mover = id;
	    	im = new Image();
	        im.onload = function(){
	        	let cv = document.querySelector("section:first-of-type").querySelector("canvas");
		    	let ctx = cv.getContext("2d");
	        	ctx.beginPath();
	        	ctx.drawImage(im, 0,0,cv.width, cv.height);
	        	dibujarCuadriculaLineas();

		    	
		    	let dim = cv.width/20;
		    	//cuadro-ficha
		    	ctx.lineWidth="3";
				ctx.strokeStyle="red";
		    	ctx.rect(x*dim, y*dim, dim, dim);
		    	ctx.stroke();
		    	ctx.fillStyle = 'orange';
		    	//izquierda-arriba
		    	let mal = false;
		    	let existe = false;
		    	ix = x-dado;
		    	iy = y-dado;
		    	if (ix == 0){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (ix == 19){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (mal == false){
		    		existe = ocupado(ix,iy);
			    	if (existe == false){
			    		pos.push(ix);
			    		pos.push(iy);
				    	ctx.beginPath();
				    	ctx.lineWidth="3";
						ctx.strokeStyle="black";
				    	ctx.fillRect(ix*dim, iy*dim, dim, dim);
				    	ctx.rect(ix*dim, iy*dim, dim, dim);
				    	ctx.stroke();
				    }
				    existe = false;
		    	}
		    	mal = false;
		    	
		    	//arriba
		    	ix = x;
		    	iy = y-dado;

		    	if (ix == 0){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (ix == 19){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (mal == false){
		    		existe = ocupado(ix,iy);
			    	if (existe == false){
			    		pos.push(ix);
			    		pos.push(iy);
				    	ctx.beginPath();
				    	ctx.lineWidth="3";
						ctx.strokeStyle="black";
				    	ctx.fillRect(ix*dim, iy*dim, dim, dim);
				    	ctx.rect(ix*dim, iy*dim, dim, dim);
				    	ctx.stroke();
				    }
				    existe = false;
		    	}
		    	mal = false;
		    	//derecha-arriba
		    	ix = x+dado;
		    	iy = y-dado;
		    	if (ix == 0){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (ix == 19){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (mal == false){
		    		existe = ocupado(ix,iy);
			    	if (existe == false){
			    		pos.push(ix);
			    		pos.push(iy);
				    	ctx.beginPath();
				    	ctx.lineWidth="3";
						ctx.strokeStyle="black";
				    	ctx.fillRect(ix*dim, iy*dim, dim, dim);
				    	ctx.rect(ix*dim, iy*dim, dim, dim);
				    	ctx.stroke();
				    }
				    existe = false;
		    	}
		    	mal = false;
		    	//derecha
		    	ix = x+dado;
		    	iy = y;
		    	if (ix == 0){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (ix == 19){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (mal == false){
		    		existe = ocupado(ix,iy);
			    	if (existe == false){
			    		pos.push(ix);
			    		pos.push(iy);
				    	ctx.beginPath();
				    	ctx.lineWidth="3";
						ctx.strokeStyle="black";
				    	ctx.fillRect(ix*dim, iy*dim, dim, dim);
				    	ctx.rect(ix*dim, iy*dim, dim, dim);
				    	ctx.stroke();
				    }
				    existe = false;
		    	}
		    	mal = false;
		    	//derecha-abajo
		    	ix = x+dado;
		    	iy = y+dado;
		    	if (ix == 0){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (ix == 19){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (mal == false){
		    		existe = ocupado(ix,iy);
			    	if (existe == false){
			    		pos.push(ix);
			    		pos.push(iy);
				    	ctx.beginPath();
				    	ctx.lineWidth="3";
						ctx.strokeStyle="black";
				    	ctx.fillRect(ix*dim, iy*dim, dim, dim);
				    	ctx.rect(ix*dim, iy*dim, dim, dim);
				    	ctx.stroke();
				    }
				    existe = false;
		    	}
		    	mal = false;
		    	//abajo
		    	ix = x;
		    	iy = y+dado;
		    	if (ix == 0){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (ix == 19){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (mal == false){
		    		existe = ocupado(ix,iy);
			    	if (existe == false){
			    		pos.push(ix);
			    		pos.push(iy);
				    	ctx.beginPath();
				    	ctx.lineWidth="3";
						ctx.strokeStyle="black";
				    	ctx.fillRect(ix*dim, iy*dim, dim, dim);
				    	ctx.rect(ix*dim, iy*dim, dim, dim);
				    	ctx.stroke();
				    }
				    existe = false;
		    	}
		    	mal = false;
		    	//izquierda-abajo
		    	ix = x-dado;
		    	iy = y+dado;
		    	if (ix == 0){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (ix == 19){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (mal == false){
		    		existe = ocupado(ix,iy);
			    	if (existe == false){
			    		pos.push(ix);
			    		pos.push(iy);
				    	ctx.beginPath();
				    	ctx.lineWidth="3";
						ctx.strokeStyle="black";
				    	ctx.fillRect(ix*dim, iy*dim, dim, dim);
				    	ctx.rect(ix*dim, iy*dim, dim, dim);
				    	ctx.stroke();
				    }
				    existe = false;
		    	}
		    	mal = false;
		    	//izquierda
		    	ix = x-dado;
		    	iy = y;
		    	if (ix == 0){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (ix == 19){
		    		if (iy<=2 || iy>= 6){
		    			mal = true;
		    		}
		    	}
		    	if (mal == false){
		    		existe = ocupado(ix,iy);
			    	if (existe == false){
			    		pos.push(ix);
			    		pos.push(iy);
				    	ctx.beginPath();
				    	ctx.lineWidth="3";
						ctx.strokeStyle="black";
				    	ctx.fillRect(ix*dim, iy*dim, dim, dim);
				    	ctx.rect(ix*dim, iy*dim, dim, dim);
				    	ctx.stroke();
				    }
				    existe = false;
		    	}
		    	mal = false;

		    	
		    	redibujarFichas();
		    }
	    }else{
	    	dibujarCuadriculaLineas();
	    	mostrarMensajeTurno();

		 }
	    im.src = "resources/campo.jpg";
    }
	    	redibujarFichas();
}


function moverFicha(x,y){

	let bien = false;
	let actual = mover;
	for (i=0;i<pos.length;i=i+2){
		if (pos[i] == x && pos[i+1] == y){
			bien = true;
		}
	}
	if (bien == true){
		if (x==0 && y>=3 && y <=5){
			golV++;
			sessionStorage.setItem("golV", golV);
			start = false;
			aleatorioV();
			aleatorioL();
			start = true;
			if(golL >= 5 || golV >= 5){
				if(golL-golV >=2 || golV-golL >=2){
					mostrarMensajeGolGanador();
				}
			}else{
				mostrarMensajeGol();
			}
		}else if (x==19 && y>=3 && y <=5){
			golL++;
			sessionStorage.setItem("golL", golL);
			start = false;
			aleatorioV();
			aleatorioL();
			start = true;
			if(golL >= 5 || golV >= 5){
				if(golL-golV >=2 || golV-golL >=2){
					mostrarMensajeGolGanador();
				}
			}else{
				mostrarMensajeGol();
			}
		}else{
			ficha[mover].fila = x*36;
			ficha[mover].columna = y*36;
		}
		
		dibujarCuadricula();
		redibujarFichas();
		if (turno == 0){
			turno = 1;
		}else{
			turno = 0;
		}
		dibujarNombres();
		document.querySelector("section:first-of-type>p:nth-of-type(3)>button").disabled = false;
		dado = 0;
		let i = document.querySelector("section:nth-of-type(1)>p:nth-of-type(3)>span");
		i.innerHTML = "X";
		mover = -1;
		pos = new Array();
	}else{
		let existe = ocupadoId(x,y);
		let sacar = true;
		if (actual <=4){
			if(existe <= 4 && existe >= 0){
				sacar = false;
				pos = new Array();
				movimiento(x,y);
			}
		}else{
			if(existe >= 5){
				sacar = false;
				pos = new Array();
				movimiento(x,y);
			}
		}
		if (sacar == true)
			mostrarMensaje();
		
	}

	sessionStorage.setItem("fichas", JSON.stringify(ficha));
	sessionStorage.setItem("turno", turno);

}

function ocupado(x,y){
	let existe = false;
	for (z=0;z<=9;z++){
    	if (ficha[z].fila != null){
    		if (ficha[z].fila == x*36 && ficha[z].columna == y*36){
    			existe=true;
    		}
    	}
    }
    return existe;
}

function ocupadoId(x,y){
	let existe = -1;
	for (z=0;z<=9;z++){
    	if (ficha[z].fila != null){
    		if (ficha[z].fila == x*36 && ficha[z].columna == y*36){
    			existe=ficha[z].id;
    		}
    	}
    }
    return existe;
}

function mostrarMensaje(){
    let capa_fondo = document.createElement('div');
    let capa_frente = document.createElement('article');
    
    let html = '';
    
    capa_fondo.appendChild(capa_frente);
    
    html += '<p> Posicion invalida. Elija otra. </p>';
    html += '<a onclick="this.parentNode.parentNode.remove();">CERRAR</a>';

    capa_frente.innerHTML = html;
    
    capa_fondo.classList.add('capa-fondo');
    capa_frente.classList.add('capa-frente');
    document.body.appendChild(capa_fondo);
}

function mostrarMensajeTurno(){
    let capa_fondo = document.createElement('div');
    let capa_frente = document.createElement('article');
    
    let html = '';
    
    capa_fondo.appendChild(capa_frente);
    
    html += '<p> No es tu turno.</p>';
    html += '<a onclick="this.parentNode.parentNode.remove();">CERRAR</a>';

    capa_frente.innerHTML = html;
    
    capa_fondo.classList.add('capa-fondo');
    capa_frente.classList.add('capa-frente');
    document.body.appendChild(capa_fondo);
}

function mostrarMensajeGol(){
    let capa_fondo = document.createElement('div');
    let capa_frente = document.createElement('article');
    
    let html = '';
    
    capa_fondo.appendChild(capa_frente);
    
    html += '<p> !GOL! La metio por toda la escuadra</p>';
    html += '<a onclick="this.parentNode.parentNode.remove();">CERRAR</a>';

    capa_frente.innerHTML = html;
    
    capa_fondo.classList.add('capa-fondo');
    capa_frente.classList.add('capa-frente-gol');
    document.body.appendChild(capa_fondo);
}

function mostrarMensajeGolGanador(){
    let capa_fondo = document.createElement('div');
    let capa_frente = document.createElement('article');
    
    let html = '';
    
    capa_fondo.appendChild(capa_frente);
    if(golL > golV){
    	html += '<p>Ha ganado el '+sessionStorage.local+'</p>';
	    html += '<a onclick="this.parentNode.parentNode.remove();borrar();">CERRAR</a>';

	    capa_frente.innerHTML = html;
	    
	    capa_fondo.classList.add('capa-fondo');
	    capa_frente.classList.add('capa-frente-gol');
	    document.body.appendChild(capa_fondo);
    }else if(golV > golL){
    	html += '<p>Ha ganado el '+sessionStorage.visitante+'</p>';
	    html += '<a onclick="this.parentNode.parentNode.remove(); borrar();">CERRAR</a>';

	    capa_frente.innerHTML = html;
	    
	    capa_fondo.classList.add('capa-fondo');
	    capa_frente.classList.add('capa-frente-gol');
	    document.body.appendChild(capa_fondo);
    }


    
}

function dibujarNombres(){
	let l = sessionStorage.local;
	let v = sessionStorage.visitante;
	let p = document.querySelector("section:first-of-type>p:first-of-type");
	p.innerHTML = "<span id='local'>"+l+"</span> "+" | "+golL+" - "+golV+" | "+"<span id='visitante'>"+v+"</span>";
	if (turno == 0){
		document.getElementById("local").style.color = "red";
		document.getElementById("visitante").style.color = "black";
	}else{
		document.getElementById("local").style.color = "black";
		document.getElementById("visitante").style.color = "red";
	}
	
}

function cargar(){
	if(sessionStorage.getItem('local') != null){
		i1 = sessionStorage.local;
	}
	if(sessionStorage.getItem('visitante') != null){
		i2 = sessionStorage.visitante;
	}
	if(sessionStorage.getItem('fichas') != null){
		ficha = JSON.parse(sessionStorage.fichas);
		for (i = 0;i<=9;i++){
			ficha[i].id = i;
		}
	}
	if(sessionStorage.getItem('golL') != null){
		golL = parseInt(sessionStorage.golL);
	}
	if(sessionStorage.getItem('golV') != null){
		golV = parseInt(sessionStorage.golV);
	}
	if(sessionStorage.getItem('start') != null){
		if (sessionStorage.start == "true")
			start = true;
		else
			start = false;
	}
	if(sessionStorage.getItem('dado') != null){
		dado = parseInt(sessionStorage.dado);
		console.log(dado);
	}
	if(sessionStorage.getItem('turno') != null){
		turno = parseInt(sessionStorage.turno);
		console.log(turno);
	}
	if(sessionStorage.getItem('colocadas') != null){
		if (sessionStorage.colocadas == "true")
			colocadas = true;
		else
			colocadas = false;
	}
}
