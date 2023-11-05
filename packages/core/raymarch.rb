require_relative "lib/glrb.rb"
include Glrb

gl = GL.new 4, 4, "test.ppm"

gl <=> ->{
        gl.FragColor = vec gl.FragCoord.x / gl.w, gl.FragCoord.y / gl.h, 0, 0
}

gl.test