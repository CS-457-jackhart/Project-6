#version 330 compatibility

uniform float X_Amp;
uniform float Y_Amp;
uniform float Z_Amp;
uniform float Period;

out  vec3  vN;			// normal vector
out  vec3  vL;			// vector from point to light
out  vec3  vE;			// vector from point to eye
out	vec3	 vDifference;	// Magnitude of difference after changes

const vec3 LightPosition = vec3(0., 5., 5.);

void
main()
{
	float add_X = X_Amp * sin(Period * gl_Vertex.y);
	float add_Y = Y_Amp * sin(Period * gl_Vertex.x);
	float add_Z = Z_Amp * sin(Period * length(gl_Vertex));

	gl_Position = gl_ModelViewProjectionMatrix * (gl_Vertex + vec4(add_X, add_Y, add_Z, 0));
	vDifference = vec3(add_X, add_Y, add_Z);

	vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;
	vN = normalize(gl_NormalMatrix * gl_Normal);			// normal vector
	vL = LightPosition - ECposition.xyz;				// vector from the point to the light position
	vE = vec3(0., 0., 0.) - ECposition.xyz;				// vector from the point to the eye position

}
