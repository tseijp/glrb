require "glrb"
include Glrb

RSpec.describe GL do
        before(:each) do
                @gl = GL.new 15, 15, "test.ppm"
        end

        it "initialize" do
                expect(@gl).to be_a GL
                expect(@gl.i).to eq 0
                expect(@gl.w).to eq 15
                expect(@gl.h).to eq 15
        end

        it "render" do
                @gl <=> ->{
                        c = (@gl.FragCoord / 15.0 - 0.5).length - 0.025
                        @gl.FragColor = vec c, c, 0.0, 1.0
                }
                puts @gl.test
        end
end