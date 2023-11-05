module Glrb
      def isNum (target) target.is_a? Numeric end
      def isArr (target) target.instance_of?(Array) end
      def isVec (target) target.instance_of?(Vec) end
end