function BZ(x, y) {
	this.id_ez = false;
	
	this.x = x;
	this.y = y;
	this.cs = [];
	this.ts = [];
	this.id_bvA = []; // bout de ville adjacent
	
	this.read = function(d1, rotation) {
		var d = d1.split('');
		var c = [];
		for (var i = 0, j, l = d.length; i < l; i++) {
			if (d[i] == ',') {
				if (d[i+1] == 'v')
					for (i += 2; i < l; i++)
						this.id_bvA[this.id_bvA.length] = d[i];
				break;
			} else if (d[i] == '0' || d[i] == '1' || d[i] == '2' || d[i] == '3' || d[i] == '4' || d[i] == '5' || d[i] == '6' || d[i] == '7')
				c[c.length] = (parseInt(d[i])+(rotation*2))%8;
		}
		for (i = 0, j, l = c.length; i < 8; i++)
			for (j = 0; j < l; j++)
				if (c[j] == i) {
					this.cs[this.cs.length] = i;
					this.ts[this.ts.length] = false;
					break;
				}
	};
	
	this.recevoir_id_bvA = function(id_bv) {
		for (var i = 0, l = this.id_bvA.length; i < l; i++)
			this.id_bvA[i] = id_bv[this.id_bvA[i]];
	};
}