require "glrb"
include Glrb

RSpec.describe GL do
        size = 15.0
        before(:each) do
                @gl = GL.new size, size, "test.ppm"
        end

        it "initialize" do
                expect(@gl).to be_a GL
                expect(@gl.i).to eq 0
                expect(@gl.w).to eq size
                expect(@gl.h).to eq size
        end

        it "basic render" do
                @gl <=> ->{
                        x = @gl.FragCoord.x / @gl.w
                        y = @gl.FragCoord.y / @gl.h
                        c = (vec(x, y) - 0.5).length
                        @gl.FragColor = vec c, c, c, 1.0
                }
                # @gl.draw
                # puts @gl.test
        end


end
