require "glrb"

include Glrb::Ruby

RSpec.describe Sym do
        before(:each) do
                @x = Sym.new
                @a = Sym.new 1.0
                @b = Sym.new 2.0
                @c = 2.0
        end

        it "#initialize" do
                expect(@x.to_f).to eq 0.0
                expect(@a.to_f).to eq 1.0
        end

        it "utility methods" do
                aa = @a + 1.0
                expect(aa.to_f).to eq 2.0
                expect(@a.to_s).to eq "1.0"
        end

        it "vector operations" do
                @AB = @a + @b
                @ab = @a - @b
                @BC = @b * @c
                @bc = @b / @c
                expect(@AB.to_f).to eq 3.0
                expect(@ab.to_f).to eq -1.0
                expect(@BC.to_f).to eq 4.0
                expect(@bc.to_f).to eq 1.0
        end
end
