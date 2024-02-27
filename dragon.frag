// make this 120 for the mac:
#version 330 compatibility

float   uKa = 0.1f;
float   uKd = 0.5f;
float   uKs = 0.4f;			// coefficients of each type of lighting -- make sum to 1.0
float   uShininess = 12.f;	// specular exponent

in  vec3  vN;		   // normal vector
in  vec3  vL;		   // vector from point to light
in  vec3  vE;		   // vector from point to eye
in  vec3  vDifference;

void
main( )
{
	vec3 Normal = normalize(vN);
	vec3 Light = normalize(vL);
	vec3 Eye = normalize(vE);
	vec3 myColor = vec3(1., 1., 1.) - vDifference;	// Negative of difference vector
	vec3 mySpecularColor = vec3(1., 1., 1.);		// whatever default color you'd like

	vec3 ambient = uKa * myColor;
	float d = 0.;
	float spec = 0.;
	if (dot(Normal, Light) > 0.) // only do specular if the light can see the point
	{
		d = dot(Normal, Light);
		vec3 ref = normalize(reflect(-Light, Normal)); // reflection vector
		spec = pow(max(dot(Eye, ref), 0.), uShininess);
	}
	vec3 diffuse = uKd * d * myColor;
	vec3 specular = uKs * spec * mySpecularColor;
	gl_FragColor = vec4(ambient + diffuse + specular, 1.);
}