require "glrb"
include Glrb
include Math

RSpec.describe GL do
        before(:each) do
                @gl = GL.new
        end

        it "initialize" do
                expect(@gl).to be_a GL
        end

        it "basic render" do
                @gl <=> ->{
                        x = @gl.FragCoord.x / @gl.w
                        y = @gl.FragCoord.y / @gl.h
                        c = (vec(x, y) - 0.5).length
                        @gl.FragColor = vec c, c, c, 1.0
                }
                # @gl.draw
        end

        it "noise" do
                def fract(n) n - n.floor end
                def mix(x, y, a) x * (1.0 - a) + y * a  end
                def rand(n) fract(sin(n.dot(vec(12.9898, 4.1414))) * 43758.5453) end
                def noise(p)
                        ip = p.map(->v, i{v.floor})
                        u = p.map(->v, i{fract(v)})
                        u = u * u * (u * 2.0 - u)
                        res = mix(
                                mix(rand(ip), rand(ip + vec(1.0, 0.0)), u.x),
                                mix(rand(ip + vec(0.0, 1.0)), rand(ip + vec(1.0,1.0)), u.x),
                                u.y
                        );
                        return res * res;
                end

                @gl <=> ->{
                        c = noise(@gl.FragCoord.xy / 2.0)
                        @gl.FragColor = vec c, c, c, 1.0
                }
                # @gl.draw
        end

        it "raymarch" do
                def df(p)
                        p.length - 100.0
                end

                @gl <=> ->{
                        x = @gl.FragCoord.x - @gl.w / 2.0
                        y = @gl.FragCoord.y - @gl.h / 2.0
                        e = vec 0.0005, 0.0, 0.0
                        p = vec x, y, -10.0
                        d = df p

                        64.times do |i|
                                if d < e.x
                                        dx = df(p + e.xyz) - df(p - e.xyz)
                                        dy = df(p + e.zxy) - df(p - e.zxy)
                                        dz = df(p + e.yzx) - df(p - e.yzx)
                                        n = !vec(dx, dy, dz)
                                        c = dot(n, vec(1.0, 1.0, -10.0))
                                        return vec(c, c, c, 1)
                                end
                                p = p + d
                                d = df(p)
                        end
                        return vec 0.0, 0.0, 0.0, 1.0
                }
                # @gl.draw
        end
end
