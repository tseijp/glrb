require_relative '../utils/helpers' # Require the helpers module

module Glrb
module Math

include Glrb::Utils

class Mat
        def initialize(init = [Vec.new, Vec.new, Vec.new], args = 0)
                @v = init.map{|v| isArr(v) ? Vec.new(v) : v}
                @n = args
                @_ = ->(v = @v, n = @n){Vec.new(v, n)}
        end
        def to_a() (isArr(@v) ? @v : @v[@n]) end
        def to_s() to_a.map(&:to_a).to_s end
        def size() to_a.size end
        def map(_) @_[->n{to_a.map.with_index{|v, i| _[v, i]}}] end
        def tr() transpose(self) end
        def [](_) @v[_] end
        def +(_) map(!isMat(_) ? ->v, i{v + _} : ->v, i{v + _[i]}) end
        def -(_) map(!isMat(_) ? ->v, i{v - _} : ->v, i{v - _[i]}) end
        def %(_) map(isNum(_) ? ->v, i{v % _} : mx(_, ->a, b{a % b})) end
        def *(_) map(isNum(_) ? ->v, i{v * _} : mx(_, ->a, b{a * b})) end
        def /(_) map(isNum(_) ? ->v, i{v / _} : mx(_, ->a, b{a / b})) end
        def <=>(_) @v = _ end
        def >>(_) _ << @n end
        def <<(n) @_[@v, n] end
        def +@() map(->v, i{+v}) end
        def -@() map(->v, i{-v}) end
        def x() self[0] end
        def y() self[1] end
        def z() self[2] end
        def xy() @_[->n{v = to_a; [v[0], v[1]]}] end
        def xz() @_[->n{v = to_a; [v[0], v[2]]}] end
        def yx() @_[->n{v = to_a; [v[1], v[0]]}] end
        def yz() @_[->n{v = to_a; [v[1], v[2]]}] end
        def zx() @_[->n{v = to_a; [v[2], v[0]]}] end
        def zy() @_[->n{v = to_a; [v[2], v[1]]}] end
        def xyz() @_[->n{v = to_a; [v[0], v[1], v[2]]}] end
        def xzy() @_[->n{v = to_a; [v[0], v[2], v[1]]}] end
        def yxz() @_[->n{v = to_a; [v[1], v[0], v[2]]}] end
        def yzx() @_[->n{v = to_a; [v[1], v[2], v[0]]}] end
        def zxy() @_[->n{v = to_a; [v[2], v[0], v[1]]}] end
        def zyx() @_[->n{v = to_a; [v[2], v[1], v[0]]}] end
        def mx(v, _) isMat(v) ? mxm(v, _) : mxv(v, _) end
        def mxv(v, _) ->a, i{ _[a, v].sum } end
        def mxm(m, _)
                m = transpose(m)
                ->v, i{
                        v.map(->vv, j{
                                _[v, m[j]].sum
                        })
                }
        end
end

def mat(*init) Mat.new(init) end

def transpose(m)
        a = m.to_a
        Mat.new(a.size.times.map{|i| a[i].size.times.map{|j| a[j][i]}})
end
end # Math
end # Glrb