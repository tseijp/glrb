# fun

ref: https://www.khronos.org/opengles/sdk/docs/manglsl/docbook4/

## abs(x: T): T

abs returns x if x ≥ 0, otherwise returns -x.

## acos(x: T): T

atan returns the angle whose trigonometric cosine is x.

## acosh(x: T): T

acosh returns the arc hyperbolic cosine of x;

## all(x: vec<bool>): bool

all returns true if all elements of x are true and false otherwise.

## any(x: vec<bool>): bool

any returns true if any element of x is true and false otherwise.

## asin(x: T): T

atan returns the angle whose trigonometric sine is x.

## asinh(x: T): T

asinh returns the arc hyperbolic sine of x; the inverse of sinh.

## atan(y_OR_y_over_x: T, x: T): T

atan returns the angle whose trigonometric arctangent is y x or y_over_x, depending on which overload is invoked.

## atanh(x: T): T

atanh returns the arc hyperbolic tangent of x; the inverse of tanh.

## ceil(x: T): T

ceil returns a value equal to the nearest integer that is greater than or equal to x.

## clamp(x: T, minVal: T, maxVal: T): T

clamp returns the value of x constrained to the range minVal to maxVal

```ruby
clamp(x: T, minVal: T, maxVal: T): T
clamp(x: T, minVal: int, maxVal: int): T
clamp(x: T, minVal: uint, maxVal: uint): T
clamp(x: T, minVal: float, maxVal: float): T
```

## cos(angle: T): T

cos returns the trigonometric cosine of angle.

## cosh(x: T): T

cosh returns the hyperbolic cosine of x. 

## cross(x: vec3, y: vec3): vec3

cross returns the cross product of two vectors, x and y. i.e.,

x [ 1 ] ⋅ y [ 2 ] − y [ 1 ] ⋅ x [ 2 ] x [ 2 ] ⋅ y [ 0 ] − y [ 2 ] ⋅ x [ 0 ] x [ 0 ] ⋅ y [ 1 ] − y [ 1 ] ⋅ x [ 1 ]

## dFdx(p: T): T

dFdx and dFdy return the partial derivative of expression p in x and y.

## dFdy(p: T): T

dFdx and dFdy return the partial derivative of expression p in x and y.

## degrees(radians: T): T

degrees converts a quantity, specified in radians into degrees.

## determinant(m: mat): float

determinant returns the determinant of the matrix m.

## distance(p0: T, p1: T): float

distance returns the distance between the two points p0 and p1. i.e., length(p0 - p1);

## dot(x: T, y: T): float

dot returns the dot product of two vectors, x and y. i.e., x [ 0 ] ⋅ y [ 0 ] + x [ 1 ] ⋅ y [ 1 ] + ...

## equal(x: vec<T>, y: vec<T>): vec<T>

equal returns a boolean vector in which each element i is computed as x[i] == y[i].

## exp(x: T): T

exp returns the natural exponentiation of x. i.e., ex.

## exp2(x: T): T

exp2 returns 2 raised to the power of x. i.e., 2x.

## faceforward(N: T, I: T, Nref: T): T

faceforward orients a vector to point away from a surface as defined by its normal.

## floatBitsToInt(x: T): T

floatBitsToInt and floatBitsToUint return the encoding of their floating-point parameters as highp int or uint

## floatBitsToUint(x: T): T

floatBitsToInt and floatBitsToUint return the encoding of their floating-point parameters as highp int or uint

## floor(x: T): T

floor returns a value equal to the nearest integer that is less than or equal to x.

## fract(x: T): T

fract returns the fractional part of x. This is calculated as x - floor(x).

## fwidth(p: T): T

fwidth returns the sum of the absolute derivatives in x and y using local differencing for the input argument p. It is equivalent to abs(dFdx(p)) + abs(dFdy(p)).

## greaterThan

## greaterThanEqual

## intBitsToFloat

## inverse

## inversesqrt

## isinf

## isnan

## length

## lessThan

## lessThanEqual

## log

## log2

## matrixCompMult

## max

## min

## mix

## mod

## modf

## normalize

## not

## notEqual

## outerProduct

## packHalf2x16

## packSnorm2x16

## packUnorm2x16

## pow

## radians

## reflect

## refract

## round

## roundEven

## sign

## sin

## sinh

## smoothstep

## sqrt

## step

## tan

## tanh

## texelFetch

## texelFetchOffset

## texture

## textureGrad

## textureGradOffset

## textureLod

## textureLodOffset

## textureOffset

## textureProj

## textureProjGrad

## textureProjGradOffset

## textureProjLod

## textureProjLodOffset

## textureProjOffset

## textureSize

## transpose

## trunc

## Top


## uintBitsToFloat

## unpackHalf2x16

## unpackSnorm2x16

## unpackUnorm2x16
