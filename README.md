# Glory Cloud War
An online crusader fight-to-the-death for two players.

## Technologies Used
* HTML
* CSS
* Javascript
* JQuery
* Phaser

## Approach Taken
* Researched platformer games and created basic layout screen
* Added platforms and characters
* Animated characters
* Created kill-function for characters
  - Ability to jump-on enemy, but not die by hitting platforms
  - Added score-keeping
* Loaded music and backgrounds
* Created loading menu
* Created win-function screen
  - Added restart and reset-score functions.
* Made everything beautiful.

## Loading States
Screenshots for each game-state, or loading state

### Menu Screen
![Image of Menu](https://freekev.github.io/Cloud/assets/SSMenu.png)

### Gameplay
![Image of Gameplay](https://freekev.github.io/Cloud/assets/SSPlay.png)

### Win Screen and Reload
![Image of Win Screen](https://freekev.github.io/Cloud/assets/SSWin.png)

## Issues
* Hard-refreshing the browser was needed a few times, and I spent a while finding that out
* Score display in main window made difficult because of Phaser function issues
  - Kill & destroy functions wouldn't remove text from window (as here: http://www.html5gamedevs.com/topic/19692-problem-with-destroy/)

## More?
* Could create multiple levels (Differing platforms, etc.)
* Characters have a screen-wrap-around and aren't blocked by all world-bounds
* Body physics changed so that a character falls faster than he jumps

## Resources
* Font - https://fonts.google.com/specimen/Press+Start+2P
* Sprite - https://devilsgarage.itch.io/citadel-crashers-sprites-non-commercial-only
* Backgrounds - https://vnitti.itch.io/glacial-mountains-parallax-background
* Audio - https://opengameart.org/
