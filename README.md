# glrb

glrb is a simple OpenGL wrapper for Ruby

## Installation

```ruby
gem install glrb
```

## Usage

```ruby
require 'glrb'

gl = GLRB.new 1920, 1080

gl.FragCoord <=> ->{[(gl.i % gl.w) / gl.h, (gl.i / gl.w).to_i / gl.h, 0.0, 1.0]}

gl.FragColor <=> [1.0, 0.0, 1.0, 1.0]

gl.drawArrays(gl.w * gl.h)
```
