require_relative '../utils/helpers'

module Glrb

module Core

include Glrb::Utils

class Sym
        def initialize(init = 0.0, args = 0.0)
                @v = init
                @n = args
        end
        def !@() isPrc(@v) ? @v[@n] : @v end
        def <=>(_) @v = _ end
        def >>(_) _ << @n end
        def <<(n) @_[@v, n] end
end # Sym

end # Core

end # Glrb