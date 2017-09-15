JavaScript Tetris
=================

What it says on the tin! This is a simple implementation of the classic PC game using
HTML5 Canvas element and Object-Oriented JavaScript.

[Live demo](http://reinhart.digital/gschool/tetris)

* Use arrow keys to rotate and move the block in play.
* Down arrow key will speed up brick fall speed.
* Space bar will drop the brick.

Bugs &amp; Issues:
------------------

* Rotating a block next to the side of the screen, or next to another static block,
may cause the block to rotate out-of-bounds or into the other block, causing it to
lock in place.

Future work:
------------

* Current scoring system is only counting lines. Implement a more complex scoring system
that rewards multiple lines at once.
