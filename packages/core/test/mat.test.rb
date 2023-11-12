require "glrb"
include Glrb

RSpec.describe Mat do
        before(:each) do
                @x = Mat.new
                @a = Mat.new([[1.0, 3.0], [2.0, 4.0]])
                @b = mat(vec(4.0, 1.0), vec(3.0, 2.0))
                @c = 2
                @v = vec(1.0, 2.0)
        end

        it "#initialize" do
                expect(@x.to_a.map(&:to_a)).to eq [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]
                expect(@a.to_a.map(&:to_a)).to eq [[1.0, 3.0], [2.0, 4.0]]
        end

        it "utility methods" do
                aa = @a.map(->v, i{v + vec(1, 1)})
                expect(aa.to_a.map(&:to_a)).to eq [[2.0, 4.0], [3.0, 5.0]]
                expect(@a.to_s).to eq "[[1.0, 3.0], [2.0, 4.0]]"
                expect(@a.size).to eq 2
        end

        it "matrix operations" do
                @AB = @a + @b
                @ab = @a - @b
                @BC = @b * @c
                @bc = @b / @c
                @XX = @a * @b
                @AV = @a + @v
                @av = @a - @v
                @BV = @b * @v
                @bv = @b / @v
                expect(@AB.to_a.map(&:to_a)).to eq [[5.0, 4.0], [5.0, 6.0]]
                expect(@ab.to_a.map(&:to_a)).to eq [[-3.0, 2.0], [-1.0, 2.0]]
                expect(@BC.to_a.map(&:to_a)).to eq [[8.0, 2.0], [6.0, 4.0]]
                expect(@bc.to_a.map(&:to_a)).to eq [[2.0, 0.5], [1.5, 1.0]]
                expect(@XX.to_a.map(&:to_a)).to eq [[13.0, 7.0], [20.0, 10.0]]
                expect(@AV.to_a.map(&:to_a)).to eq [[2.0, 5.0], [3.0, 6.0]]
                expect(@av.to_a.map(&:to_a)).to eq [[0.0, 1.0], [1.0, 2.0]]
                expect(@BV.to_a).to eq [6.0, 7.0]
                expect(@bv.to_a).to eq [4.5, 4.0]
        end
end
