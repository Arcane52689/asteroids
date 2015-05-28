#Austroids
An Aussie style spinoff on the classic Asteroids game.  Players must keep the koala safe from the various Australian dangers.  You can hit space to fire eucalyptus leaves which eliminate dangers on hit.  You hi  If you wonder why, you've never smelled pure eucalyptus.
## [Play here!](http://arcane52689.github.io/asteroids/)!
##Instructions:
+ Hit space to fire a leaf
+ Hit A or D to rotate left and right respectively
+ Hit W to speed forward
+ Hit S to slow down.  Be careful, you can come to a stop!




### Information
Austroids is a browser based javascript game, which uses a HTML5 canvas element as the board.  The game is broken up into different moving objects, which allows the code to be dried up significantly.  The direction of movement for the ship is determined by radians variable held internally.  Using this, it calculates the velocity by multiplying by x * cos and y * sin.  Using the same formula, I place a pointer around the koala, so that a player can see which direction they're facing.
