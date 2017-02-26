
( function ()
{
    'use strict';

    var shell = require ( 'electron' ).shell;

    function checkDomElement ( element )
    {
        var href;
        var isExternal = false;

        if ( 'A' === element.nodeName )
        {
            href = element.getAttribute ( 'href' );
        }

        if ( element.classList.contains ( 'js-external-link' ) )
        {
            isExternal = true;
        }

        if ( href && isExternal )
        {
            shell.openExternal ( href );

            e.preventDefault();

        } else if ( element.parentElement )
        {
            checkDomElement ( element.parentElement );
        }

    }

    function supportExternalLinks ( e )
    {
        checkDomElement ( e.target );
    }

    document.addEventListener ( 'click', supportExternalLinks, false );

} ( ) );
