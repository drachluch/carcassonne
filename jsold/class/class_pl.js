function PL() {
	this.x_max = 0;
	this.x_min = 0;
	this.y_max = 0;
	this.y_min = 0;
	
	this.x_decal = 0;
	this.y_decal = 0;
	
	this.construire = function() {
		// disposition_tuiles + disposition_murs
		var table = document.createElement('table');
		for (var i = this.y_min, j, tr, td, img; i <= this.y_max; i++) {
			tr = document.createElement('tr');
			tr.id = 'tr'+i;
			for (j = this.x_min; j <= this.x_max; j++) {
				td = document.createElement('td');
				td.id = 'td'+i+';'+j;
				img = document.createElement('img');
				img.id = 'img'+i+';'+j;
				img.src = 'tuiles/vide.png';
				img.src = gt.dt[j] ? (gt.dt[j][i] ? 'tuiles/'+gt.dt[j][i][0]+'.png' : (gr.dr[j] ? (gr.dr[j][i] ? 'tuiles/'+gr.dr[j][i]+'.png' : 'tuiles/vide.png') : 'tuiles/vide.png')) : 'tuiles/vide.png';
				
				td.appendChild(img);
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		
		var span_du_plateau = document.createElement("span");
		ap.initialiser(span_du_plateau); // liste_partisans
		pp.initialiser(span_du_plateau); // partisan provisoire
		db.initialiser(span_du_plateau); // debug(Ex)
		rs.initialiser(span_du_plateau); // rectangle de selection
		span_du_plateau.style.display = "block";
		
		document.getElementById("sectionDroite").replaceChild(span_du_plateau, document.getElementById("le_span_du_plateau"));
		document.getElementById("sectionDroite").replaceChild(table, document.getElementById("plateau"));
		table.id = 'plateau';
		span_du_plateau.id = "le_span_du_plateau";
	};
	
	this.determiner_elargissements_necessaires = function() {
		if (tj.tp.x == this.x_max)
			this.elargir_plateau_x_max();
		if (tj.tp.x == this.x_min)
			this.elargir_plateau_x_min();
		if (tj.tp.y == this.y_max)
			this.elargir_plateau_y_max();
		if (tj.tp.y == this.y_min)
			this.elargir_plateau_y_min();
	};
	
	this.elargir_plateau_x_max = function() {
		this.x_max++;
		for (var i = this.y_min, tr, td, img; i <= this.y_max; i++) {
			tr = document.getElementById('tr'+i);
			td = document.createElement('td');
			td.id = 'td'+this.x_max+';'+i;
			img = document.createElement('img');
			img.id = 'img'+this.x_max+';'+i;
			img.src = 'tuiles/vide.png';
			
			td.appendChild(img);
			tr.appendChild(td);
		}
	};
	
	this.elargir_plateau_x_min = function() {
		this.x_min--;
		for (var i = this.y_min, tr, td, img; i <= this.y_max; i++) {
			tr = document.getElementById('tr'+i);
			td = document.createElement('td');
			td.id = 'td'+this.x_min+';'+i;
			img = document.createElement('img');
			img.id = 'img'+this.x_min+';'+i;
			img.src = 'tuiles/vide.png';
			
			td.appendChild(img);
			tr.insertBefore(td, tr.firstChild);
		}
		
		ap.decaler(1, 0);
		db.decaler(1, 0);
	};
	
	this.elargir_plateau_y_max = function() {
		this.y_max++;
		var tr = document.createElement('tr');
		tr.id = 'tr'+this.y_max;
		for (var i = this.x_min, td, img; i <= this.x_max; i++) {
			td = document.createElement('td');
			td.id = 'td'+i+';'+this.y_max;
			img = document.createElement('img');
			img.id = 'img'+i+';'+this.y_max;
			img.src = 'tuiles/vide.png';
			
			td.appendChild(img);
			tr.appendChild(td);
		}
		document.getElementById('plateau').appendChild(tr);
	};
	
	this.elargir_plateau_y_min = function() {
		this.y_min--;
		var tr = document.createElement('tr');
		tr.id = 'tr'+this.y_min;
		for (var i = this.x_min, td, img; i <= this.x_max; i++) {
			td = document.createElement('td');
			td.id = 'td'+i+';'+this.y_min;
			img = document.createElement('img');
			img.id = 'img'+i+';'+this.y_min;
			img.src = 'tuiles/vide.png';
			
			td.appendChild(img);
			tr.appendChild(td);
		}
		var table = document.getElementById('plateau');
		table.insertBefore(tr, table.firstChild);
		
		ap.decaler(0, 1);
		db.decaler(0, 1);
	};
}