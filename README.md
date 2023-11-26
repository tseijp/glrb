# 🌁glrb

<strong>
<samp>

<p align="center">

[![ npm version ](https://img.shields.io/gem/v/glrb?style=flat&colorA=000&colorB=000)](https://rubygems.org/gems/glrb)
[![ downloads ](https://img.shields.io/gem/dt/glrb.svg?style=flat&colorA=000&colorB=000)](https://rubygems.org/gems/glrb)
[![ license MIT ](https://img.shields.io/github/license/tseijp/glrb?style=flat&colorA=000&colorB=000)](https://github.com/tseijp/glre)
[![ docs available ](https://img.shields.io/badge/docs-available-000.svg?style=flat&colorA=000)](https://tsei.jp)

glrb is a simple OpenGL wrapper for Ruby

</p>
<p align="center" valign="top">
  <a href="https://github.com/tseijp/glrb/blob/main/examples/demo/demo.rb">
    <img alt="🌁" src="https://raw.githubusercontent.com/tseijp/glrb/main/examples/demo/demo.png"></img>
  </a>
</p>

## Installation

```ruby
gem install glrb
```

## Basic Usage

<table>
<td width="256px">
<a href="https://github.com/tseijp/glrb/blob/main/examples/demo/basic.rb">
  <img alt=" " src="https://raw.githubusercontent.com/tseijp/glrb/main/examples/demo/basic.png"></img>
</a>
</td>
<td width="414px">

```ruby
require 'glrb'
include Glrb

gl = GL.new 1280, 800
gl <=> ->{
  st = gl.FragCoord.xy / vec(gl.w, gl.h)
  vec st.x, st.y, 0.0, 1.0
}
gl.draw
```

</td>
</table>

## Draw Graph

<table>
<td width="256px">
<a href="https://github.com/tseijp/glrb/blob/main/examples/demo/graph.rb">
  <img alt=" " src="https://raw.githubusercontent.com/tseijp/glrb/main/examples/demo/graph.png"></img>
</a>
</td>
<td width="414px">

```rb
require 'glrb'
include Glrb

gl = GL.new 1280, 800
gl <=> ->{
        a = vec 1.0, 1.0, 0.0
        b = vec 0.0, 1.0, 1.0
        c = vec 0.1, 0.2, 0.1
        col = vec 0.0, 0.0, 0.0
        st = gl.FragCoord.xy / vec(gl.w, gl.h)
        x = st.x * 5.0
        w = 0.01
        col += a * stroke st.y, sin(x) * 0.3 + 0.5, w
        col += b * stroke st.y, cos(x) * 0.2 + 0.5, w
        col += c * stp grid(st.x, w * 0.5, 0.1) + \
                       grid(st.y, w * 0.5, 0.1), 0.5 \
        vec col.x, col.y, col.z, 1.0
}
gl.draw
```

</td>
</table>

## Make some noise

<table>
<td width="256px">
<a href="https://github.com/tseijp/glrb/blob/main/examples/demo/noise.rb">
  <img width="256px" alt=" " src="https://raw.githubusercontent.com/tseijp/glrb/main/examples/demo/noise.png"></img>
</a>
</td>
<td width="414px">

```rb
require 'glrb'
include Glrb

gl = GL.new 64, 64, "noise.ppm"

gl <=> ->{
        x = gl.FragCoord.x / gl.w
        y = gl.FragCoord.y / gl.h
        pos = vec(x, y, 0.0)
        col = snoise(pos) * 0.5 + 0.5
        #  col = fbm(pos) * 0.5 + 0.5
        gl.FragColor = vec col, col, col, 1.0
}

gl.draw
```

</td>
</table>

## PRs

###### welcome✨

</samp>
</strong>
