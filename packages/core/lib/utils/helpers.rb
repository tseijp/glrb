module Glrb
module Utils
      def isNum (target) target.is_a? Numeric end
      def isArr (target) target.instance_of?(Array) end
      def isVec (target) target.instance_of?(Vec) end
      def isMat (target) target.instance_of?(Mat) end
      def isStr (target) target.instance_of?(String) end
end
end