module Glrb
        class GL
                def initialize(w = 256, h = 256, filename = "tmp.ppm", shader = gl_defaultSahder(self))
                        @filename = filename
                        @w = w
                        @h = h
                        @i = 0
                        @shader = shader
                        @FragCoord = vec 0.0, 0.0, 0.0, 0.0
                        @FragColor = vec 0.0, 0.0, 0.0, 0.0
                end
                def i() @i end
                def w() @w end
                def h() @h end
                def i=(_) @i = _ end
                def w=(_) @w = _ end
                def h=(_) @h = _ end
                def shader() @shader end
                def FragCoord() @FragCoord end
                def FragColor() @FragColor end
                def FragCoord=(_) @FragCoord = _ end
                def FragColor=(_) @FragColor = _ end
                def <=>(_) @shader = _ end
                def shader=(_) @shader = _ end
                def [](_) gl_render(self, _) end
                def test() gl_test(self) end
                def draw() gl_draw(self) end
        end

        def gl_defaultSahder(gl)
                ->{
                        gl.FragColor = vec gl.FragCoord.x / gl.w, gl.FragCoord.y / gl.h, 0.0, 1.0
                }
        end


        def gl_render (gl, i)
                gl.i = i
                gl.FragCoord = vec (i % gl.w).to_f + 0.5, i.to_f / gl.w.to_f + 0.5, 0, 0
                gl.FragColor = gl.shader.call
        end

        def gl_test (gl)
                (gl.w.to_i * gl.h.to_i).times.inject("") do |acc, i|
                        col = gl[i].map(->v, i{v.clamp(0, 1)})
                        c = (col[3] * col.xyz.sum / 3 <= 0.5) ? "_ " : "# "
                        ret = acc + c + ((i % gl.w.to_i == gl.w.to_i - 1) ? "\n" : "")
                end
        end

        def gl_draw(gl)
                open(@filename, "wb") do |f|
                        f.puts("P6\n#{gl.w} #{gl.h}\n255")
                        (gl.w.to_i * gl.h.to_i).times do |i|
                                col = gl[i].map(->v, i{(v.clamp(0, 1) * 255).to_i})
                                f.write(col.to_a.pack("ccc"))
                        end
                end
        end
end