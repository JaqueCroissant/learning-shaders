// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 color_a = vec3(1.0,0.0,0.0);
vec3 color_b = vec3(0.0,0.0,1.0);

float ease_in_back(float n){
// https://easings.net/#easeInBack
    float c1 = 1.70158;
    float c3 = c1 + 1.0;
    
    return c3 * n * n * n - c1 * n * n;
}

float ease_out_bounce(float n){
// https://easings.net/#easeOutBounce
    float n1 = 7.5625;
    float d1 = 2.75;
    
    if(n < 1.0 / d1){
        return n1 * n * n;
    }
    else if(n < 2.0 / d1){
        return n1 * (n -= 1.5 / d1) * n + 0.75;
    }
    else if(n < 2.5 / d1){
        return n1 * (n -= 2.25 / d1) * n + 0.9375;
    }
    else{
        return n1 * (n -= 2.625 / d1) * n + 0.984375;
    }
}

float ease_in_bounce(float n){
// https://easings.net/#easeInBounce
    return 1.0 - ease_out_bounce(1.0 - n);
}

float ease_in_out_bounce(float n){
// https://easings.net/#easeInOutBounce
    return n < 0.5
        ? (1.0 - ease_out_bounce(1.0 - 2.0 * n)) / 2.0
        : (1.0 + ease_out_bounce(2.0 * n - 1.0)) / 2.0;
}

void main() {

    // multiplying u_time determines frequency of sin
    float percentage = abs(ease_in_out_bounce(sin(u_time * 0.5)));
    vec3 color = mix(color_a, color_b, percentage);
    
    gl_FragColor = vec4(color, 1.0);
}