require_relative "./glsl/vec.rb"
require_relative "./glsl/mat.rb"
require_relative "./glsl/sym.rb"
require_relative './utils/helpers'

module Glrb

module Glsl

include Glrb::Utils

class GL
        def initialize(shader = gl_defaultSahder(self))
                @wh = Vec.new "iResolution"
                @w = @wh.x
                @h = @wh.y
                @shader = shader
                @FragCoord = Vec.new "gl_FragCoord"
                @FragColor = Vec.new "gl_FragColor"
        end
        def w() @w end
        def h() @h end
        def w=(_) @w = _ end
        def h=(_) @h = _ end
        def shader() @shader end
        def FragCoord() @FragCoord end
        def FragColor() @FragColor end
        def FragCoord=(_) @FragCoord = _ end
        def FragColor=(_) @FragColor = _ end
        def <=>(_) @shader = _ end
        def shader=(_) @shader = _ end
        def test() gl_test(self) end
        def draw() gl_draw(self) end
end

def gl_defaultSahder(gl)
        ->{
                gl.FragColor = vec gl.FragCoord.x / gl.w, gl.FragCoord.y / gl.h, 0.0, 1.0
        }
end

def gl_test(gl)
        print "precision mediump float;
uniform vec2 iResolution;

void main() {
        gl_FragColor = #{gl.FragColor.to_s};
}"

end

def gl_draw()
        # @TODO USING OpenGL
end

end # Glsl

end # Glrb