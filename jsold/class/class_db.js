function DB() { // DeBug
	this.imgs = [];
	
	this.initialiser = function(main_span) {
		var span = document.createElement('span');
		span.id = 'span_debug';
		span.style.display = 'none';
		main_span.appendChild(span);
	};
	
	this.desactiver = function() {};
	this.basculer_activer_desactiver = function() {};
	
	this.decaler = function(X, Y) {
		for (var i = 0, x, y; i < this.imgs.length; i++) {
			element = document.getElementById(this.imgs[i].id);
			this.imgs[i].x += X*70;
			this.imgs[i].y += Y*70;
			element.style.left = this.imgs[i].x+"px";
			element.style.top = this.imgs[i].y+"px";
		}
	};
	
	this.afficher_ensemble = function(id_ez) {
		// var id_ez = prompt("Id de l'ensembleZone à afficher:");
		if (gt.ez[id_ez] !== false) {
			this.imgs = [];
			var nb_img = 1;
			
			var span = document.createElement('span');
			span.style.display = "block";
			
			var img = document.createElement("img");
			this.imgs[0] = new ImgDebug();
			img.id = this.imgs[0].id = "img_debug_rs";
			img.src = "tuiles/tuile_origine_bug.png";
			img.style.display = "block";
			img.style.position = "absolute";
			this.imgs[0].x = 6+(tj.tp.x+pl.x_decal-pl.x_min)*70;
			this.imgs[0].y = 68+(tj.tp.y+pl.y_decal-pl.y_min)*70;
			img.style.left = this.imgs[0].x+'px';
			img.style.top = this.imgs[0].y+'px';
			span.appendChild(img);
			
			for (i = 3, j = 0, this.nb_img = 0, b = gt.ez[id_ez].id_bz, l0 = b.length; j < l0; j++)
				for (k = 0, l1 = gt.bz[b[j]].cs.length; k < l1; k++) {
					img = document.createElement("img");
					this.imgs[nb_img] = new ImgDebug();
					img.id = this.imgs[nb_img].id = "img_debug"+nb_img;
					img.src = "icone_debug/z"+i+(gt.bz[b[j]].ts[k] ? "t" : "")+".png";
					img.style.display = "block";
					img.style.position = "absolute";
					switch(gt.bz[b[j]].cs[k]) {
						case 0:
							this.imgs[nb_img].x = 6+63+(gt.bz[b[j]].x+pl.x_decal-pl.x_min)*70;
							this.imgs[nb_img].y = 68+40+(gt.bz[b[j]].y+pl.y_decal-pl.y_min)*70;
							break;
						case 1:
							this.imgs[nb_img].x = 6+63+(gt.bz[b[j]].x+pl.x_decal-pl.x_min)*70;
							this.imgs[nb_img].y = 68+20+(gt.bz[b[j]].y+pl.y_decal-pl.y_min)*70;
							break;
						case 2:
							this.imgs[nb_img].x = 6+40+(gt.bz[b[j]].x+pl.x_decal-pl.x_min)*70;
							this.imgs[nb_img].y = 68+(gt.bz[b[j]].y+pl.y_decal-pl.y_min)*70;
							break;
						case 3:
							this.imgs[nb_img].x = 6+20+(gt.bz[b[j]].x+pl.x_decal-pl.x_min)*70;
							this.imgs[nb_img].y = 68+(gt.bz[b[j]].y+pl.y_decal-pl.y_min)*70;
							break;
						case 4:
							this.imgs[nb_img].x = 6+(gt.bz[b[j]].x+pl.x_decal-pl.x_min)*70;
							this.imgs[nb_img].y = 68+20+(gt.bz[b[j]].y+pl.y_decal-pl.y_min)*70;
							break;
						case 5:
							this.imgs[nb_img].x = 6+(gt.bz[b[j]].x+pl.x_decal-pl.x_min)*70;
							this.imgs[nb_img].y = 68+40+(gt.bz[b[j]].y+pl.y_decal-pl.y_min)*70;
							break;
						case 6:
							this.imgs[nb_img].x = 6+20+(gt.bz[b[j]].x+pl.x_decal-pl.x_min)*70;
							this.imgs[nb_img].y = 68+63+(gt.bz[b[j]].y+pl.y_decal-pl.y_min)*70;
							break;
						case 7:
							this.imgs[nb_img].x = 6+40+(gt.bz[b[j]].x+pl.x_decal-pl.x_min)*70;
							this.imgs[nb_img].y = 68+63+(gt.bz[b[j]].y+pl.y_decal-pl.y_min)*70;
							break;
						default:
							alert("Par la sainte licorne de l'espace"); break;
					}
					img.style.left = this.imgs[nb_img].x+'px';
					img.style.top = this.imgs[nb_img].y+'px';
					span.appendChild(img);
					nb_img++;
				}
			
			document.getElementById("le_span_du_plateau").replaceChild(span, document.getElementById("span_debug"));
			span.id = "span_debug";
			set_log("Affichage de l'ensemble zone d'id:"+id_ez+".");
		}
	};
}

function ImgDebug() {
	this.x = 0;
	this.y = 0;
	this.id = "";
}