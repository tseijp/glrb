module Glrb

module Utils

def isNum (target) target.is_a? Numeric end
def isArr (target) target.instance_of?(Array) end
def isVec (target) target.instance_of?(Vec) end
def isMat (target) target.instance_of?(Mat) end
def isStr (target) target.instance_of?(String) end

def sym(init) Sym.new(init) end

def _sym(init, args = 0.0) Sym.new(init, args) end

def _mat(init, args = 0.0) Mat.new(init, args) end

def mat(*init) Mat.new(init) end

def _vec(init, args = 0.0) Vec.new(init, args) end

def vec(*init) Vec.new(init) end

def transpose(m)
        a = m.to_a
        _mat(a.size.times.map{ |i| a[i].size.times.map{|j| a[j][i]} })
end

def _vec_cross(a, b)
        [ a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0], ]
end

def dot(a, b) a.dot(b) end

def cross(a, b) a.cross(b) end

def length(a) a.length end

end # Utils

end # Glrb