require_relative "./glsl/vec.rb"
require_relative "./glsl/mat.rb"
require_relative "./glsl/sym.rb"

module Glrb

module Glsl

class GL
        def initialize(shader = gl_defaultSahder(self))
                @shader = shader
                @FragCoord = vec 0.0, 0.0, 0.0, 0.0
                @FragColor = vec 0.0, 0.0, 0.0, 0.0
        end
        def shader() @shader end
        def FragCoord() @FragCoord end
        def FragColor() @FragColor end
        def FragCoord=(_) @FragCoord = _ end
        def FragColor=(_) @FragColor = _ end
        def <=>(_) @shader = _ end
        def shader=(_) @shader = _ end
        def draw() gl_draw(self) end
end

def gl_defaultSahder(gl)
        ->{
                gl.FragColor = vec gl.FragCoord.x / gl.w, gl.FragCoord.y / gl.h, 0.0, 1.0
        }
end

def gl_draw(gl)
        p gl.FragColor.to_f
end

end # Glsl

end # Glrb