<?php
/**
 * This file implements the UI view for the demo content panel on blog management screens.
 *
 * b2evolution - {@link http://b2evolution.net/}
 * Released under GNU GPL License - {@link http://b2evolution.net/about/gnu-gpl-license}
 * @copyright (c)2003-2018 by Francois Planque - {@link http://fplanque.com/}
 */
if( !defined('EVO_MAIN_INIT') ) die( 'Please, do not access this page directly.' );

global $admin_url;

load_funcs( 'collections/_demo_content.funcs.php' );
load_funcs( 'dashboard/model/_dashboard.funcs.php' );

$welcome_content_Widget = new Widget( 'block_item' );
	echo '<form action="'.$admin_url.'?ctrl=dashboard&amp;action=new_demo_content" method="post" class="evo_form__install">';
	echo '<input type="hidden" name="action" value="new_demo_content" />';
	echo '<input type="hidden" name="install_test_features" value="0" />';

	$welcome_content_Widget->title = T_('Welcome to b2evolution');
	$welcome_content_Widget->no_results_text = 'Hello World';
	$welcome_content_Widget->disp_template_replaced( 'block_start' );

	echo '<p>'.T_('Your b2evolution installation is installed and working but there is no content yet.').'</p>';
	echo '<p>'.T_('Would you like to create some demo contents to get a better understanding of how things work? You can easily delete these demo contents when you no longer need them.').'</p>';
	echo echo_installation_options( array(
			'enable_create_demo_users' => get_table_count( 'T_users', 'user_ID != 1' ) === 0,
			'show_create_organization' => get_table_count( 'T_users__organization') === 0,
			'show_create_messages'     => get_table_count( 'T_messaging__message' ) === 0,
		) );

	?>
	<p class="evo_form__install_buttons">
		<button id="cancel_button" type="submit" class="btn btn-primary"><?php echo T_('Create!')?></button>
	</p>
	</form>
	<?php

	$welcome_content_Widget->disp_template_replaced( 'block_end' );
?>