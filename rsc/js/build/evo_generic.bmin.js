/* This file includes ALL generic files that may be used on any page of front-office and back-office */

function evo_prevent_key_enter(e){jQuery(e).keypress(function(e){if(13==e.keyCode)return!1})}function evo_render_star_rating(){jQuery("#comment_rating").each(function(e){var t=jQuery("span.raty_params",this);t&&jQuery(this).html("").raty(t)})}jQuery(document).ready(function(){if("undefined"!=typeof evo_init_datepicker&&jQuery(evo_init_datepicker.selector).datepicker(evo_init_datepicker.config),"undefined"!=typeof evo_link_position_config&&(window.displayInlineReminder=evo_link_position_config.display_inline_reminder,window.deferInlineReminder=evo_link_position_config.defer_inline_reminder,jQuery(document).on("change",evo_link_position_config.selector,{url:evo_link_position_config.url,crumb:evo_link_position_config.crumb},function(e){"inline"==this.value&&window.displayInlineReminder&&!window.deferInlineReminder&&(alert(evo_link_position_config.alert_msg),window.displayInlineReminder=!1),evo_link_change_position(this,e.data.url,e.data.crumb)})),"undefined"!=typeof evo_itemform_renderers__click&&jQuery("#itemform_renderers .dropdown-menu").on("click",function(e){e.stopPropagation()}),"undefined"!=typeof evo_commentform_renderers__click&&jQuery("#commentform_renderers .dropdown-menu").on("click",function(e){e.stopPropagation()}),"undefined"!=typeof evo_disp_download_delay_config&&(window.b2evo_download_timer=evo_disp_download_delay_config,window.downloadInterval=setInterval(function(){jQuery("#download_timer").html(window.b2evo_download_timer),0==window.b2evo_download_timer&&(clearInterval(window.downloadInterval),jQuery("#download_help_url").show()),window.b2evo_download_timer--},1e3),jQuery("#download_timer_js").show()),"undefined"!=typeof evo_skin_bootstrap_forum__quote_button_click&&jQuery(".quote_button").click(function(){var e=jQuery("form[id^=evo_comment_form_id_]");return 0==e.length||(e.attr("action",jQuery(this).attr("href")),e.submit(),!1)}),"undefined"!=typeof evo_ajax_form_config)for(var e=Object.values(evo_ajax_form_config),t=0;t<e.length;t++){var i=e[t];window["ajax_form_offset_"+i.form_number]=jQuery("#ajax_form_number_"+i.form_number).offset().top,window["request_sent_"+i.form_number]=!1,window["ajax_form_loading_number_"+i.form_number]=0;var r="get_form"+i.form_number;window[r]=function(){var n="#ajax_form_number_"+i.form_number;window["ajax_form_loading_number_"+i.form_number]++,jQuery.ajax({url:htsrv_url+"anon_async.php",type:"POST",data:i.json_params,success:function(e){jQuery(n).html(ajax_debug_clear(e)),"get_comment_form"==i.json_params.action&&evo_render_star_rating()},error:function(e,t,o){jQuery(".loader_ajax_form",n).after('<div class="red center">'+o+": "+e.responseText+"</div>"),window["ajax_form_loading_number_"+i.form_number]<3&&setTimeout(function(){jQuery(".loader_ajax_form",n).next().remove(),window[r]()},1e3)}})};var o="check_and_show_"+i.form_number;window[o]=function(e){if(!window["request_sent_"+i.form_number]){var t=null!=typeof e&&e;(t=t||jQuery(window).scrollTop()>=window["ajax_form_offset_"+i.form_number]-jQuery(window).height()-20)&&(window["request_sent_"+i.form_number]=!0,window[r]())}},jQuery(window).scroll(function(){window[o]()}),jQuery(window).resize(function(){window[o]()}),window[o](i.load_ajax_form_on_page_load)}var n;"undefined"!=typeof evo_thread_form_config&&(window.check_multiple_recipients=function(){1<jQuery('input[name="thrd_recipients_array[login][]"]').length?jQuery("#multiple_recipients").show():jQuery("#multiple_recipients").hide()},window.check_form_thread=function(){return""==jQuery("input#token-input-thrd_recipients").val()||(alert(evo_thread_form_config.missing_username_msg),jQuery("input#token-input-thrd_recipients").focus(),!1)},evo_thread_form_config.token_input_config.tokenFormatter=function(e){return"<li>"+e[evo_thread_form_config.username_display]+'<input type="hidden" name="thrd_recipients_array[id][]" value="'+e.id+'" /><input type="hidden" name="thrd_recipients_array[login][]" value="'+e.login+'" /></li>'},evo_thread_form_config.token_input_config.resultsFormatter=function(e){var t=e.login;return null!=e.fullname&&void 0!==e.fullname&&(t+="<br />"+e.fullname),"<li>"+e.avatar+"<div>"+t+"</div><span></span></li>"},evo_thread_form_config.token_input_config.onAdd=function(){window.check_multiple_recipients()},evo_thread_form_config.token_input_config.onDelete=function(){window.check_multiple_recipients()},evo_thread_form_config.token_input_config.onReady=function(){evo_thread_form_config.thrd_recipients_has_error&&jQuery(".token-input-list-facebook").addClass("token-input-list-error"),jQuery("#thrd_recipients").removeAttr("required")},jQuery("#thrd_recipients").tokenInput(restapi_url+"users/recipients",evo_thread_form_config.token_input_config),window.check_multiple_recipients()),"undefined"!=typeof evo_user_func__callback_filter_userlist&&(jQuery("#country").change(function(){jQuery(this);jQuery.ajax({type:"POST",url:htsrv_url+"anon_async.php",data:"action=get_regions_option_list&ctry_id="+jQuery(this).val(),success:function(e){jQuery("#region").html(ajax_debug_clear(e)),1<jQuery("#region option").length?jQuery("#region_filter").show():jQuery("#region_filter").hide(),load_subregions(0)}})}),jQuery("#region").change(function(){load_subregions(jQuery(this).val())}),jQuery("#subregion").change(function(){load_cities(jQuery("#country").val(),jQuery("#region").val(),jQuery(this).val())}),window.load_subregions=function(t){jQuery.ajax({type:"POST",url:htsrv_url+"anon_async.php",data:"action=get_subregions_option_list&rgn_id="+t,success:function(e){jQuery("#subregion").html(ajax_debug_clear(e)),1<jQuery("#subregion option").length?jQuery("#subregion_filter").show():jQuery("#subregion_filter").hide(),load_cities(jQuery("#country").val(),t,0)}})},window.load_cities=function(e,t,o){void 0===e&&(e=0),jQuery.ajax({type:"POST",url:htsrv_url+"anon_async.php",data:"action=get_cities_option_list&ctry_id="+e+"&rgn_id="+t+"&subrg_id="+o,success:function(e){jQuery("#city").html(ajax_debug_clear(e)),1<jQuery("#city option").length?jQuery("#city_filter").show():jQuery("#city_filter").hide()}})}),"undefined"!=typeof coll_activity_stats_widget_config&&(window.resize_coll_activity_stat_widget=function(){var e=[],t=[],o=[],n=coll_activity_stats_widget_config.time_period;if(null==plot){plot=jQuery("#canvasbarschart").data("plot"),o=plot.axes.xaxis.ticks.slice(0);for(var i=0;i<plot.series.length;i++)e.push(plot.series[i].data.slice(0));if(7==e[0].length)t=e;else for(i=0;i<e.length;i++){for(var r=[],_=7,a=1;0<_;_--,a++)r.unshift([_,e[i][e[i].length-a][1]]);t.push(r)}}if(jQuery("#canvasbarschart").width()<650){if("last_week"!=n){for(i=0;i<plot.series.length;i++)plot.series[i].data=t[i];plot.axes.xaxis.ticks=o.slice(-7),n="last_week"}}else if("last_month"!=n){for(i=0;i<plot.series.length;i++)plot.series[i].data=e[i];plot.axes.xaxis.ticks=o,n="last_month"}plot.replot({resetAxes:!0})},jQuery(window).resize(function(){clearTimeout(n),n=setTimeout(resize_coll_activity_stat_widget,100)}))}),jQuery(document).ready(function(){"undefined"!=typeof evo_skin_bootstrap_forums__post_list_header&&jQuery("#evo_workflow_status_filter").change(function(){var e=location.href.replace(/([\?&])((status|redir)=[^&]*(&|$))+/,"$1"),t=jQuery(this).val();""!==t&&(e+=(-1==e.indexOf("?")?"?":"&")+"status="+t+"&redir=no"),location.href=e.replace("?&","?").replace(/\?$/,"")})}),jQuery(document).ready(function(){"undefined"!=typeof evo_comment_rating_config&&evo_render_star_rating()}),jQuery(document).ready(function(){"undefined"!=typeof evo_widget_coll_search_form&&(jQuery(evo_widget_coll_search_form.selector).tokenInput(evo_widget_coll_search_form.url,evo_widget_coll_search_form.config),void 0!==evo_widget_coll_search_form.placeholder&&jQuery("#token-input-search_author").attr("placeholder",evo_widget_coll_search_form.placeholder).css("width","100%"))}),jQuery(document).ready(function(){"undefined"!=typeof evo_autocomplete_login_config&&(jQuery("input.autocomplete_login").on("added",function(){jQuery("input.autocomplete_login").each(function(){if(!jQuery(this).hasClass("tt-input")&&!jQuery(this).hasClass("tt-hint")){var t="";t=jQuery(this).hasClass("only_assignees")?restapi_url+evo_autocomplete_login_config.url:restapi_url+"users/logins",jQuery(this).data("status")&&(t+="&status="+jQuery(this).data("status")),jQuery(this).typeahead(null,{displayKey:"login",source:function(e,n){jQuery.ajax({type:"GET",dataType:"JSON",url:t,data:{q:e},success:function(e){var t=new Array;for(var o in e.list)t.push({login:e.list[o]});n(t)}})}})}})}),jQuery("input.autocomplete_login").trigger("added"),evo_prevent_key_enter(evo_autocomplete_login_config.selector))}),jQuery(document).ready(function(){"undefined"!=typeof evo_widget_poll_initialize&&(jQuery('.evo_poll__selector input[type="checkbox"]').on("click",function(){var e=jQuery(this).closest(".evo_poll__table"),t=jQuery(".evo_poll__selector input:checked",e).length>=e.data("max-answers");jQuery(".evo_poll__selector input[type=checkbox]:not(:checked)",e).prop("disabled",t)}),jQuery(".evo_poll__table").each(function(){var e=jQuery(this);e.width()>e.parent().width()&&(jQuery(".evo_poll__title",e).css("white-space","normal"),jQuery(".evo_poll__title label",e).css({width:Math.floor(e.parent().width()/2)+"px","word-wrap":"break-word"}))}))}),jQuery(document).ready(function(){if("undefined"!=typeof evo_plugin_auto_anchors_settings){jQuery("h1, h2, h3, h4, h5, h6").each(function(){if(jQuery(this).attr("id")&&jQuery(this).hasClass("evo_auto_anchor_header")){var e=location.href.replace(/#.+$/,"")+"#"+jQuery(this).attr("id");jQuery(this).append(' <a href="'+e+'" class="evo_auto_anchor_link"><span class="fa fa-link"></span></a>')}});var t=jQuery("#evo_toolbar").length?jQuery("#evo_toolbar").height():0;jQuery(".evo_auto_anchor_link").on("click",function(){var e=jQuery(this).attr("href");return jQuery("html,body").animate({scrollTop:jQuery(this).offset().top-t-evo_plugin_auto_anchors_settings.offset_scroll},function(){window.history.pushState("","",e)}),!1})}}),jQuery(document).ready(function(){if("undefined"!=typeof evo_plugin_table_contents_settings){var o=jQuery("#evo_toolbar").length?jQuery("#evo_toolbar").height():0;jQuery(".evo_plugin__table_of_contents a").on("click",function(){var e=jQuery("#"+jQuery(this).data("anchor"));if(0==e.length||!e.prop("tagName").match(/^h[1-6]$/i))return!0;var t=jQuery(this).attr("href");return jQuery("html,body").animate({scrollTop:e.offset().top-o-evo_plugin_table_contents_settings.offset_scroll},function(){window.history.pushState("","",t)}),!1})}}),jQuery(document).ready(function(){var n,o,i,r,_;"undefined"!=typeof evo_plugin_tinymce_config__toggle_switch_warning&&(n=evo_plugin_tinymce_config__toggle_switch_warning,window.toggle_switch_warning=function(t){var e=n.activate_link,o=n.deactivate_link;return jQuery.get(t?e:o,function(e){jQuery(document).trigger("wysiwyg_warning_changed",[t])}),!1}),"undefined"!=typeof evo_plugin_tinymce_config__quicksettings&&(o=evo_plugin_tinymce_config__quicksettings,i=jQuery("#"+o.item_id),jQuery(document).on("wysiwyg_warning_changed",function(e,t){i.html(t?o.deactivate_warning_link:o.activate_warning_link)})),"undefined"!=typeof evo_plugin_tinymce_config__toggle_editor&&(r=evo_plugin_tinymce_config__toggle_editor,window.displayWarning=r.display_warning,window.confirm_switch=function(){return jQuery("input[name=hideWarning]").is(":checked")&&window.toggle_switch_warning(!1),window.tinymce_plugin_toggleEditor(r.content_id),closeModalWindow(),!1},window.tinymce_plugin_toggleEditor=function(e){var t=jQuery("#"+r.content_id);if(jQuery("[id^=tinymce_plugin_toggle_button_]").removeClass("active").attr("disabled","disabled"),!window.tinymce_plugin_init_done)return window.tinymce_plugin_init_done=!0,void window.tinymce_plugin_init_tinymce(function(){window.tinymce_plugin_toggleEditor(null)});window.tinymce.get(e)?(window.tinymce.execCommand("mceRemoveEditor",!1,e),jQuery.get(r.save_editor_state_url),jQuery("#tinymce_plugin_toggle_button_html").addClass("active"),jQuery("#tinymce_plugin_toggle_button_wysiwyg").removeAttr("disabled"),jQuery('[name="editor_code"]').attr("value","html"),jQuery(".quicktags_toolbar, .evo_code_toolbar, .evo_prism_toolbar, .b2evMark_toolbar, .evo_mermaid_toolbar").show(),jQuery("#block_renderer_evo_code, #block_renderer_evo_prism, #block_renderer_b2evMark, #block_renderer_evo_mermaid").removeClass("disabled"),jQuery("input#renderer_evo_code, input#renderer_evo_prism, input#renderer_b2evMark, input#renderer_evo_mermaid").each(function(){jQuery(this).hasClass("checked")&&jQuery(this).attr("checked","checked").removeClass("checked"),jQuery(this).removeAttr("disabled")}),e&&t.attr("data-required")&&(t.removeAttr("data-required"),t.attr("required",!0))):(window.tinymce.execCommand("mceAddEditor",!1,e),jQuery.get(r.save_editor_state_url),jQuery("#tinymce_plugin_toggle_button_wysiwyg").addClass("active"),jQuery("#tinymce_plugin_toggle_button_html").removeAttr("disabled"),jQuery('[name="editor_code"]').attr("value",r.plugin_code),jQuery(".quicktags_toolbar, .evo_code_toolbar, .evo_prism_toolbar, .b2evMark_toolbar, .evo_mermaid_toolbar").hide(),jQuery("#block_renderer_evo_code, #block_renderer_evo_prism, #block_renderer_b2evMark, #block_renderer_evo_mermaid").addClass("disabled"),jQuery("input#renderer_evo_code, input#renderer_evo_prism, input#renderer_b2evMark, input#renderer_evo_mermaid").each(function(){jQuery(this).is(":checked")&&jQuery(this).addClass("checked"),jQuery(this).attr("disabled","disabled").removeAttr("checked")}),e&&t.prop("required")&&(t.attr("data-required",!0),t.removeAttr("required")))},jQuery(document).on("wysiwyg_warning_changed",function(e,t){window.displayWarning=t}),jQuery("[id^=tinymce_plugin_toggle_button_]").click(function(){"WYSIWYG"==jQuery(this).val()&&window.displayWarning?(evo_js_lang_close=r.cancel_btn_label,openModalWindow("<p>"+r.toggle_warning_msg+'</p><form><input type="checkbox" name="hideWarning" value="1"> '+r.wysiwyg_checkbox_label+'<input type="submit" name="submit" onclick="return confirm_switch();"></form>',"500px","",!0,'<span class="text-danger">'+r.warning_text+"</span>",[r.ok_btn_label,"btn-primary"],!0)):window.tinymce_plugin_toggleEditor(r.content_id)})),"undefined"!=typeof evo_plugin_tinymce_config__init&&(_=evo_plugin_tinymce_config__init,window.autocomplete_static_options=[],jQuery(".user.login").each(function(){var e=jQuery(this).text();""!=e&&-1==window.autocomplete_static_options.indexOf(e)&&("@"==e[0]&&(e=e.substr(1)),window.autocomplete_static_options.push(e))}),window.autocomplete_static_options=window.autocomplete_static_options.join(),window.tmce_init=_.tmce_init,window.tinymce_plugin_displayed_error=!1,window.tinymce_plugin_init_done=!1,window.tinymce_plugin_init_tinymce=function(t){void 0===window.tinymce?window.tinymce_plugin_displayed_error||(alert(_.display_error_msg),window.tinymce_plugin_displayed_error=!0):(void 0!==window.tmce_init.oninit&&(t=function(){window.tmce_init.oninit(),t()}),window.tmce_init.oninit=function(){t(),window.tinymce.get(_.content_id)&&"object"==typeof b2evo_Callbacks&&(b2evo_Callbacks.register_callback("get_selected_text_for_"+_.content_id,function(e){var t=window.tinymce.get(_.content_id);return t?t.selection.getContent():null},!0),b2evo_Callbacks.register_callback("wrap_selection_for_"+_.content_id,function(e){var t=window.tinymce.get(_.content_id);if(!t)return null;var o=t.selection.getContent();if(e.replace)var n=e.before+e.after;else n=e.before+o+e.after;return t.selection.setContent(n),!0},!0),b2evo_Callbacks.register_callback("str_replace_for_"+_.content_id,function(e){var t=window.tinymce.get(_.content_id);return t?(t.setContent(t.getContent().replace(e.search,e.replace)),!0):null},!0),b2evo_Callbacks.register_callback("insert_raw_into_"+_.content_id,function(e){return window.tinymce.execInstanceCommand(_.content_id,"mceInsertRawHTML",!1,e),!0},!0));var e=jQuery("#"+_.content_id);e.prop("required")&&(e.attr("data-required",!0),e.removeAttr("required"))},window.tmce_init.init_instance_callback=function(e){if(window.shortcut_keys)for(var t=0;t<window.shortcut_keys.length;t++){var o=window.shortcut_keys[t];e.shortcuts.add(o,"b2evo shortcut key: "+o,function(){window.shortcut_handler(o)})}},tmce_init.init_instance_callback=function(e){if(window.shortcut_keys)for(var t=0;t<window.shortcut_keys.length;t++){var o=window.shortcut_keys[t];e.shortcuts.add(o,"b2evo shortcut key: "+o,function(){window.shortcut_handler(o)})}},window.tmce_init.setup=function(e){e.on("init",window.tmce_init.oninit)},window.tinymce.on("AddEditor",function(t){var e=jQuery("#"+_.content_id);return e.val().match(/<(p\s?|br\s?\/?)[^>]*>/i)||jQuery.ajax({type:"POST",url:_.update_content_url,data:{content:e.val()},success:function(e){t.editor.setContent(e)}}),!1}),window.tinymce.init(window.tmce_init))},_.use_tinymce&&window.tinymce_plugin_toggleEditor(_.content_id),jQuery('[name="editor_code"]').attr("value",_.editor_code))}),jQuery(document).ready(function(){if("undefined"!=typeof evo_init_shortlinks_toolbar_config){var n=evo_init_shortlinks_toolbar_config;if(window.shortlinks_toolbar=function(e,t){var o=n.toolbar_title_before+e+n.toolbar_title_after+n.toolbar_group_before+'<input type="button" title="'+n.button_title+'" class="'+n.button_class+'" data-func="shortlinks_load_window|'+t+'" value="'+n.button_value+'" />'+n.toolbar_group_after;jQuery("."+t+n.plugin_code+"_toolbar").html(o)},"undefined"!=typeof evo_init_shortlinks_toolbar)for(var e=Object.values(evo_init_shortlinks_toolbar),t=0;t<e.length;t++)window.shortlinks_toolbar(e[t].title,e[t].prefix)}}),jQuery(document).ready(function(){if("undefined"!=typeof evo_init_polls_toolbar_config){var n=evo_init_polls_toolbar_config;if(window.polls_toolbar=function(e,t){var o=n.toolbar_title_before+e+n.toolbar_title_after+n.toolbar_group_before+'<input type="button" title="'+n.button_title+'" class="'+n.button_class+'" data-func="polls_load_window|'+t+'" value="'+n.button_value+'" />'+n.toolbar_group_after;jQuery("."+t+n.plugin_code+"_toolbar").html(o)},window.polls_load_window=function(e){return openModalWindow('<div id="poll_wrapper"></div>',"auto","",!0,n.modal_window_title,["Insert Poll"],!0),polls_load_polls(e),!1},window.polls_api_request=function(e,t,o){jQuery.ajax({url:restapi_url+e}).then(o,function(e){polls_api_print_error(t,e)})},window.polls_api_print_error=function(e,t){if("string"!=typeof t&&void 0===t.code&&(t=void 0===t.responseJSON?t.statusText:t.responseJSON),void 0===t.code)var o='<h4 class="text-danger">Unknown error: '+t+"</h4>";else{o='<h4 class="text-danger">'+t.message+"</h4>";n.debug&&(o+="<div><b>Code:</b> "+t.code+"</div><div><b>Status:</b> "+t.data.status+"</div>")}jQuery(e).html(o)},window.polls_load_polls=function(i){i=i||"",polls_api_request("polls","#poll_wrapper",function(e){var t='<div id="'+i+'polls_list">';for(var o in t+="<ul>",e.polls){var n=e.polls[o];t+='<li><a href="#" data-poll-id="'+n.pqst_ID+'" data-prefix="'+i+'">'+n.pqst_question_text+"</a></li>"}t+="</ul>",t+="</div>",jQuery("#poll_wrapper").html(t),jQuery(document).on("click","#"+i+"polls_list a[data-poll-id]",function(){"undefined"!=typeof tinyMCE&&void 0!==tinyMCE.activeEditor&&tinyMCE.activeEditor&&tinyMCE.execCommand("mceFocus",!1,tinyMCE.activeEditor.id);var e=jQuery(this).data("prefix")?jQuery(this).data("prefix"):"";return textarea_wrap_selection(window[e+"b2evoCanvas"],"[poll:"+jQuery(this).data("pollId")+"]","",0),closeModalWindow(),!1})})},"undefined"!=typeof evo_init_polls_toolbar)for(var e=Object.values(evo_init_polls_toolbar),t=0;t<e.length;t++)window.polls_toolbar(e[t].title,e[t].prefix)}});