/*
	Picturefill - a crude polyfill for proposed behavior of the picture element, which does not yet exist, but should. :)
	* Author: Scott Jehl, 2012
	* License: MIT/GPLv2
	* Notes: 
	  * For active discussion of the picture element, see http://www.w3.org/community/respimg/
	  * While this code does work, it is intended to be used only for example purposes until either:
		A) A W3C Candidate Recommendation for <picture> is released
		B) A major browser implements <picture>
*/ 
(function( w ){
	
	/*
		* Test if `<picture>` is supported natively, if so, exit - no polyfill needed.
		* Also, if `window.matchMedia is not defined, or if it is and media queries aren't supported ("only all" below), exit
		* Note: there is a polyfill available for `matchMedia`: https://github.com/paulirish/matchMedia.js
	*/
	if ( !!( w.document.createElement( "picture" ) && w.HTMLPictureElement ) || !w.matchMedia || !w.matchMedia( "only all" ) ){
		return;
	}
	
	w.picturefill = function() {
		var ps = w.document.getElementsByTagName( "picture" );
		
		// Loop the pictures
		for( var i = 0, il = ps.length; i < il; i++ ){
			var sources = ps[ i ].getElementsByTagName( "source" ),
				matches = [];
				
			// See if which sources match	
			for( var j = 0, jl = sources.length; j < jl; j++ ){
				var media = sources[ j ].getAttribute( "media" );
				if( !media || w.matchMedia( media ).matches ){
					matches.push( sources[ j ] );
				}
			}

			// Set fallback img element src from that of last matching source element
			if( matches.length ){
				var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];
				if( !picImg ){
					picImg = w.document.createElement( "img" );
					picImg.alt = ps[ i ].getAttribute( "alt" );
					ps[ i ].appendChild( picImg );
				}
				picImg.src =  matches.pop().getAttribute( "src" );
			}
		}
	};
	
	// Run on resize
	if( w.addEventListener ){
		w.addEventListener( "resize", picturefill, false );
	}
	
	/*
		Run now.
		* Note: picturefill must run first when the DOM is ready, or else it won't find any picture elements to enhance.
		* You can do this by referencing picturefill.js at the end of your document,
		* or by calling picturefill() when the DOM is ready, via a JavaScript framework's "ready" event
	*/
	picturefill();
	
})( this );