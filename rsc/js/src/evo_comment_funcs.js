/**
 * This file initialize JS for Comments
 *
 * This file is part of the evoCore framework - {@link http://evocore.net/}
 * See also {@link https://github.com/b2evolution/b2evolution}.
 *
 * @license GNU GPL v2 - {@link http://b2evolution.net/about/gnu-gpl-license}
 *
 * @copyright (c)2003-2020 by Francois PLANQUE - {@link http://fplanque.com/}
 * 
 * Depends on: jQuery
 */
jQuery( document ).ready( function()
{
	if( typeof( evo_comment_funcs_config ) == 'undefined' )
	{	// Don't execute code below because no config var is found:
		return;
	}

	var config = evo_comment_funcs_config;

	// General variables
	var modifieds = new Array();

	// Dashboard variables
	var removed_ids     = new Array();
	var displayed       = config.displayed;
	var refresh_started = false;

	window.isDefined = function isDefined( variable )
		{
			return ( typeof( variable ) != 'undefined' );
		};

	//Fade in background color
	window.fadeIn = function fadeIn( selector, color )
		{
			if( jQuery( selector ).length == 0 )
			{
				return;
			}
			if( jQuery( selector ).get(0).tagName == 'TR' )
			{	// Fix selector, <tr> cannot have a css property background-color
				selector = selector + ' td';
			}
			var bg_color = jQuery( selector ).css( 'backgroundColor' );
			jQuery( selector ).animate( { backgroundColor: color }, 200 );
			return bg_color;
		};

	window.fadeInStatus = function fadeInStatus( selector, status )
		{
			switch( status )
			{
				case 'published':
					return fadeIn( selector, '#99EE44' );
				case 'community':
					return fadeIn( selector, '#2E8BB9' );
				case 'protected':
					return fadeIn( selector, '#FF9C2A' );
				case 'review':
					return fadeIn( selector, '#CC0099' );
				case 'deprecated':
					return fadeIn( selector, '#656565' );
				case 'deleted':
					return fadeIn( selector, '#fcc' );
				case 'spam':
					return fadeIn( selector, '#ffc9c9' );
				case 'notsure':
					return fadeIn( selector, '#bbbbbb' );
				case 'ok':
					return fadeIn( selector, '#bcffb5' );
			}
		};

	window.delete_comment_url = function delete_comment_url( comment_id )
		{
			var selector = '#commenturl_' + comment_id;
			fadeIn( selector, '#fcc' );

			jQuery.ajax( {
					type: 'POST',
					url: htsrv_url + 'async.php',
					data: {
							'blogid': config.blog_ID,
							'commentid': comment_id,
							'action': 'delete_comment_url',
							'crumb_comment': config.crumb_comment,
						},
					success: function( result ) { jQuery( selector ).remove(); }
				} );
		};

	window.show_modified = function show_modifieds()
		{
			for( var id in modifieds )
			{
				fadeInStatus( '#' + id, modifieds[id] );
			}
		};

	// Set comments status
	window.setCommentStatus = function setCommentStatus( id, status, request_from, redirect_to )
		{
			var divid    = 'comment_' + id;
			var selector = '[id=' + divid + ']';

			if( typeof( modifieds[divid] ) != 'undefined' )
			{	// This comment is in process now, Wait the ending of previous action
				return;
			}
			modifieds[divid] = status;

			var color         = fadeInStatus( selector, status );
			var statuses      = get_show_statuses();
			var expiry_status = get_expiry_status();
			var currentpage   = get_current_page();
			var item_id       = get_itemid();
			var limit         = get_limit();

			var ajax_data = {
					'blogid': config.blog_ID,
					'commentid': id,
					'status': status,
					'limit': limit,
					'action': 'set_comment_status',
					'request_from': request_from,
					'moderation': 'commentlist',
					'statuses': statuses,
					'expiry_status': expiry_status,
					'itemid': item_id,
					'currentpage': currentpage,
					'redirect_to': redirect_to,
					'crumb_comment': config.crumb_comment,
				};

			if( config.is_admin_page )
			{
				ajax_data.is_backoffice = 1;
			}

			jQuery.ajax( {
				type: 'POST',
				url: htsrv_url + 'anon_async.php',
				data: ajax_data,
				success: function(result)
					{
						delete modifieds[divid];
						if( request_from == 'front' )
						{
							fadeIn( selector, color );
							var statuses = ajax_debug_clear( result ).split( ':' );
							var new_status = statuses[0];
							if( new_status == '' )
							{	// Status was not changed
								return;
							}
							var class_name = jQuery( selector ).attr( 'class' );
							class_name = class_name.replace( /vs_([a-z]+)/g, 'vs_' + new_status );
							jQuery( selector ).attr( 'class', class_name );
							update_moderation_buttons( selector, statuses[1], statuses[2] );
						}
						else if( request_from == 'dashboard' || request_from == 'coll_settings' )
						{
							updateCommentsList( divid );
						}
						else
						{
							jQuery( '#comments_container' ).html( ajax_debug_clear( result ) );
							jQuery( '.vote_spam' ).show();
							show_modifieds();
						}
					},
				error: function(msg)
					{
						if( msg && msg.statusText != '' )
						{
							evoAlert( msg.statusText );
						}
						fadeIn( selector, color );
						delete modifieds[divid];
					}
				} );
		};

	// Display voting tool when JS is enable
	jQuery( '.vote_spam' ).show();

	// Set comments vote
	window.setCommentVote = function setCommentVote( id, type, vote )
		{
			var selector = '#comment_' + id;
			var color = fadeInStatus( selector, vote );

			var highlight_class = '';
			switch(vote)
			{
				case 'spam':
					highlight_class = config.button_class_button_red;
					break;
				case 'ok':
					highlight_class = config.button_class_button_green;
					break;
			}

			var ajax_data = {
				'blog': config.blog_ID,
				'commentid': id,
				'type': type,
				'vote': vote,
				'action': 'set_comment_vote',
				'b2evo_icons_type': config.b2evo_icons_type,
				'crumb_comment': config.crumb_comment,
			}
			if( config.is_admin_page )
			{
				ajax_data.is_backoffice = 1;
			}

			if( highlight_class != '' )
			{
				jQuery( '#vote_'+type+'_'+id ).find( config.button_class_button ).addClass( highlight_class );
			}

			jQuery.ajax( {
					type: 'POST',
					url: htsrv_url + 'anon_async.php',
					data: ajax_data,
					success: function(result)
						{
							fadeIn( selector, color );
							jQuery('#vote_'+type+'_'+id).after( ajax_debug_clear( result ) );
							jQuery('#vote_'+type+'_'+id).remove();
						}
				} );
		};


	/**
	 * Edit comment
	 *
	 * @param string Action: 'form', 'update', 'cancel'
	 * @param integer Comment ID
	 */
	window.edit_comment = function edit_comment( action, comment_ID )
		{
			var content_obj = jQuery( '#editable_comment_' + comment_ID );

			if( content_obj.length == 0 )
			{	// No container with comment text found, Exit here and allow go to by link url
				return true;
			}

			var comment_content = '';
			if( action == 'update' )
			{
				var textarea_obj = content_obj.find( 'textarea' );
				if( textarea_obj.length == 0 )
				{	// No textarea with content
					return;
				}
				comment_content = textarea_obj.val();
			}

			jQuery.ajax(
				{
					type: 'POST',
					url: htsrv_url + 'async.php',
					data: {
							'commentid': comment_ID,
							'action': 'edit_comment',
							'comment_action': action,
							'comment_content': comment_content,
							'crumb_comment': config.crumb_comment,
						},
					success: function( result )
						{
							content_obj.html( ajax_debug_clear( result ) );

							// Init autocomplete usernames:
							if( window.init_autocomplete_usernames )
							{
								init_autocomplete_usernames();
							}
						}
				} );

			return false;
		};


	// Delete comment
	window.deleteComment = function deleteComment( commentId, request_from, comment_type )
		{
			if( typeof( comment_type ) == 'undefined' )
			{
				comment_type = 'feedback';
			}

			if( comment_type == 'meta' && ! confirm( config.delete_confirmation_msg ) )
			{	// Internal comments are deleted permanently, We should confirm this
				return false;
			}

			var divid = 'comment_' + commentId;
			var selector = '#' + divid;

			if( typeof( modifieds[divid] ) != 'undefined' )
			{	// This comment is in process now, Wait the ending of previous action
				return;
			}
			modifieds[divid] = 'deleted';

			var color         = fadeIn( selector, '#fcc' );
			var statuses      = get_show_statuses();
			var expiry_status = get_expiry_status();
			var item_id       = get_itemid();
			var currentpage   = get_current_page();
			var limit         = get_limit();

			if( comment_type != 'meta' )
			{	// Internal comments aren't moved into recycle bin, they are deleted permanently
				var recycle_bin = jQuery( '#recycle_bin' );
				if( recycle_bin.length > 0 && recycle_bin.html() == '' )
				{	// Load and display a link to recycle bin
					jQuery.ajax( {
						type: 'POST',
						url: htsrv_url + 'async.php',
						data: {
								'action': 'get_opentrash_link',
								'blog': config.blog_ID,
								'request_from': request_from,
								'crumb_comment': config.crumb_comment,
							},
						success: function(result)
							{
								recycle_bin.replaceWith( ajax_debug_clear( result ) );
							}
						} );
				}
			}

			jQuery.ajax( {
				type: 'POST',
				url: htsrv_url + 'async.php',
				data: {
						'blogid': config.blog_ID,
						'commentid': commentId,
						'action': 'delete_comment',
						'request_from': request_from,
						'itemid': item_id,
						'comment_type': comment_type,
						'statuses': statuses,
						'expiry_status': expiry_status,
						'currentpage': currentpage,
						'limit': limit,
						'crumb_comment': config.crumb_comment,
					},
				success: function( result )
					{
						var target_selector = ( comment_type == 'meta' ? '#comments' : '#recycle_bin' );
						jQuery( selector ).transfer( { to: target_selector, duration: 700 }, function() {
								delete modifieds[divid];
								if( request_from == 'dashboard' || request_from == 'coll_settings' )
								{
									updateCommentsList( divid );
								}
								else
								{
									jQuery( '#comments_container' ).html( ajax_debug_clear( result ) );
									jQuery( '.vote_spam' ).show();
									show_modifieds();
								}
							});
					},
				error: function( msg )
					{
						if( msg && msg.statusText != '' )
						{
							evoAlert( msg.statusText );
						}
						if( color != '' )
						{
							fadeIn( selector, color );
						}
						delete modifieds[divid];
					}
				} );
		};

	// Ban comment url
	window.ban_url = function ban_url( authorurl )
		{
			openModalWindow( '<span class="loader_img loader_ban_url absolute_center" title="' + config.loading_msg + '"></span>' +
					'<iframe id="modal_window_frame_ban" src="' + config.admin_url + '?ctrl=antispam&action=ban&display_mode=js&mode=iframe&request=checkban&keyword=' +
					authorurl + '&crumb_antispam=' + config.crumb_antispam + '" width="100%" height="500px" frameborder="0" style="display:none"></iframe>',
					'90%', '', true,
					config.confirm_ban_delete_title,
					[ config.perform_selected_operations_msg, 'btn-danger', '#antispam_ban' ], true, false, 'modal_window_frame_ban' );

			var submitButton = jQuery( '.modal-footer button:submit' ).not( '[data-dismiss=modal]' );
			submitButton.on( 'click', function() { addSpinner( this ) } );
			jQuery( '#modal_window_frame_ban' ).on( 'load', function() {
				if( submitButton.hasClass( 'btn-spinner' ) )
				{
					submitButton.removeClass( 'btn-spinner' );
					submitButton.css( 'width', '-=24px' );
				}
			});
		};

	// Refresh comments on dashboard after ban url -> delete comment
	window.refreshAfterBan = function refreshAfterBan( deleted_ids )
		{
			var comment_ids = String(deleted_ids).split(',');
			for( var i=0;i<comment_ids.length; ++i )
			{
				fadeIn( '#comment_' + comment_ids[i], '#fcc' );
			}
			var item_id = get_itemid();
			refresh_item_comments( item_id );
		};

	window.closedModalAfterBan = function closeModalAfterBan()
		{
			// Copy messages from modal to the page:
			jQuery( '#server_messages' ).html( '' ).append( jQuery( '#modal_window_frame_ban').contents().find( '.action_messages' ) );
			// Close modal window:
			closeModalWindow();
		};

	//Process result after publish/deprecate/delete action has been completed
	window.processResult = function processResult( result, modifiedlist )
		{
			var resultObject = jQuery( '<div/>' );
			resultObject.html( result );

			var removed_count = 0;
			// Remove those comments which were moderated during refresh
			for( var id in removed_ids )
			{
				var removed_comment = resultObject.find( '#' + removed_ids[id] );
				if( removed_comment.length !== 0 )
				{	// The removed element is in the refreshed content
					removed_comment.remove();
					var new_visible_comment = resultObject.find( ".hidden_comment:first" );
					new_visible_comment.removeClass( 'hidden_comment' );
					removed_count = removed_count + 1;
				}
			}
			// Clear removed_ids content, because it was already processed
			removed_ids.length = 0;

			// Update comments container content with up to date content
			jQuery( '#comments_container' ).html( resultObject.html() );

			var comments = jQuery( '#comments_container [id^=comment_]' );
			if( comments )
			{	// Set displayed comments number ( even hidden comments are counted )
				displayed = comments.length;
			}
			else
			{
				displayed = 0;
			}
			for( var id in modifiedlist )
			{
				switch( modifiedlist[id] )
				{
					case 'published':
						jQuery('#' + id).css( 'backgroundColor', '#339900' );
						break;
					case 'deprecated':
						jQuery('#' + id).css( 'backgroundColor', '#656565' );
						break;
					case 'deleted':
						jQuery('#' + id).css( 'backgroundColor', '#fcc' );
						break;
				}
			}

			var comments_number = jQuery('#new_badge').val();
			if(comments_number == '0')
			{	// no comments, so remove the comment block
				var options = {};
				jQuery('#comments_block').effect('blind', options, 200);
				jQuery('#comments_block').remove();
			}
			else
			{	// update comments awaiting moderation number
				var new_value = parseInt(comments_number) - removed_count;
				jQuery('#badge').text(new_value);
			}
		};

	//Absolute refresh comment list
	window.refreshComments = function refreshComments( request_from )
		{
			if( refresh_started )
			{	// a refresh comments process was already started
				return;
			}
			refresh_started = true;

			jQuery.ajax( {
					type: 'POST',
					url: htsrv_url + 'async.php',
					data: {
							'blogid': config.blog_ID,
							'action': 'refresh_comments',
							'request_from': request_from,
							'crumb_comment': config.crumb_comment,
						},
					success: function( result )
						{
							processResult( ajax_debug_clear( result ), modifieds );
							jQuery( '#comments_container' ).slideDown('fast');
							jQuery( '.vote_spam' ).show();
							refresh_started = false;
						},
					error: function( msg )
						{
							if( msg && msg.statusText != '' )
							{
								evoAlert(msg.statusText);
							}
							refresh_started = false;
						}
				} );
		};

	window.startRefreshComments = function startRefreshComments( request_from, item_id, currentpage, comment_type )
		{
			if( request_from == "dashboard" || request_from == 'coll_settings' )
			{
				jQuery('#comments_container').slideUp('fast', refreshComments( request_from ) );
			}
			else
			{
				jQuery('#comments_container').fadeTo( 'slow', 0.1, function() {
						refresh_item_comments( item_id, currentpage, comment_type );
					} );
			}
		};

	window.endRefreshComments = function endRefreshComments( result )
		{
			jQuery( '#comments_container' ).html( result );
			jQuery( '#comments_container' ).fadeTo( "slow", 1 );
			jQuery( '.vote_spam' ).show();
		};

	window.get_current_page = function get_current_page()
		{
			if( ( isDefined( jQuery( '#currentpage' ) ) ) && isDefined( jQuery( '#currentpage' ).attr( 'value' ) ) )
			{
				return jQuery( '#currentpage' ).attr( 'value' );
			}
			return 1;
		};

	window.get_limit = function get_limit()
		{
			var limit = jQuery( 'select[name$=_per_page]' );
			if( ( isDefined( limit ) ) )
			{
				return limit.val();
			}
			return 0;
		};

	window.get_show_statuses = function get_show_statuses()
		{
			if( jQuery( '#only_moderation' ) && jQuery( '#only_moderation' ).is( ':checked' ) )
			{
				return '#only_moderation#';
			}
			else if( jQuery( '#only_valid' ) && jQuery( '#only_valid' ).is( ':checked' ) )
			{
				return '#only_valid#';
			}

			return '#all#';
		};

	window.get_expiry_status = function get_expiry_status()
		{
			var expiry_status = 'active';
			if( jQuery( '#show_expiry_all' ) && jQuery( '#show_expiry_all' ).prop( 'checked' ) )
			{
				expiry_status = 'all';
			}

			return expiry_status;
		};

	window.get_itemid = function get_itemid()
		{
			var item_id = jQuery( '#comments_container' ).attr( 'value' );
			if( ! isDefined( item_id) )
			{
				item_id = -1;
			}

			return item_id;
		};

	window.refresh_item_comments = function refresh_item_comments( item_id, currentpage, comment_type )
		{
			var statuses = get_show_statuses();
			var expiry_status = get_expiry_status();

			if( ! isDefined( currentpage ) )
			{
				currentpage = get_current_page();
			}
			if( ! isDefined( item_id ) )
			{	// show all comments
				item_id = -1;
			}

			if( typeof( comment_type ) == 'undefined' )
			{
				comment_type = 'feedback';
			}

			jQuery.ajax({
					type: 'POST',
					url: htsrv_url + 'async.php',
					data: {
							'blogid': config.blog_ID,
							'action': 'refresh_comments',
							'request_from': config.request_from,
							'itemid': item_id,
							'statuses': statuses,
							'expiry_status': expiry_status,
							'currentpage': currentpage,
							'comment_type': comment_type
						},
					success: function( result )
						{
							endRefreshComments( ajax_debug_clear( result ) );
							show_modifieds();
						},
					error: function( msg )
						{
							if( msg && msg.statusText != '' )
							{
								evoAlert(msg.statusText);
							}
						}
				} );
		};

	//Decrease the number of comments awaiting moderation on the badge
	window.decrease_comments_number = function decrease_comments_number( value )
		{
			var comments_number = parseInt( jQuery( '#badge' ).text() );
			if( comments_number )
			{
				comments_number = comments_number - value;
				jQuery( '#badge' ).text( comments_number );
			}
		};

	//Update the comments list: Remove current comment from list, show next hidden comment and load new comments if it is required
	window.updateCommentsList = function updateCommentsList( divid )
		{
			displayed = displayed - 1;
			decrease_comments_number( 1 );
			jQuery( '#' + divid ).remove();
			jQuery( '.hidden_comment:first' ).removeClass( 'hidden_comment' );
			if( refresh_started )
			{	// Save removed comments divid, to make sure refresh will not put it back
				removed_ids.push(divid);
			}
			jQuery( '.dashboard_post:visible' ).removeClass( 'dashboard_post_odd dashboard_post_even' );
			jQuery( '.dashboard_post:visible:even' ).addClass( 'dashboard_post_even' );
			jQuery( '.dashboard_post:visible:odd' ).addClass( 'dashboard_post_odd' );

			if( displayed < 6 )
			{	// Reload list to fill up the hidden comments list, so we always have enough comments to moderate.
				refreshComments( 'dashboard' );
			}
		};

	// Add classes for first and last roundbuttons, because css pseudo-classes don't support to exclude hidden elements
	window.update_moderation_buttons = function update_moderation_buttons( selector, raise_status, lower_status )
		{
			var parent_selector = config.button_class_group + ' ';
			if( typeof( selector ) != 'undefined' )
			{
				parent_selector = selector + ' ' + parent_selector;
			}
			selector = parent_selector + config.button_class_text;

			// Clear previous classes of first and last visible buttons
			jQuery( selector ).removeClass( 'first-child last-child btn_next_status' );
			// Make the raise and lower button are visible
			jQuery( selector + '.btn_raise_status_' + raise_status ).addClass( 'btn_next_status' );
			jQuery( selector + '.btn_lower_status_' + lower_status ).addClass( 'btn_next_status' );
			// Add classes for first and last buttons to fix round corners
			jQuery( selector + ':visible:first' ).addClass( 'first-child' );
			jQuery( selector + ':visible:last' ).addClass( 'last-child' );
		};
	
} );
