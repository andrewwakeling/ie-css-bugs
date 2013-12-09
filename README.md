ie-css-bugs
===========

Collection of demos which reproduce 'severe' issues with Internet Explorer as a result of dynamically created CSS. This project is currently not focused on CSS rendering issues.

These demonstrations are currently **only** designed to run in **IE8, IE9 & IE10**. If you have a specific issue with another version of IE, please raise an issue.

Running Demos
==
Clone this repo and open a browser to index.html. Also, depending on availability, you might be able to view demos [here](https://rawgithub.com/andrewwakeling/ie-css-bugs/master/index.html).


Demonstrations include:

- issues caused by [KB262161](http://support.microsoft.com/kb/262161), especially those concerning 'styleSheet.cssText' and 'styleSheet.disabled' properties
- browser crashes when using @import and @font-face on orphaned style DOM elements
- edge-case scenarios

If you have any additions or corrections, please raise an issue.