class GL
        def initialize(w, h, filename = "")
                @filename = filename
                @w = w
                @h = h
                @i = 0
                @FragCoord = vec 0, 0, 0, 0
                @FragColor = vec 0, 0, 0, 0
        end
        def i() @i end
        def w() @w end
        def h() @h end
        def w=(_) @w = _ end
        def h=(_) @h = _ end
        def FragCoord=(_) @FragCoord <=> _ end
        def FragColor=(_) @FragColor <=> _ end
        def FragCoord(i = @i) @i = i; @FragCoord end
        def FragColor(i = @i) @i = i; @FragColor end
        def drawArrays(count) gl_draw(self, count) end
        def test() gl_test(self) end
end

def gl_draw(gl, count)
      open(@filename, "wb") do |f|
              f.puts("P6\n#{gl.w} #{gl.h}\n255")
              (gl.w * gl.h).times do |i|
                      c = gl.FragColor(i) * 255
                      f.write([c.x.to_i % 255, c.y.to_i % 255, c.z.to_i % 255].pack("ccc"))
              end
      end
end

def gl_test (gl)
        (gl.w * gl.h).times.inject("") do |acc, i|
                col = gl.FragColor(i)
                ret = acc + (col[3] * col.xyz.sum / 3 <= 0.5 ? " # " : " _ ")
                if (i % w == w - 1) then puts ret; ret = "" end
                ret
        end
end
