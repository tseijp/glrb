class Vec
        def initialize(init = [1, 0, 0], args = 0)
                @v = init
                @n = args
                @_ = ->(v = @v, n = @n){Vec.new(v, n)}
        end
        def to_a() isArr(@v) ? @v : @v[@n] end
        def to_s() to_a.to_s end
        def size() to_a.size end
        def sum() to_a.sum end
        def length() Math::sqrt(self * self) end
        def sort() @_[->n{to_a.sort}] end
        def map(_) @_[->n{to_a.map.with_index{|v, i| _[v, i]}}] end
        def +(_) map(isNum(_) ? ->v, i{v + _} : ->v, i{v + _[i]}) end
        def -(_) map(isNum(_) ? ->v, i{v - _} : ->v, i{v - _[i]}) end
        def *(_) isNum(_) ? map(->v, i{v * _}) : map(->v, i{v * _[i]}).sum end
        def /(_) isNum(_) ? map(->v, i{v / _}) : cross(_) end
        def [](_) v = to_a; v[_] end
        def <=>(_) @v = _ end
        def >>(_) _ << @n end
        def <<(n) @_[@v, n] end
        def +@() map(->v, i{+v}) end
        def -@() map(->v, i{-v}) end
        def !@() self / length end
        def cross(_) @_[->n{ _vec_cross(to_a, _.to_a) }] end
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
end

def vec(*init) Vec.new(init) end

def _vec_cross(a, b)
        [ a[1] * b[2] - a[2] * b[1],
          a[2] * b[0] - a[0] * b[2],
          a[0] * b[1] - a[1] * b[0], ]
end