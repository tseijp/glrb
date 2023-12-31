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
                # st = @gl.FragCoord.xy / vec(@gl.w, @gl.h)
                # @gl.FragColor = vec(st.x, st.y, 0.0, 1.0)
                # @gl.draw
        end
end

# st = gl.FragCoord.xy / vec(gl.w, gl.h)
# vec(st.x, st.y, 0.0, 1.0)