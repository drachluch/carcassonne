function phx_decaler_plateau_x(sens) {
	phase = 0;
	if (sens) {
		if (pl.x_decal > -(pl.x_max-pl.x_min)+3) {
			pl.x_decal--;
			document.getElementById("plateau").style.left = (pl.x_decal*70)+"px";
			db.decaler(-1, 0);
			ap.decaler(-1, 0);
		}
	} else {
		if (pl.x_decal < 0) {
			pl.x_decal++;
			document.getElementById("plateau").style.left = (pl.x_decal*70)+"px";
			db.decaler(+1, 0);
			ap.decaler(+1, 0);
		}
	}
	if (tj.phase != 0)
		rs.activer("t");
	phase = tj.phase;
}

function phx_decaler_plateau_y(sens) {
	phase = 0;
	if (sens) {
		if (pl.y_decal > -(pl.y_max-pl.y_min)+3) {
			pl.y_decal--;
			document.getElementById("plateau").style.top = (pl.y_decal*70)+"px";
			db.decaler(0, -1);
			ap.decaler(0, -1);
		}
	} else {
		if (pl.y_decal < 0) {
			pl.y_decal++;
			document.getElementById("plateau").style.top = (pl.y_decal*70)+"px";
			db.decaler(0, +1);
			ap.decaler(0, +1);
		}
	}
	if (tj.phase != 0)
		rs.activer("t");
	phase = tj.phase;
}

function phx_decaler_plateau_init() {
	phase = 0;
	db.decaler(-pl.x_decal, -pl.y_decal);
	ap.decaler(-pl.x_decal, -pl.y_decal);
	pl.x_decal = 0;
	pl.y_decal = 0;
	document.getElementById("plateau").style.left = "0px";
	document.getElementById("plateau").style.top = "0px";
	if (tj.phase != 0)
		rs.activer("t");
	phase = tj.phase;
}