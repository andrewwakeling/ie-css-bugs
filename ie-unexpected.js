/**
 * Unexpected behaviour with stylesheets in IE8-10.
 *
 * Note: These tests are not designed to run in other browsers than the ones specified.
 *
 * Note: Functions are EXPECTED to return errors.
 */

/**
 * KB262161 details unexpected behaviour commonly occurs because the following conditions are true in Internet Explorer:
 * - All style tags after the first 31 style tags are not applied
 * - All style rules after the first 4,095 rules are not applied
 * - On pages that uses the @import rule to continously import external style sheets that import other style sheets, style sheets that are more than three levels deep are ignored
 * Source: http://support.microsoft.com/kb/262161
 */

// -------------------------------------------------------------------------------------------------
/**
 * Helper function to alert whether an error occurs or not.
 * @param err
 */
function alertError(err) {
    if (err) {
        alert(err);
    } else {
        alert('No error occurred.');
    }
}

/**
 * Create a stylesheet directly through a style tag.
 * @returns (DOM style element) If the stylesheet was disabled upon creation, then return the style DOM element, otherwise return null.
 */
function createStyle() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.styleSheet.cssText = 'body { background-color: red; }';
    document.getElementsByTagName('head')[0].appendChild(style);
    if (style.styleSheet.disabled) {
        return style;
    } else {
        return null;
    }
}

/**
 * Create a stylesheet through the linked stylesheet.
 * @returns {String} A string describing an error which occurred, or null if no error occurred.
 */
function createLinkStylesheet() {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'data:text/css;base64,Ym9keSB7IGJhY2tncm91bmQtY29sb3I6IHJlZDsgfQ=='); // body { background-color: red; }
    document.getElementsByTagName('head')[0].appendChild(link);
    if (link.styleSheet === null) {
        return 'a linked stylesheet returned a null styleSheet property because you have too many stylesheets.';
    } else {
        return null;
    }
}

// -------------------------------------------------------------------------------------------------
/**
 * Create excessive stylesheets through the link linked stylesheet.
 * @param callback - function(err)
 */
function demo31StylesheetLinkLimit(callback) {
    var x;
    for (x = 0; x < 32; x++) {
        var error = createLinkStylesheet();
        if (error) {
            return callback(error);
        }
    }
    callback(null);
}

/**
 * Create excessive stylesheets through the style tag. If a stylesheet is disabled when created, return it along with an error.
 * @param callback - function(err, disabledStylesheet)
 */
function demo31StyleLimit(callback) {
    var x;
    for (x = 0; x < 32; x++) {
        var disabledStylesheet = createStyle();
        if (disabledStylesheet) {
            return callback('a stylesheet was automatically disabled because you have too many stylesheets.', disabledStylesheet);
        }
    }
    callback(null);
}

/**
 * Attempt to alter the "disabled" flag once we have excessive stylesheets declared.
 * @param callback - function(err)
 */
function demoInabilityToEnable(callback) {
    demo31StyleLimit(function (err, disabledStylesheet) {
        if (!err) {
            callback(null);
        } else {
            disabledStylesheet.styleSheet.disabled = false;
            if (disabledStylesheet.styleSheet.disabled === true) {
                callback('unable to enable stylesheet because you have too many stylesheets declared.');
            } else {
                callback(null);
            }
        }
    });
}

/**
 * Attempt to add css text once we have excessive stylesheets declared.
 * @param callback - function(err)
 */
function demoInabilityToAddCss(callback) {
    demo31StyleLimit(function (err, disabledStylesheet) {
        if (!err) {
            callback(null);
        } else {
            var error = null;
            try {
                disabledStylesheet.styleSheet.cssText += 'div { background-color: blue; }';
            } catch (e) {
                error = e;
            }
            if (error) {
                callback('unable to add css text because you have too many stylesheets declared. Error throw was: ' + error.toString());
            } else {
                callback(null);
            }
        }
    });
}

/**
 * Attempt to assign css text once we have excessive stylesheets declared.
 * @param callback - function(err)
 */
function demoInabilityToAssignCss(callback) {
    demo31StyleLimit(function (err, disabledStylesheet) {
        if (!err) {
            callback(null);
        } else {
            var error = null;
            try {
                disabledStylesheet.styleSheet.cssText = 'div { background-color: blue; }';
            } catch (e) {
                error = e;
            }
            if (error) {
                callback('unable to assign css text because you have too many stylesheets declared. Error throw was: ' + error.toString());
            } else {
                callback(null);
            }
        }
    });
}

/**
 * Create excessive rules in a style tag.
 * @param callback - function(err)
 */
function demo4095RulesInStyleLimit(callback) {
    var x;
    var rules = [];
    for (x = 0; x < 4096; x++) {
        rules.push('.r' + x + ' { background-color: red; }');
    }
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.styleSheet.cssText = rules.join('');
    if (style.styleSheet.rules.length === rules.length) {
        callback(null);
    } else {
        callback('only ' + style.styleSheet.rules.length + ' were parsed even though ' + rules.length + ' rules were defined in a style tag');
    }
}

/**
 * Create excessive rules in a linked stylesheet.
 * @param callback - function(err)
 */
function demo4095RulesInLinkedStylesheetLimit(callback) {
    var name = '4096rules.css';
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', name);
    document.getElementsByTagName('head')[0].appendChild(link);

    // I acknowledge that this is a very rough way of waiting for document ready.
    var intervalId = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(intervalId);
            if (link.styleSheet.rules.length === 4096) {
                callback(null);
            } else {
                callback('only ' + link.styleSheet.rules.length + ' were parsed even though 4096 rules were defined in "' + name + '"');
            }
        }
    }, 300);
}

/**
 * Attempt to crash the browser by using 'import' directive on an orphaned style element.
 * @param callback - function(err)
 */
function demoImportCrash(callback) {
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.styleSheet.cssText = "@import '404.css';"; // The specified import doesn't even have to exist.
    callback(null);
}

/**
 * Attempt to crash the brwoser by using the 'font-face' directive (with a 'src' rule) on orphaned style element.
 * @param callback - function(err)
 */
function demoFontFaceSrcCrash(callback) {
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.styleSheet.cssText = "@font-face { src: url('foo'); }"; // The specified src doesn't even have to exist.
    callback(null);
}
