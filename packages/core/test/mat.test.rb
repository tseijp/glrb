require "glrb"
include Glrb

RSpec.describe Mat do
  it "test" do
    expect(vec(1, 2).to_a).to eql([1, 2])
  end
end