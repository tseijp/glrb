require_relative '../core/vec'
require_relative '../utils/helpers'

module Glrb

module Glsl

include Glrb::Utils

class Vec < Glrb::Core::Vec
        def to_s() vec_to_s(!self) end
        def size() to_a.size end
        def sum() to_a.sum end
        def +(_) _vec(->n{ "#{to_s} + #{_.to_s}" }) end
        def -(_) _vec(->n{ "#{to_s} - #{_.to_s}" }) end
        def *(_) _vec(->n{ "#{to_s} * #{_.to_s}" }) end
        def /(_) _vec(->n{ "#{to_s} / #{_.to_s}" }) end
        def +@() _vec(->n{ "+ #{to_s}" }) end
        def -@() _vec(->n{ "- #{to_s}" }) end
        def dot(_) _sym(->n{ "dot(#{to_s}, #{_.to_s}" }) end
        def cross(_) _vec(->n{ "cross(#{to_s}, #{_.to_s})" }) end
        def length() _vec(->n{ "length(#{to_s})" }) end
        def x() _sym(->n{ "(#{to_s}).x" }) end
        def y() _sym(->n{ "(#{to_s}).y" }) end
        def z() _sym(->n{ "(#{to_s}).z" }) end
        def xx() _vec(->n{ "(#{to_s}).xx" }) end
        def xy() _vec(->n{ "(#{to_s}).xy" }) end
        def xz() _vec(->n{ "(#{to_s}).xz" }) end
        def yx() _vec(->n{ "(#{to_s}).yx" }) end
        def yy() _vec(->n{ "(#{to_s}).yy" }) end
        def yz() _vec(->n{ "(#{to_s}).yz" }) end
        def zx() _vec(->n{ "(#{to_s}).zx" }) end
        def zy() _vec(->n{ "(#{to_s}).zy" }) end
        def zz() _vec(->n{ "(#{to_s}).zz" }) end
        def xyz() _vec(->n{ "(#{to_s}).xyz" }) end
        def xzy() _vec(->n{ "(#{to_s}).xzy" }) end
        def yxz() _vec(->n{ "(#{to_s}).yxz" }) end
        def yzx() _vec(->n{ "(#{to_s}).yxz" }) end
        def zxy() _vec(->n{ "(#{to_s}).zxy" }) end
        def zyx() _vec(->n{ "(#{to_s}).zyx" }) end
end # Vec

def vec_to_s(v) # from array or string
        if (isVec(v))
                return v.to_s
        end
        if (isStr(v))
                return v.to_s
        end
        if (isArr(v))
                ret = v.map{|vv| vv.to_s}.join(", ")
                ret = "vec#{v.size}(#{ret})"
                return ret
        end
        v.to_s
end

end # Glsl

end # Glrb