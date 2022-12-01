class Sym
        def initialize(init = 0, args = 0)
                @v = init
                @n = args
                @_ = ->(v = @v, n = @n){Sym.new(v, n)}
        end
        def to_f() (@v.is_a? Numeric) ? @v: @v[@n] end
        def to_i() self.to_f.to_i end
        def to_s() self.to_f.to_s end
        def +(_) @_[->{self.to_f + _.to_f}] end
        def -(_) @_[->{self.to_f - _.to_f}] end
        def *(_) @_[->{self.to_f * _.to_f}] end
        def /(_) @_[->{self.to_f / _.to_f}] end
        def %(_) @_[->{self.to_f % _.to_f}] end
        def **(_) @_[->{self.to_f ** _.to_f}] end
        def ==(_) self.to_f == _.to_f end
        def <=>(_) @v = _ end
        def >>(_) _ << @n end
        def <<(n) @_[@v, n] end
        def +@() @_[->{+self.to_f}] end
        def -@() @_[->{+self.to_f}] end
        def !@() @_[->{(1..self.to_i).inject(:*) || 1}] end
end