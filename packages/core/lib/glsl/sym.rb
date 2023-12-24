require_relative '../utils/helpers' # Require the helpers module

module Glrb
module Glsl

include Glrb::Utils

class Sym
        def initialize(init = 0.0)
                @v = init
                @_ = ->v{Sym.new(v)}
        end
        def to_s() isNum(@v) ? @v.to_s: @v[] end
        def +(_) @_[->{"#{self.to_s} + #{_.to_s}"}] end
        def -(_) @_[->{"#{self.to_s} - #{_.to_s}"}] end
        def *(_) @_[->{"#{self.to_s} * #{_.to_s}"}] end
        def /(_) @_[->{"#{self.to_s} / #{_.to_s}"}] end
        def %(_) @_[->{"#{self.to_s} % #{_.to_s}"}] end
        def **(_) @_[->{"pow(#{self.to_s}, #{_.to_s})"}] end
        def ==(_) @_[->{"#{self.to_s} == #{_.to_s}"}] end
        def <=>(_) @v = _.to_s end
        def >>(_) _ << @n end
        def <<(n) @_[@v, n] end
        def +@() @_[->{+self.to_s}] end
        def -@() @_[->{+self.to_s}] end
end

def sym(init) Sym.new(init) end
end # Glsl
end # Glrb