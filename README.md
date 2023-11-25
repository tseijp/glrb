# glrb

glrb is a simple OpenGL wrapper for Ruby

## Installation

```ruby
gem install glrb
```

## Usage

```ruby
require 'glrb'

gl = GL.new 1920, 1080
st = gl.FragCoord / vec(gl.w, gl.h)
gl.FragColor = vec(st.x, st.y, 0.0, 1.0)
dl.draw
```
