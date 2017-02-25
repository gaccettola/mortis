

### sample template for writing code that will be used in the browser or in nodejs
```
( function ( window )
{
    'use strict';

    var thing_name =
    {
        constant_thing_a    : '',

        do_fancy_thing_a    : function do_fancy_thing_a ( arg_a, arg_b )
        {
            // yeah, the named function above is captured into a name.

            // anonomous functions are not your friends.

            // no, i don't remember when or why i decided to shift
            // to this pattern.
        }

    };

    // attach to 'module.exports' if it exists, else attach to 'window'.
    // more robust : check that 'window' is a thing.

    if ( 'undefined' !== typeof module && 'undefined' !== typeof module.exports )
    {
        module.exports = thing_name;

    } else
    {
        window.thing_name = thing_name;
    }

} ) ( this );

```