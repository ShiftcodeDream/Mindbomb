# Mind Bomb Javascript Remake Project
## Intro
This project aims to craft a Javascript / HTML5 remake of Mind Bomb mega demo.
This demo was released in 1990 by "The Lost Boys" (TLB) demo group composed of
only three members :
- Manikin a quite very good coder
- Spaz who crafted Graphics (Manikin did some too)
- Sammy Joe - seller (swapper too?), text writing, and all kind of magic stuff every group needs to keep on living

## Contributing
We need help ! This mega demo is composed of 18 demos, a reset screen 
and a "main menu" screen. To be able to code everything in a reasonable delay,
we need some good volonteers! (no obligation).

## How do we do that?
We use the Antoine Santo's Codef framework to code these demos. => http://codef.santo.fr
More axamples of what could be done with this framework are available on https://www.wab.com

## Project structure
Variable names could be a nightmare when you have several demos to integrate. So, to prevent this, a demo is defined in a unique Javascript file that will be loaded when needed.
I created for you all these files, you just need to modifiy it. Here is how they work :

- Every variables used should begin by "this.xxx" in order to be a member of the class
- All methods should be bound with "this" : see constructor method of the class to understand how to do that
- The class should have different methods called at different time here are they, in the called order :
1) load() : loads all files needed by the demo. It returns a Javascript promise that is resolved when all files are loaded
2) init() : called once every data have been loaded, initializes all demo variables.
3) start() : called when the demo needs to be started. The start method returns a javascript promise that is resolved when the demo ends
4) end() : internally called function, this function removes all event listeners: keeping these listeners active outside the demo is bug prone, so they mus be removed.

Note : Whenever load function did not resolved the promise, the "loading screen" appears in the screen, displaying demo description.

That's it ! Happy coding. For any questions, feel free to write to shiftcode @ gmail.com

## Tools
If you want to clear the screen after a demo, use clearMainDiv() function.
If you need to load a specific file, use loadResource() function. Pass it an URL and it will return an objet with the appropriate usage according to the file extension. 
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

## A tip to finish:
If introduction animation bored you, go to MindBomd.html and uncomment the line after "IMPORTANT AND VERY USEFULL" line : this allows to start one demo without having these animations and presentation text.
