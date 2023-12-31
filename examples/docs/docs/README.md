# Getting started

```ruby
require 'glrb'
include Glrb

gl = GL.new 1280, 800
gl <=> {
  st = gl.FragCoord.xy / vec(gl.w, gl.h)
  vec(st.x, st.y, 0.0, 1.0)
}

gl.draw
```

#
