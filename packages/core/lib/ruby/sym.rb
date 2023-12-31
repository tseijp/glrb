require_relative '../utils/helpers' # Require the helpers module

module Glrb

module Ruby

include Glrb::Utils

class Sym
        def initialize(init = 0.0)
                @v = init
                @_ = ->v{Sym.new(v)}
        end
        def to_f() isNum(@v) ? @v: @v[] end
        def to_i() self.to_f.to_i end
        def to_s() self.to_f.to_s end
        def +(_) @_[->{self.to_f + _.to_f}] end
        def -(_) @_[->{self.to_f - _.to_f}] end
        def *(_) @_[->{self.to_f * _.to_f}] end
        def /(_) @_[->{self.to_f / _.to_f}] end
        def %(_) @_[->{self.to_f % _.to_f}] end
        def **(_) @_[->{self.to_f ** _.to_f}] end
        def ==(_) self.to_f == _.to_f end
        def <=>(_) @v = _.to_f end
        def >>(_) _ << @n end
        def <<(n) @_[@v, n] end
        def +@() @_[->{+self.to_f}] end
        def -@() @_[->{+self.to_f}] end
end

end # Ruby

end # Glrb