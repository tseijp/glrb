require_relative '../core/vec'
require_relative '../utils/helpers'

module Glrb

module Ruby

include Glrb::Utils

class Vec < Glrb::Core::Vec
        def to_a() (!self).to_a end
        def to_s() to_a.to_s end
        def size() to_a.size end
        def sum() to_a.sum end
        def length() Math::sqrt(dot(self)) end
        def +(_) map(isNum(_) ? ->v, i{v + _} : ->v, i{v + _[i]}) end
        def -(_) map(isNum(_) ? ->v, i{v - _} : ->v, i{v - _[i]}) end
        def %(_) map(isNum(_) ? ->v, i{v % _} : ->v, i{v % _[i]}) end
        def *(_) map(isNum(_) ? ->v, i{v * _} : ->v, i{v * _[i]}) end
        def /(_) map(isNum(_) ? ->v, i{v / _} : ->v, i{v / _[i]}) end
        def +@() map(->v, i{+v}) end
        def -@() map(->v, i{-v}) end
        def dot(_) map(->v, i{v * _[i]}).sum end
        def cross(_) _vec(->n{ _vec_cross(to_a, _.to_a) }) end
        def [](i) v = to_a; v[i] end
        def x() self[0] end
        def y() self[1] end
        def z() self[2] end
        def xx() _vec(->n{ v = to_a; [v[0], v[0]] }) end
        def xy() _vec(->n{ v = to_a; [v[0], v[1]] }) end
        def xz() _vec(->n{ v = to_a; [v[0], v[2]] }) end
        def yx() _vec(->n{ v = to_a; [v[1], v[0]] }) end
        def yy() _vec(->n{ v = to_a; [v[1], v[1]] }) end
        def yz() _vec(->n{ v = to_a; [v[1], v[2]] }) end
        def zx() _vec(->n{ v = to_a; [v[2], v[0]] }) end
        def zy() _vec(->n{ v = to_a; [v[2], v[1]] }) end
        def zz() _vec(->n{ v = to_a; [v[2], v[2]] }) end
        def xyz() _vec(->n{ v = to_a; [v[0], v[1], v[2]] }) end
        def xzy() _vec(->n{ v = to_a; [v[0], v[2], v[1]] }) end
        def yxz() _vec(->n{ v = to_a; [v[1], v[0], v[2]] }) end
        def yzx() _vec(->n{ v = to_a; [v[1], v[2], v[0]] }) end
        def zxy() _vec(->n{ v = to_a; [v[2], v[0], v[1]] }) end
        def zyx() _vec(->n{ v = to_a; [v[2], v[1], v[0]] }) end
        def map(_) _vec(->n{ to_a.map.with_index{|v, i| _[v, i]} }) end
end # Vec

end # Ruby

end # Glrb