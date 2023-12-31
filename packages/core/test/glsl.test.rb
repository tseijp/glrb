require "glrb"
include Glrb::Glsl

RSpec.describe GL do
        before(:each) do
                @gl = GL.new
        end

        it "initialize" do
                expect(1).to eq 1
                expect(@gl).to be_a GL
        end

        it "basic render" do
                x = @gl.FragCoord.x / @gl.w
                y = @gl.FragCoord.y / @gl.h
                @gl.FragColor = vec(x, y, 0.0, 1.0)
                @gl.test
        end
end
