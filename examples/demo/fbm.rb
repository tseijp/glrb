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
def xzyw(x) v = x.to_a; vec(v[0], v[2], v[1], v[3]) end
def zzww(x) v = x.to_a; vec(v[2], v[2], v[3], v[3]) end
def yyyy(x) v = x.to_a; vec(v[1], v[1], v[1], v[1]) end

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
        x0 = v - i + dot(i, cxxx)

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

        # TODO IMPLEMENT GLRB
        ix, iy, iz = i1.to_a
        i1x, i1y, i1z = i1.to_a
        i2x, i2y, i2z = i1.to_a

        p = permute( permute( permute( \
                  vec(0.0, i1z, i2z, 1.0) + iz) \
                + vec(0.0, i1y, i2y, 1.0) + iy) \
                + vec(0.0, i1x, i2x, 1.0) + ix)

        #  Gradients: 7x7 points over a square, mapped onto an octahedron.
        #  The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
        n_ = 0.142857142857 # 1.0 / 7.0
        ns = dwyz * n_ - dxzx

        # TODO IMPLEMENT GLRB
        nsx, nsy, nsz = ns.to_a

        j = p - floor(p * nsz * nsz) * 49.0

        x_ = floor(j * nsz)
        y_ = floor(j - x_ * 7.0)

        x = x_ * nsx + vec(nsy, nsy, nsy, nsy) # n.yyyy
        y = y_ * nsx + vec(nsy, nsy, nsy, nsy) # n.yyyy
        h = - abs(x) - abs(y) + 1.0

        # TODO IMPLEMENT GLRB
        xx, xy, xz, xw = x.to_a
        yx, yy, yz, yw = y.to_a
        hx, hy, hz, hw = h.to_a

        b0 = vec(xx, xy, yx, yy)
        b1 = vec(xz, xw, yz, yw)

        s0 = floor(b0) * 2.0 + 1.0
        s1 = floor(b1) * 2.0 + 1.0
        sh = -stp(h, vec(0.0, 0.0, 0.0, 0.0))

        # TODO IMPLEMENT GLRB
        # a0 = xzyw(b0) + xzyw(s0) * xxyy(sh)
        # a1 = xzyw(b1) + xzyw(s1) * zzww(sh)
        b0x, b0y, b0z, b0w = b0.to_a
        b1x, b1y, b1z, b1w = b1.to_a
        s0x, s0y, s0z, s0w = s0.to_a
        s1x, s1y, s1z, s1w = s1.to_a
        shx, shy, shz, shw = sh.to_a
        a0 = vec(b0x, b0z, b0y, b0w) + vec(s0x, s0z, s0y, s0w) * vec(shx, shx, shy, shy)
        a1 = vec(b1x, b1z, b1y, b1w) + vec(s1x, s1z, s1y, s1w) * vec(shz, shz, shw, shw)

        a0x, a0y, a0z, a0w = a0.to_a
        a1x, a1y, a1z, a1w = a1.to_a

        p0 = vec(a0x, a0y, hx)
        p1 = vec(a0z, a0w, hy)
        p2 = vec(a1x, a1y, hz)
        p3 = vec(a1z, a1w, hw)

        # Normalise gradients
        # TODO IMPLEMENT GLRB
        # norm = taylorInvSqrt(vec(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)))
        p0x, p0y, p0z = p0.to_a
        p1x, p1y, p1z = p1.to_a
        p2x, p2y, p2z = p2.to_a
        p3x, p3y, p3z = p3.to_a

        norm = taylorInvSqrt(vec( \
                (p0x * p0x + p0y * p0y + p0z * p0z), \
                (p1x * p1x + p1y * p1y + p1z * p1z), \
                (p2x * p2x + p2y * p2y + p2z * p2z), \
                (p3x * p3x + p3y * p3y + p3z * p3z) \
        ))

        # TODO IMPLEMENT GLRB
        normx, normy, normz, normw = norm.to_a

        p0 *= normx
        p1 *= normy
        p2 *= normz
        p3 *= normw

        # Mix final noise value
        # TODO IMPLEMENT GLRB
        # doted = vec(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3))
        x0x, x0y, x0z = x0.to_a
        x1x, x1y, x1z = x1.to_a
        x2x, x2y, x2z = x2.to_a
        x3x, x3y, x3z = x3.to_a
        doted = vec( \
                (x0x * x0x + x0y * x0y + x0z * x0z), \
                (x1x * x1x + x1y * x1y + x1z * x1z), \
                (x2x * x2x + x2y * x2y + x2z * x2z), \
                (x3x * x3x + x3y * x3y + x3z * x3z) \
        )

        m = max(-doted + 0.6, vec(0.0, 0.0, 0.0, 0.0))
        m = m * m
        m = m * m
        # TODO IMPLEMENT GLRB
        # n = vec(dot(p0, x0), dot(p1, x1), dot(p2,x2), dot(p3, x3))
        n = vec( \
                (p0x * x0x + p0y * x0y + p0z * x0z), \
                (p1x * x1x + p1y * x1y + p1z * x1z), \
                (p2x * x2x + p2y * x2y + p2z * x2z), \
                (p3x * x3x + p3y * x3y + p3z * x3z) \
        )

        return dot(m, n) * 42.0
end

def fbm(pos)
        #  Initial values
        value = 0.0
        amplitud = 0.5

        #  Loop of octaves
        3.times do
                value += snoise(pos) * amplitud
                pos *= 2.0
                amplitud *= 0.5
        end
        value
end

gl = GL.new 64, 64, "fbm.ppm"

gl <=> ->{
        x = gl.FragCoord.x / gl.w
        y = gl.FragCoord.y / gl.h
        pos = vec(x, y, 0.0)
        col = fbm(pos) * 0.5 + 0.5
        gl.FragColor = vec col, col, col, 1.0
}

gl.draw