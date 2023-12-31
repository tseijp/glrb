require_relative '../core/mat'
require_relative '../utils/helpers'

module Glrb

module Ruby

include Glrb::Utils

class Mat < Glrb::Core::Mat
        def to_a() (!self).to_a end
        def to_s() to_a.map(&:to_a).to_s end
        def size() to_a.size end
        def map(_) _mat(->n{ to_a.map.with_index{|v, i| _[v, i]} }) end
        def tr() transpose(self) end
        def +(_) map(!isMat(_) ? ->v, i{v + _} : ->v, i{v + _[i]}) end
        def -(_) map(!isMat(_) ? ->v, i{v - _} : ->v, i{v - _[i]}) end
        def %(_) map(isNum(_) ? ->v, i{v % _} : mx(_, ->a, b{a % b})) end
        def *(_) map(isNum(_) ? ->v, i{v * _} : mx(_, ->a, b{a * b})) end
        def /(_) map(isNum(_) ? ->v, i{v / _} : mx(_, ->a, b{a / b})) end
        def +@() map(->v, i{+v}) end
        def -@() map(->v, i{-v}) end
        def [](_) @v[_] end
        def x() self[0] end
        def y() self[1] end
        def z() self[2] end
        def xy() _mat(->n{ v = to_a; [v[0], v[1]] }) end
        def xz() _mat(->n{ v = to_a; [v[0], v[2]] }) end
        def yx() _mat(->n{ v = to_a; [v[1], v[0]] }) end
        def yz() _mat(->n{ v = to_a; [v[1], v[2]] }) end
        def zx() _mat(->n{ v = to_a; [v[2], v[0]] }) end
        def zy() _mat(->n{ v = to_a; [v[2], v[1]] }) end
        def xyz() _mat(->n{ v = to_a; [v[0], v[1], v[2]] }) end
        def xzy() _mat(->n{ v = to_a; [v[0], v[2], v[1]] }) end
        def yxz() _mat(->n{ v = to_a; [v[1], v[0], v[2]] }) end
        def yzx() _mat(->n{ v = to_a; [v[1], v[2], v[0]] }) end
        def zxy() _mat(->n{ v = to_a; [v[2], v[0], v[1]] }) end
        def zyx() _mat(->n{ v = to_a; [v[2], v[1], v[0]] }) end
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
end # Mat

end # Ruby

end # Glrb