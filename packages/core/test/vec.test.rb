require "glrb"
include Glrb

RSpec.describe Vec do
        before(:each) do
                @x = Vec.new
                @a = Vec.new [1.0, 2.0, 2.0]
                @b = Vec.new [2.0, 0.0, 0.0]
                @c = 2
        end

        it "#initialize" do
                expect(@x.to_a).to eq [0.0, 0.0, 0.0]
                expect(@a.to_a).to eq [1.0, 2.0, 2.0]
        end

        it "utility methods" do
                aa = @a.map(->v, i{v + 1})
                bb = !@b
                expect(@a.to_a).to eq [1.0, 2.0, 2.0]
                expect(@a.to_s).to eq "[1.0, 2.0, 2.0]"
                expect(@a.size).to eq 3
                expect(@a.sum).to eq 5.0
                expect(aa.to_a).to eq [2.0, 3.0, 3.0]
                expect(@a.length).to eq 3.0
                expect(bb.to_a).to eq [1.0, 0.0, 0.0]
        end

        it "vector operations" do
                AB = @a + @b
                BC = @b * @c
                ab = @a - @b
                bc = @b / @c
                xx = @a.cross(@b)
                expect(AB.to_a).to eq [3.0, 2.0, 2.0]
                expect(BC.to_a).to eq [4.0, 0.0, 0.0]
                expect(ab.to_a).to eq [-1.0, 2.0, 2.0]
                expect(bc.to_a).to eq [1.0, 0.0, 0.0]
                expect(xx.to_a).to eq [0.0, 4.0, -4.0]
        end
end