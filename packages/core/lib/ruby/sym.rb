require_relative '../core/sym'
require_relative '../utils/helpers'

module Glrb

module Ruby

include Glrb::Utils

class Sym < Glrb::Core::Sym
        def to_f() !self end
        def to_i() to_f.to_i end
        def to_s() to_f.to_s end
        def ==(_) self.to_f == _.to_f end
        def +(_) _sym(->n{ self.to_f + _.to_f }) end
        def -(_) _sym(->n{ self.to_f - _.to_f }) end
        def *(_) _sym(->n{ self.to_f * _.to_f }) end
        def /(_) _sym(->n{ self.to_f / _.to_f }) end
        def %(_) _sym(->n{ self.to_f % _.to_f }) end
        def **(_) _sym(->n{ self.to_f ** _.to_f }) end
        def +@() _sym(->n{ +self.to_f }) end
        def -@() _sym(->n{ +self.to_f }) end
end # Sym

end # Ruby

end # Glrb