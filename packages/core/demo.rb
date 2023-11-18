require "glrb"
include Glrb
include Math

def min(d1, d2) d1 < d2 ? d1 : d2 end
def max(d1, d2) d1 > d2 ? d1 : d2 end
def mix(x, y, a) x * (1.0 - a) + y * a  end
def abs(v) v.map(->v, i{v > 0 ? v : -v}) end
def rot(a)
        c = cos(a)
        s = sin(a)
        mat [c, -s], [s, c]
end

def sphere(pos)
        length(pos) - 1.5

end

def deathstar(pos)
        ra = 1.0
        rb = 1.0
        d = 1.25
        a = (ra * ra - rb * rb + d * d) / (2.0 * d)
        b = sqrt max(ra * ra - a * a, 0.0)
        p = vec pos.z, length(pos.xy)
        if p.x * b - p.y * a > d * max(b - p.y, 0.0)
                return length p - vec(a, b)
        else
                return max(
                        length(p) - ra,
                        -length(p - vec(d, 0.0)) + rb
                )
        end
end

def mandel_impl(pos)
        power = 2.0
        z = pos
        dr = 1.0
        r = 0.0
        8.times do
                r = length(z)
                if r > 10.0
                        break
                end
                theta = acos(z.z / r) * power
                phi = atan2(z.y, z.x) * power
                dr = r ** (power - 1.0) * power * dr
                zr = r ** (power)
                dx = sin(theta) * cos(phi)
                dy = cos(theta)
                dz = sin(theta) * sin(phi)
                z = vec(dx, dy, dz) * zr + pos
        end
        0.5 * log(r) * r / dr
end

def mandel(pos)
        k = 5.0
        v = rot(k * pos.y) * pos.xz
        mandel_impl vec(v.x, v.y, pos.y)
end

def menger_impl(pos)
        offset = 0.9
        scale = 2.25
        z = vec(pos.x, pos.y, pos.z)
        8.times do
                z = abs(z)
                z = z.y < z.z ? z.xzy : z.xyz
                z = z * scale
                z = z - offset * (scale - 1.0)
                if z.z < -0.5 * offset * (scale - 1.0)
                        z = vec(z.x, z.y, z.z + offset * (scale - 1.0))
                end
        end
        z0 = abs(z) - vec(1.0, 1.0, 1.0)
        z1 = vec(max(z.x, 0.0), max(z.y, 0.0), max(z.z, 0.0))
        return length(z1) / 750.0
end

def menger(pos)
        k = 3.6
        v = rot(k * pos.y) * pos.xz
        menger_impl vec(v.x, v.y, pos.y)
end

def map(pos)
        res = length(pos) - 2.0
        if (res >= 0.0) then return res end
        res = deathstar pos
        res = max res, mandel(pos)
        res = max res, menger(pos)
        res
end

def normal(pos, d)
        e = vec(0.005, 0.0, 0.0)
        !vec(
                map(pos + e.xyz) - d,
                map(pos + e.zxy) - d,
                map(pos + e.yzx) - d
        )
end

def palette_impl(t, a, b, c, d)
        ((c * t + d) * 6.28318).map(->v, i{cos(v)})* b + a
end

def palette(t)
        palette_impl(
                t,
                vec(0.5, 0.5, 0.5),
                vec(0.25, 0.25, 0.25),
                vec(1.0, 1.0, 1.0),
                vec(0.5, 0.4, 0.3)
        )
end

def material(pos, nor)
        light = vec(0.5, 0.5, 0.5)
        a = vec(0.66, 0.78, 0.93)
        b = palette(pos.y)
        col = mix(a, b, -nor.y * 0.5 + 0.5)
        col = col * dot(nor, light) * 2.0
        col = col * 0.5 + nor.y
        col = col * exp(pos.y) * 0.5 + col * 0.5
        col
end

gl = GL.new 1280, 800

gl <=> ->{
        e = vec(0.00001, 0.0, 0.0)
        x = gl.FragCoord.x - 0.5 * gl.w
        y = gl.FragCoord.y - 0.5 * gl.h
        eye = vec 0.0, 0.0, 1.75
        dir = !(vec x, y, -min(gl.w, gl.h) * 0.5)
        p = eye + dir
        d = map p

        64.times do
                if d < e.x
                        n = normal p, d
                        return material p, n
                end
                p = p + dir * d
                if (length(p) > 4.0) then break end
                d = map p
        end

        return vec 0.0, 0.0, 0.0, 1.0
}

gl.draw