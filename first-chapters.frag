// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 v){
    return smoothstep(0.02, 0.0, abs(v.y - v.x));
}

float plot(vec2 v, float percentage){
    return smoothstep(percentage - 0.02, percentage, v.y)
        - smoothstep(percentage, percentage + 0.02, v.y);
}

float hard_plot(vec2 v, float percentage){
    return step(percentage - 0.02, v.y)
        - step(percentage + 0.02, v.y);
}

void main() {
	vec2 current = gl_FragCoord.xy/u_resolution;
    
    //float y = pow(current.x, 5.0);
    //float y = pow(current.x, PI);
    //float y = exp(current.x - PI);
    //float y = log(current.x * PI);
    //float y = sqrt(current.x / PI);
    //float y = step(0.5, current.x);
    //float y = smoothstep(0.1, 0.9, current.x);
    
    //float y = (sin(u_time + (current.x * 5.0)) * 0.5) + 0.5;
    
    float y = 1.0 - pow(current.x, 5.0);
    
    vec3 color = vec3(y);
    
    float percent = plot(current, y);
    
    color = (1.0 - percent) * color + percent * vec3(0.0, 1.0, 0.0);
    
    gl_FragColor = vec4(color, 1.0);
}