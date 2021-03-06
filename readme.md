# electron-game

## A base for making node.js games with canvas and electron

### Update

The update loop is inside `script/main.js`. The update loop is reponsible for updating your current game state. It does this by calling the state's `update(dt, keys)` function.
`dt` is the number of milliseconds since the last time `update` was called.
`keys` is the array of currently pressed/held keys (represented by its keyCode).
To perform a *state transition*, the update function needs to return an object containing the next state and the arguments for that state.

### States

In `electron-game`, the every game state should extend the `State` class. When you extend `State`, a few things are done for you.
* The `constructor` takes in an object `args` which can contain any key/value pairs that might need to be transferred between states. The constructor will attach `args` to `this.args`, as well as initializing `this.frame` to `0` - meaning that each state has its own frame counter that resets when a transition occurs.
    * **IMPORTANT:** be sure to call `super(args);` at the *beginning* of each state's `constructor` function in order to get this built-in behavior.
* The base class `update` function will automatically increment `this.frame`, as well as automatically take care of returning the next state. In order to initiate a *state transition*, simply set `this.next` to the enum for the state you'd like next. More on this in the **State Factory** section below.
    * **IMPORTANT:** be sure to call `return super.update();` at the *end* of each state's `update` function in order to get this built-in behavior.

### State Factory

The State Factory consists of two functions which help generate states for the game. This is so every class doesn't have to import each state class.
The `getStartingState()` function simply returns the very first state of the game.
The `getNextState({next, args})` function returns the next state based on the enum value of `next`, passing `args` to that new state's constructor. Be sure to add new game states to both the `STATES` enum (in `script/states.js`) and to the switch/case logic in `getNextState`.

### Draw

The draw loop is inside `script/main.js`. The draw loop is responsible for drawing your current game state. The draw loop is automatically initialized with a `clear`, meaning everything on the canvas is erased, and you must redraw everything that you'd like to display on that frame. The draw loop calls the current state's `update(renderer)` function.
`renderer` is a wrapper around the HTML5 Canvas API. You can use it *exactly* the same way you would use a 2d `context` retrieved from a canvas object, but there are some other functions added to help you as well.

### Renderer

Aside from ~all~ *most* of the standard functions of canvas, the renderer offers a few other helpful tools you can utilize.

#### Additional Properties
* width - gets the canvas width in pixels
* height - gets the canvas height in pixels
* center - gets an object containing `x` and `y`, representing the center point of the canvas

#### Additional Functions
* reset() - clears the entire canvas
* loadSprite(name, filepath) - loads an image from the filepath into the internal IMAGE_CACHE by a reference name
* clearSprites() - clears the internal IMAGE_CACHE
* drawSprite(name, ...args) - pulls an image from the internal IMAGE_CACHE and draws it using `context.drawImage()`, passing the rest of the `...args` through.
* applySettings(settings) - applies the values of each supplied context property to the renderer
* path(actions, settings) - wraps the `actions` callback in a begin/closePath pseudo-block. If the optional `settings` are passed in, they are applied within the block before the actions are called.
    * `paths` in canvas are used to draw objects with the same properties.
* isolate(actions, settings) - wraps the `actions` callback in a save/restore pseudo-block. If the optional `settings` are passed in, they are applied within the block before the actions are called.
    * `isolated states` in canvas are used to draw objects with the same set of tranformations and/or properties.
* isolatePath(actions, settings) - wraps the `actions` callback in both a save/restore and begin/closePath pseudo-block. If the optional `settings` are passed in, they are applied within the inner block before the actions are called.
* strokeAndFillText(text, x, y) - calls both stroke and then fill text in the same position. Creates outlined text.
* fillCircle(x, y, radius) - creates a filled in circle.
* strokeCircle(x, y, radius) - creates a hollow circle.
* strokeAndFillCircle(x, y, radius) - creates an outlined circle.
* strokeAndFillRect(x, y, width, height) - creates an outlined rectangle.

##### Path Drawing
The following functions take in an array of points in the format `{x, y}` and an optional `options` object.

Currently there is only one option - `close`: set to `true` if you want the close the path by drawing back to the first point.
* fillPath(points, options) - creates a filled path (close defaults to `true`)
* strokePath(points, options) - creates a hollow path (close defaults to `false`)
* strokeAndFillPath(points, options) - creates an outlined path (close defaults to `true`)
* animatePath(points, frame, options) - animates a path by drawing the points by referencing the frame number. For this function, there are three options:
    * `repeat` - if set to true, this will repeat the entire animation from start once it completes
    * `wrap` - overrides `repeat` if set to true, and loops the animation with the specified length
    * `length` - defaults to the length of the array - this is the maximum number of frames to animate

##### Special Animations
* oscillateText(text, x, y, frame, options) - creates text that oscillates per character. The text will have an effect of looking like a flag waving. This will use the current textAlign and textBaseline settings. For this function, there are four options:
    * `amplitude` - the height amount the text will rise above and below the supplied y axis.
    * `period` - the speed with which the characters oscillate (smaller fractions go slower).
    * `shift` - the amount by which to shift the start of the animation.
    * `drag` - the amount by which each subsequent character will drag behing its previous character.

#### Removed Properties and Functions
The following functions are *not* passed through to the renderer - to access them, you can use them directly through `renderer.context`:
* canvas
* direction
* beginPath()
* closePath()
* save()
* restore()
