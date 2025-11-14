# sqrt

a simple, ergonomic calculator. patterned after my beloved hp50.

## why tho

a couple reasons

1. entering conventional strings for complex arithmetic is difficult, error prone, and has blind intermediate evaluation. with this, you can see it.
1. conventional calculator memory relies on *your* memory of what number is in it. with this, you can see it.

## using rpn input

1. enter your values on the stack using enter key
1. do your operations to them
	1. binary operations use bottom two items in stack
	1. unary operations use bottom item in stack


### examples

#### simple arithmetic

##### 5 + 7

`5` `enter` `7` `enter` `+`

#### even simpler arithmetic

operators will work with open buffer. you don't necessarily need to hit `enter` before doing an operation.

##### 5 + 7 (simplified)

`5` `enter` `7` `+`

##### 5 - 7 (simplified)

 `5` `enter` `7` `-`

#### complex evaluation

##### (3 + 8) * (2 + (12/3))

1. `3` `enter` `8` `+` (evaluates (3 + 8))
2. `2` `enter` (stores 2 in position for later)
3. `12` `enter` `3` `/` (evaluates `(12 / 3)`)
4. `+` (adds the stored 2 and step 3)
5. `*` (multiplies the two outermost braces)


## features

### current
- rpn input style ([wat](https://mathworld.wolfram.com/ReversePolishNotation.html))
- basic trig functions
- basic exponent/root functions
- basic keybinds
- undo

### planned

- make it more prettier
- keybind visibility
- notation selection (float, fix, sci, eng)
- angle unit selection (deg, rad, grad, mil)
- stack manipulation
- clipboard stuff
- desktop
- sexagesimal (maybe)
