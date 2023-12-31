require_relative '../utils/helpers'

module Glrb

module Core

include Glrb::Utils

class Mat
        def initialize(init = [vec, vec, vec], args = 0.0)
                @v = init == [] ? [vec, vec, vec] : init.map{|v| isArr(v) ? _vec(v) : v }
                @n = args
        end
        def !@() isPrc(@v) ? @v[@n] : @v end
        def <=>(_) @v = _ end
        def >>(_) _ << @n end
        def <<(n) _mat(@v, n) end
end # Mat

end # Core

end # Glrb
