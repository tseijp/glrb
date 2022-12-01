class Mat
        def initialize(init = [1, 0, 0], args = 0)
                @v = init
                @n = args
                @_ = ->(v = @v, n = @n){Vec.new(v, n)}
        end
        def to_a() isArr(@v) ? @v : @v[@n] end
        def to_s() to_a.to_s end
        def size() to_a.size end
        def sort() @_[->n{to_a.sort}] end
        def map(_) @_[->n{to_a.map.with_index{|v, i| _[v, i]}}] end
        def +(_) map(isNum(_) ? ->v, i{v + _} : ->v, i{v + _[i]}) end
        def -(_) map(isNum(_) ? ->v, i{v - _} : ->v, i{v - _[i]}) end
        def *(_) map(isNum(_) ? ->v, i{v * _} : ->v, i{v * _[i]}) end
        def /(_) map(isNum(_) ? ->v, i{v / _} : ->v, i{v / _[i]}) end
        def [](_) @v[_] end
        def <=>(_) @v = _ end
        def >>(_) _ << @n end
        def <<(n) @_[@v, n] end
        def +@() map(->v, i{+v}) end
        def -@() map(->v, i{-v}) end
end