/**
 * This file initialize Comment rating
 *
 * This file is part of the evoCore framework - {@link http://evocore.net/}
 * See also {@link https://github.com/b2evolution/b2evolution}.
 *
 * @license GNU GPL v2 - {@link http://b2evolution.net/about/gnu-gpl-license}
 *
 * @copyright (c)2003-2020 by Francois PLANQUE - {@link http://fplanque.com/}
 */

jQuery( document ).ready( function()
{
	if( typeof( evo_comment_rating_config ) == 'undefined' )
	{	// Don't execute code below because no config var is found:
		return;
	}

	jQuery( '#comment_rating' ).html( '' ).raty( evo_comment_rating_config );
} );