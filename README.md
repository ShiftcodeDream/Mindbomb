# Mind Bomb Javascript Remake Project
## Intro
This project aims to craft a Javascript / HTML5 remake of Mind Bomb mega demo.
This demo was released in 1990 by "The Lost Boys" (TLB) demo group composed of
only three members :
- Manikin a quite very good coder
- Spaz who crafted Graphics (Manikin did some too)
- Sammy Joe - seller (swapper too?), text writing, and all kind of magic stuff every group needs to keep on living

## File Structure
- README.md : this file
- MindBomb.html : the html file from which everything begins. It includes NoNameNo audio hack : to enable sound, navigators need a user interraction ("Click Here" image appears in this case)
- map.html : for curious, the hole menu screen map, displayed with data extracted from the source code of the original demo available at https://github.com/ggnkua/Atari_ST_Sources/tree/master/ASM/TLB/Mindbomb
- media : folder for all resources of the demos : demo javascript files, images, sounds, external libraries, ...
- offline : put your "work in progress" files on an `offline` folder. The content of this folder will not appear in the project (.gitignore)

## Contributing
We need help ! This mega demo is composed of 18 demos, a reset screen 
and a "main menu" screen. To be able to code everything in a reasonable delay,
we need some good volonteers! (no obligation).

## How do we do that?
We use the Antoine Santo's Codef framework to code these demos. => http://codef.santo.fr
More axamples of what could be done with this framework are available on https://www.wab.com

## Demo structure
Variable names could be a nightmare when you have several demos to integrate. So, to prevent this, a demo is defined into a class in a unique Javascript file. The Javascript file will be loaded when needed during the demo presentation screen. All javascript files are created. To se which file corresponds tp which demo, please read the DemosList.md file.

A demo class consists in several class methods (functions) called at different time during the lifetime (load, init, start, end) of the demo. See the `bearPunch.js` demo file to see an implemantation example. Here are these methods : 
t different time here are they, in the called order :
1) `load` : loads all files (graphic, music, ...) needed by the demo. The load function should return a Javascript promise that is resolved when all files are loaded.
2) `init` : called once every data have been loaded, initializes all demo variables. Do not create canvas for the "main" div here. Do it during start() method
3) `start` : starts the demo. The start method returns a javascript promise that is resolved when the demo ends
4) `end` : this method is not called by the demo manager, but it is a good place to write the code to clear the place :
    - Stop the music by calling `stopCodefMusic()` function
    - Remove event listeners you added for your demo needs
    - delete (clear) the main canvas by calling `clearMainDiv()`

Keep in mind that "the show must go on" : after your demo is finished, the menuScreen demo will start again to allow the user to select another demo.

Here are some developping guidelines:
- Every variables used should begin by "this.xxx" in order to be a member of the class
- All methods should be bound with "this" : see "constructor" method to see how to do that
- methods `load` and `start` should return promises, respectively for the end of ressources download and for the end of the demo.

That's it ! Happy coding. For any questions, feel free to write to shiftcode @ gmail.com

## Tools
If you need to load a specific file, use `this.demoManager.loadResource()` function. Pass it an URL and it will return a promise with an objet with the appropriate usage according to the file extension (codef image, script, ...)
Pass it a table of URL, and it will return a table of promise for all files.

## Promises? What's this?
A promise is an action that takes time and could be achieved or failed to achieve. For example, when you ask your browser to load an image from the internet, you know that the result will not be
immediately available : it takes times to download, and all kind of bad things could appens : file not found, network broken, etc.. So to manage that in a pseudo language, we could say :

"Load this image"

"Once done, do the following : ..."

"If something wrong occurs, warns the user ..."

-----
So, in Javascript, the translation is :

downloadThisUmage("imageurl.jpg").then(function () {// ... do the following ...}).catch(function(){ // ... warns the user ...});

Or in another multiline form, using the contraction ()=>{} to define a function :
```
downloadThisUmage("imageurl.jpg")
.then(() => {// ... do the following ...})
.catch(() => { // ... warns the user ...});
```
The function inside .then() and .catch() can take argument to retrieve the result of tha action done (eg the image that just have been loaded, or the error message in case of .catch())

## Git Branches
### DemoName_NickName
Before starting to code, checkout to develop branch and create a new branch. The name of the branch is the name of the demo (see `DemosList.md`) followed by an underscore, followed by your pseudo. For example : DiMindBomb_shiftcode
### Test
I (shiftcode) will merge your developments into branches `test` for testing
### Master
When ready, your developments will be merged with `master` for final (production) integration.

## A tip to finish:
If introduction animation bored you, go to MindBomd.html and uncomment the line after "IMPORTANT AND VERY USEFULL" line : this allows to start one demo without having these animations and presentation text.

# Too complicated, I'm lost !
If you used to develop Codef demos and are a bit disapointed or lost with these constraints, just develop your demo screen the same way you used to, finish it and send me a zip file with your demo, images and sound at shiftcode @ gmail.com. I'll do the integration for you. (Just keep in mind file names are CASE SENSITIVE).

# Happy coding !
