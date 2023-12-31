require_relative '../core/sym'
require_relative '../utils/helpers'

module Glrb

module Glsl

include Glrb::Utils

class Sym < Glrb::Core::Sym
        def to_s() (!self).to_s end
        def +(_) _sym(->n{ "#{to_s} + #{_.to_s}" }) end
        def -(_) _sym(->n{ "#{to_s} - #{_.to_s}" }) end
        def *(_) _sym(->n{ "#{to_s} * #{_.to_s}" }) end
        def /(_) _sym(->n{ "#{to_s} / #{_.to_s}" }) end
        def %(_) _sym(->n{ "#{to_s} % #{_.to_s}" }) end
        def **(_) _sym(->n{ "pow(#{to_s}, #{_.to_s})" }) end
        def ==(_) _sym(->n{ "#{to_s} == #{_.to_s}" }) end
        def +@() _sym(->n{ "+#{to_s}" }) end
        def -@() _sym(->n{ "-#{to_s}" }) end
end

end # Glsl

end # Glrb