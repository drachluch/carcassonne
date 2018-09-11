function BV(x, y) {
	this.id_ev = false;
	
	this.x = x;
	this.y = y;
	this.cs = [];
	this.ts = [];
	this.blason = false;
	this.cathedrale = false;
	
	this.read = function(d1, rotation) {
		var d = d1.split('');
		var c = [];
		for (var i = 0, j, l = d.length; i < l; i++)
			switch(d[i]) {
				case 'b': this.blason = true; break;
				case 'c': this.cathedrale = true; break;
				case '0': c.push(0); break;
				case '1': c.push(1); break;
				case '2': c.push(2); break;
				case '3': c.push(3); break;
				default: break;
			}
		for (i = 0, j, l = c.length; i < 4; i++)
			for (j = 0; j < l; j++)
				if ((parseInt(c[j])+rotation)%4 == i) {
					this.cs[this.cs.length] = i;
					this.ts[this.ts.length] = false;
					break;
				}
	};
}