function LT() {
	this.liste_tuiles_standard = [["_c23_z012347_z56", 9],
								["_c03_v1_z07_z1456,v0", 3],
								["_c03_vb12_z07_z16,v0", 2],
								["_c3_v012_z6,v0_z7,v0", 1],
								["_vb012_z67,v0", 1],
								["_c03_v12_z07_z16,v0", 3],
								["_c0_c2_c3_v1_z07_z14,v0_z56", 3],
								["_c13_z0127_z3456", 8],
								["_c0_c2_c3_z07_z1234_z56", 4],
								["_v1_z014567,v0", 5],
								["_v0_v1_z4567,v01", 2],
								["_v012_z67,v0", 3],
								["_a_z01234567", 4],
								["_a_c3_z01234567", 2],
								["_v12_z0167,v0", 3],
								["_vb02_z23,v0_z67,v0", 2],
								["_c02_v1_z0567_z14,v0", 4], // premiere tuile
								["_c23_v1_z0147,v0_z56", 3],
								["_v02_z23,v0_z67,v0", 1],
								["_c3_vb012_z6,v0_z7,v0", 2],
								["_vb0123", 1],
								["_c0_c1_c2_c3_z07_z12_z34_z56", 1],
								["_vb12_z0167,v0", 2],
								["_v0_v2_z2367,v01", 3]];
	this.liste_tuiles_fleuve = [["_a_f02_c3_z07_z1234_z56", 1],
								["_f03_c12_z07_z1256_z34", 1],
								["_f13_c0_v2_z07_z12_z3,v0_z6,v0", 1],
								["_f12_z012567_z34", 2],
								["_f13_z0127_z3456", 2],
								["_f13_c02_z07_z12_z34_z56", 1],
								["_f12_v03_z25,v0_z34", 1],
								["_f13_v0_v2_z17,v0_z26,v1", 1]]; // sans la source ni le lac // c_f1_z01234567 x2
	this.liste_tuiles_cathedrale = [["_c3_v1_z017,v0_z456,v0", 1],
								["_v1_v2_v3_z01,v012", 1],
								["_v0_z2345,v0_z67,v0", 1],
								["_a_c0_c2_z0567_z1234", 1],
								["_c03_c12_z07_z1256_z34", 1],
								["_c1_c3_vb02_z2,v0_z3,v0_z6,v0_z7,v0", 1],
								["_v0_v1_v2_v3", 1],
								["_c1_c3_v0_v2_z2,v0_z3,v1_z6,v1_z7,v0", 1],
								["_c0_v12_z067,v0_z1,v0", 1],
								["_vb12_v3_z01,v01", 1],
								["_vc0123", 2]];
	this.liste_tuiles_lac = [["_cl02_z0567_z1234", 1],
							["_cl23_z012347_z56", 1],
							["_cl03_vb12_z07_z16,v0", 1],
							["_cl3_v12_z017,v0_z6,v0", 1],
							["_cl0_c2_c3_z07_z1234_z56", 1],
							["_cl02_v1_z0567_z14,v0", 1]];
	this.definir_ordre_des_tuiles = function() {
		var i, l, j, total, x;
		if (pa.x_f) {
			gt.t_fleuve.push("_f1_z01234567");
			for (total = 10; total > 0; total--) {
				x = Math.floor(Math.random() * total)+1;
				for (i = 0, j = 0; i < 8 && j < x; i++)
					j += this.liste_tuiles_fleuve[i][1];
				this.liste_tuiles_fleuve[i-1][1]--;
				gt.t_fleuve.push(this.liste_tuiles_fleuve[i-1][0]);
			}
			gt.t_fleuve.push("_f3_z01234567");
			total = 72;
		} else {
			gt.t_dispo.push("_c02_v1_z0567_z14,v0");
			this.liste_tuiles_standard[16][1] = 3;
			total = 71;
		}
		
		if (pa.x_c) {
			for (i = 0; i < 11; i++) {
				this.liste_tuiles_standard[24+i] = [];
				this.liste_tuiles_standard[24+i][0] = this.liste_tuiles_cathedrale[i][0];
				this.liste_tuiles_standard[24+i][1] = this.liste_tuiles_cathedrale[i][1];
			}
			total += 12;
		}
		if (pa.x_l) {
			for (i = 0, j = this.liste_tuiles_standard.length; i < 6; i++) {
				this.liste_tuiles_standard[i+j] = [];
				this.liste_tuiles_standard[i+j][0] = this.liste_tuiles_lac[i][0];
				this.liste_tuiles_standard[i+j][1] = this.liste_tuiles_lac[i][1];
			}
			total += 6;
		}
		
		for (; total > 0; total--) {
			x = Math.floor(Math.random() * total)+1;
			for (i = 0, j = 0, l = this.liste_tuiles_standard.length; i < l && j < x; i++)
				j += this.liste_tuiles_standard[i][1];
			this.liste_tuiles_standard[i-1][1]--;
			gt.t_dispo.push(this.liste_tuiles_standard[i-1][0]);
		}
	};
	
	this.definir_ordre_des_tuiles_test = function() {
		gt.t_dispo.push("_c02_v1_z0567_z14,v0");
		gt.t_dispo.push("_c0_c1_c2_c3_z07_z12_z34_z56");
		gt.t_dispo.push("_a_c3_z01234567");
		gt.t_dispo.push("_a_c3_z01234567");
		gt.t_dispo.push("_c23_z012347_z56");
	};
}