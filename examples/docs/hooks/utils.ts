/**
 * CALCULATE VECTOR
 * REF: https://github.com/toji/gl-matrix/blob/master/src/vec2.js
 */
export const isF = (f: unknown): f is Function => typeof f === 'function'

const Vec = typeof Float32Array !== 'undefined' ? Float32Array : Array

export type Vec2 = [x: number, y: number]

export const vec2 = (x = 0, y = 0, out = new Vec(2)) => {
        out[0] = x
        out[1] = y
        return out as Vec2
}

export const addV = (a = vec2(), b = vec2(), out = vec2()) => {
        out[0] = a[0] + b[0]
        out[1] = a[1] + b[1]
        return out
}

export const subV = (a = vec2(), b = vec2(), out = vec2()) => {
        out[0] = a[0] - b[0]
        out[1] = a[1] - b[1]
        return out
}

export const cpV = (a = vec2(), out = vec2()) => {
        out[0] = a[0]
        out[1] = a[1]
        return out
}
