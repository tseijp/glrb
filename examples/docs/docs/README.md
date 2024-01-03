# Getting started

```ruby
require 'glrb'
include Glrb

x = gl.FragCoord.x / gl.w
y = gl.FragCoord.y / gl.h
gl.FragColor = vec(x, y, 0.0, 1.0)
gl.draw
```

# Installation

```ruby
gem install glrb
```
