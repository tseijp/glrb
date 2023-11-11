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

x = 0.5 / gl.w + (gl.i.to_f % gl.w) / gl.h
y = 0.5 / gl.h + (gl.i.to_f / gl.w).to_i.to_f / gl.h,
gl.FragCoord = ->_{[x, y, 0.0, 1.0]}

pos = gl.FragCoord.xyz
col = pos.x**2 + pos.y**2
gl.FragColor = ->_{[col, col, col, 1]}

gl.drawArrays(gl.w * gl.h)
```
