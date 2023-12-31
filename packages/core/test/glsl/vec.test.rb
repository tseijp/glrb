require "glrb"

include Glrb::Glsl
include Glrb::Utils

RSpec.describe Vec do
        before(:each) do
                @x = vec
                @a = vec 1.0, 2.0, 2.0
                @b = Vec.new "b" # @TODO SUPPORT vec "b"
                @c = 2.0
        end

        it "#initialize" do
                expect(@x.to_s).to eq "vec3(0.0, 0.0, 0.0)"
                expect(@a.to_s).to eq "vec3(1.0, 2.0, 2.0)"
                expect(@b.to_s).to eq "b"
        end

        it "utility methods" do
                # aa = @a.map(->v, i{v + 1})
                # expect(aa.to_s).to eq [2.0, 3.0, 3.0]
                bb = length(@b)
                expect(bb.to_s).to eq "length(b)"
                # expect(@a.to_s).to eq ""
                # expect(@a.size).to eq 3
                # expect(@a.sum).to eq 5.0
                # expect(@a.length).to eq ""
        end

        it "vector operations" do
                @AB = @a + @b
                @ab = @a - @b
                @BC = @b * @c
                @bc = @b / @c
                @xx = cross(@a, @b)
                expect(@AB.to_s).to eq "vec3(1.0, 2.0, 2.0) + b"
                expect(@ab.to_s).to eq "vec3(1.0, 2.0, 2.0) - b"
                expect(@BC.to_s).to eq "b * 2.0"
                expect(@bc.to_s).to eq "b / 2.0"
                expect(@xx.to_s).to eq "cross(vec3(1.0, 2.0, 2.0), b)"
        end
end