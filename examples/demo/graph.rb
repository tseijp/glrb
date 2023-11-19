require "glrb"
include Glrb
include Math

def stp(a, x) a < x ? 1.0 : 0.0 end
def mod(x, y) x - (x / y).floor * y end
def clamp(x, a, b) x < a ? a : b < x ? b : x end
def grid(x, w, r)
        stp(-w, mod(x + w / 2.0, r)) * stp(mod(x + w / 2.0, r), w)
end
def stroke(y, x, w)
        clamp(stp(x, y + w * 0.5) - stp(x, y - w * 0.5), 0.0, 1.0)
end

gl = GL.new 256.0, 256.0

a = vec 1.0, 1.0, 0.0
b = vec 0.0, 1.0, 1.0
c = vec 0.2, 0.4, 0.2
w = 0.01
col = vec 0.0, 0.0, 0.0

gl <=> ->{
        st = gl.FragCoord.xy / vec(gl.w, gl.h)
        x = st.x * 10.0
        col += a * stroke(st.y, sin(x) * 0.25 + 0.5, w)
        col += b * stroke(st.y, cos(x) * 0.25 + 0.5, w)
        col += c * grid(st.x, w * 0.5, 0.1)
        col += c * grid(st.y, w * 0.5, 0.1)
        gl.FragColor = vec col.x, col.y, col.z, 1.0
}

gl.draw

