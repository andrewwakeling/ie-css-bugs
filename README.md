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


License
===========

The MIT License (MIT)

Copyright (c) 2013 Andrew Wakeling <[andrew.wakeling@gmail.com](mailto:andrew.wakeling@gmail.com)>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.