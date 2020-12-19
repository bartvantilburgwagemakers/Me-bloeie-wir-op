function Spheroid(a, b) {
	this.a = a;
	this.b = b;
	this.R = Math.pow(a * a * b, 1/3);
}

Spheroid.prototype.cylindrics = function(phi) {
	var	a = this.a,
		b = this.b,

		u = a * Math.cos(phi),
		v = b * Math.sin(phi),
		w = Math.sqrt(u * u + v * v),

		r = a * u / w,
		z = b * v / w,
		R = Math.sqrt(r * r + z * z);

	return { r : r, z : z, R : R };
}

Spheroid.prototype.cos = function(p1, p2, dLambda) {
	return (p1.z * p2.z + p1.r * p2.r * Math.cos(dLambda)) / (p1.R * p2.R);
};

Spheroid.prototype.distance = function(phi1, phi2, dLambda) {
	var	p1 = this.cylindrics(phi1),
		p2 = this.cylindrics(phi2),
		cos_alpha = this.cos(p1, p2, dLambda),
		R = this.R;

	return R * Math.acos(cos_alpha);
};

Spheroid.prototype.smallDistance = function(phi1, phi2, dLambda) {
	var	p1 = this.cylindrics(phi1),
		p2 = this.cylindrics(phi2),

		r1 = p1.r,
		r2 = p2.r,

		dz = p1.z - p2.z,
		dr2 = r1 * r1 + r2 * r2 - 2 * r1 * r2 * Math.cos(dLambda),
		d = Math.sqrt(dz * dz + dr2),

		cos_alpha = this.cos(p1, p2, dLambda),
		R = d / Math.sqrt(2 * (1 - cos_alpha));

	return R * Math.acos(cos_alpha);
};

Spheroid.prototype.scos = function(phi1, phi2, dLambda) {
	return Math.sin(phi1) * Math.sin(phi2) +
		Math.cos(phi1) * Math.cos(phi2) * Math.cos(dLambda);
};

Spheroid.prototype.sphericalDistance = function(phi1, phi2, dLambda) {
	var	R = this.R,
		cos_alpha = this.scos(phi1, phi2, dLambda);

	return R * Math.acos(cos_alpha);
};

Spheroid.prototype.differentialDistance = function(phi1, phi2, dLambda) {
	/*	dsÂ² = rÂ²Â·dÏ†Â² + RÂ²Â·cosÂ²Î±Â·dÎ»Â²
		r = bÂ²/âˆš(bÂ² + (aÂ² - bÂ²)Â·cosÂ²Ï†)
		RÂ·cosÎ± = aÂ²/âˆš(aÂ² + bÂ²Â·tanÂ²Ï†)
	*/

	var	phi = (phi1 + phi2)/2,
		dPhi = phi1 - phi2,

		a2 = this.a * this.a,
		b2 = this.b * this.b,

		cos_phi = Math.cos(phi),
		tan_phi = Math.tan(phi),

		R2_cos2_alpha = (a2 * a2) / (a2 + b2 * tan_phi * tan_phi),
		r2 = (b2 * b2) / (b2 + (a2 - b2) * cos_phi * cos_phi);

	return Math.sqrt(r2 * dPhi * dPhi + R2_cos2_alpha * dLambda * dLambda);
};

Spheroid.prototype.vincentyDistance = function(phi1, phi2, dLambda) {
	// adaption of this LGPL licensed script by Chris Veness:
	// http://www.movable-type.co.uk/scripts/latlong-vincenty.html

	var	limit = this.vincentyLimit,
		eps = this.vincentyAccuracy,

		a = this.a,
		b = this.b,
		L = dLambda,
		f = (a - b) / a,

		U1 = Math.atan((1 - f) * Math.tan(phi1)),
		U2 = Math.atan((1 - f) * Math.tan(phi2)),

		sin_U1 = Math.sin(U1),
		cos_U1 = Math.cos(U1),
		sin_U2 = Math.sin(U2),
		cos_U2 = Math.cos(U2),

		lambda = L;

	do {
		var	sin_lambda = Math.sin(lambda),
			cos_lambda = Math.cos(lambda),
			sin_sigma = Math.sqrt(
				(cos_U2 * sin_lambda) * (cos_U2 * sin_lambda) +
				(cos_U1 * sin_U2 - sin_U1 * cos_U2 * cos_lambda) *
				(cos_U1 * sin_U2 - sin_U1 * cos_U2 * cos_lambda));

		if(sin_sigma === 0) // co-incident points
			return 0;

		var	cos_sigma = sin_U1 * sin_U2 + cos_U1 * cos_U2 * cos_lambda,
			sigma = Math.atan2(sin_sigma, cos_sigma),
			sin_alpha = cos_U1 * cos_U2 * sin_lambda / sin_sigma,
			cos2_alpha = 1 - sin_alpha * sin_alpha,
			cos_2sigma_m = cos_sigma - 2 * sin_U1 * sin_U2 / cos2_alpha;

		if(isNaN(cos_2sigma_m)) // equatorial line: cosÂ²Î± = 0
			cos_2sigma_m = 0;

		var	C = f/16 * cos2_alpha * (4 + f * (4 - 3 * cos2_alpha)),
			lambda_p = lambda;

		lambda = L + (1 - C) * f * sin_alpha *
			(sigma + C * sin_sigma * (cos_2sigma_m + C * cos_sigma *
				(-1 + 2 * cos_2sigma_m * cos_2sigma_m)));
	}
	while(Math.abs(lambda - lambda_p) > eps && --limit);

	if(!limit)
		return NaN;

	var	u_sq = cos2_alpha * (a * a - b * b) / (b * b),
		A = 1 + u_sq/16384 * (4096 + u_sq * (-768 + u_sq * (320 - 175 * u_sq))),
		B = u_sq/1024 * (256 + u_sq * (-128 + u_sq * (74 - 47 * u_sq))),
		dSigma = B * sin_sigma * (cos_2sigma_m + B/4 *
			(cos_sigma * (-1 + 2 * cos_2sigma_m * cos_2sigma_m) -
				B/6 * cos_2sigma_m *
					(-3 + 4 * sin_sigma * sin_sigma) *
					(-3 + 4 * cos_2sigma_m * cos_2sigma_m)));

	return b * A * (sigma - dSigma);
};

Spheroid.prototype.vincentyLimit = 100;
Spheroid.prototype.vincentyAccuracy = 1e-12; // 0.06mm error

Spheroid.wgs84 = (function() {
	var	a = 6378137, inv_f = 298.257223563;
	return new Spheroid(a, a * (inv_f - 1) / inv_f);
})();