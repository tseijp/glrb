require 'glrb'
include Glrb
include Math

# TODO IMPLEMENT GLRB
def w(x) v = x.to_a; v[3] end
def xxx(x) v = x.to_a; vec(v[0], v[0], v[0]) end
def yyy(x) v = x.to_a; vec(v[1], v[1], v[1]) end
def zzz(x) v = x.to_a; vec(v[2], v[2], v[2]) end
def xzx(x) v = x.to_a; vec(v[0], v[2], v[0]) end
def wyz(x) v = x.to_a; vec(v[3], v[1], v[2]) end
def xxyy(x) v = x.to_a; vec(v[0], v[0], v[1], v[1]) end
def zzww(x) v = x.to_a; vec(v[2], v[2], v[3], v[3]) end
def yyyy(x) v = x.to_a; vec(v[1], v[1], v[1], v[1]) end
def xzyw(x) v = x.to_a; vec(v[0], v[2], v[1], v[3]) end

def _abs(v) v.abs end
def _stp(a, x) a < x ? 1.0 : 0.0 end
def _floor(v) v.floor end
def _min(a, b) a < b ? a : b end
def _max(a, b) a < b ? b : a end

def abs(v) isVec(v) ? v.map(->vv, i{_abs(vv)}) : _abs(v) end
def stp(a, x) isVec(a) ? a.map(->v, i{_stp(v, x[i])}) : _stp(a, x) end
def floor(v) isVec(v) ? v.map(->vv, i{_floor(vv)}) : _floor(v) end
def min(a, b) isVec(a) ? a.map(->v, i{_min(v, b[i])}) : _min(a, b) end
def max(a, b) isVec(a) ? a.map(->v, i{_max(v, b[i])}) : _max(a, b) end

def mod289(x) x - floor(x * (1.0 / 289.0)) * 289.0 end
def permute(v) mod289(((v * 34.0) + 1.0) * v) end
def taylorInvSqrt(r) -r * 0.85373472095314 + 1.79284291400159 end

def snoise(v)
        # c = vec(1.0 / 6.0, 1.0 / 3.0)
        cxxx = vec(1.0 / 6.0, 1.0 / 6.0, 1.0 / 6.0)
        cyyy = vec(1.0 / 3.0, 1.0 / 3.0, 1.0 / 3.0)
        # d = vec(0.0, 0.5, 1.0, 2.0)
        dxzx = vec(0.0, 1.0, 0.0)
        dyyy = vec(0.5, 0.5, 0.5)
        dwyz = vec(2.0, 0.5, 1.0)


        #  First corner
        i  = floor(v + dot(v, cyyy))
        x0 =       v - i + dot(i, cxxx)

        #  Other corners
        g = stp(x0.yzx, x0.xyz)
        l = -g + 1.0
        i1 = min( g.xyz, l.zxy )
        i2 = max( g.xyz, l.zxy )

        x1 = x0 - i1 + cxxx
        x2 = x0 - i2 + cyyy
        x3 = x0 - dyyy

        #  Permutations
        i = mod289(i)
        p = permute( permute( permute( \
                  vec(0.0, i1.z, i2.z, 1.0) + i.z) \
                + vec(0.0, i1.y, i2.y, 1.0) + i.y) \
                + vec(0.0, i1.x, i2.x, 1.0) + i.x)

        #  Gradients: 7x7 points over a square, mapped onto an octahedron.
        #  The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
        n_ = 0.142857142857 # 1.0 / 7.0
        ns = dwyz * n_ - dxzx

        j = p - floor(p * ns.z * ns.z) * 49.0

        x_ = floor(j * ns.z)
        y_ = floor(j - x_ * 7.0)

        x = x_ * ns.x + yyyy(ns)
        y = y_ * ns.x + yyyy(ns)
        h = - abs(x) - abs(y) + 1.0

        b0 = vec(x.x, x.y, y.x, y.y)
        b1 = vec(x.z, w(x), y.z, w(y))

        s0 = floor(b0) * 2.0 + 1.0
        s1 = floor(b1) * 2.0 + 1.0
        sh = -stp(h, vec(0.0, 0.0, 0.0, 0.0))

        a0 = xzyw(b0) + xzyw(s0) * xxyy(sh)
        a1 = xzyw(b1) + xzyw(s1) * zzww(sh)

        p0 = vec(a0.x, a0.y, h.x)
        p1 = vec(a0.z, w(a0), h.y)
        p2 = vec(a1.x, a1.y, h.z)
        p3 = vec(a1.z, w(a1), w(h))

        # Normalise gradients
        norm = taylorInvSqrt(vec(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)))

        p0 *= norm.x
        p1 *= norm.y
        p2 *= norm.z
        p3 *= w(norm)

        # Mix final noise value
        doted = vec(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3))
        m = max(-doted + 0.6, vec(0.0, 0.0, 0.0, 0.0))
        m = m * m
        m = m * m
        n = vec(dot(p0, x0), dot(p1, x1), dot(p2,x2), dot(p3, x3))
        return dot(m, n) * 42.0
end

def fbm(pos)
        #  Initial values
        value = vec(0.0, 0.0, 0.0)
        amplitud = 0.5

        #  Loop of octaves
        4.times do
                value += snoise(pos) * amplitud
                pos *= 2.0
                amplitud *= 0.5
        end
        value
end

gl = GL.new 64, 64

gl <=> ->{
        st = gl.FragCoord.xy / vec(gl.w, gl.h)
        pos = vec(st.x, st.y, 0.0)
        col = fbm(pos) * 0.5 + 0.5
        p col
        gl.FragColor = vec col, col, col, 1.0
}

gl.draw