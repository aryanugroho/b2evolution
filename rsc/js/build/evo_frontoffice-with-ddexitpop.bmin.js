/* This includes 11 files: src/evo_modal_window.js, src/evo_images.js, src/evo_user_crop.js, src/evo_user_report.js, src/evo_user_contact_groups.js, src/evo_rest_api.js, src/evo_item_flag.js, src/evo_links.js, src/evo_forms.js, ajax.js, src/ddexitpop.js */

function evo_prevent_key_enter(e){jQuery(e).keypress(function(e){if(13==e.keyCode)return!1})}function evo_render_star_rating(){jQuery("#comment_rating").each(function(e){var t=jQuery("span.raty_params",this);t&&jQuery(this).html("").raty(t)})}function openModalWindow(e,t,o,n,i,r){var a="overlay_page_active";void 0!==n&&1==n&&(a="overlay_page_active_transparent"),void 0===t&&(t="560px");var s="";void 0!==o&&(0<o||""!=o)&&(s=' style="height:'+o+'"'),0<jQuery("#overlay_page").length?jQuery("#overlay_page").html(e):(jQuery("body").append('<div id="screen_mask"></div><div id="overlay_wrap" style="width:'+t+'"><div id="overlay_layout"><div id="overlay_page"'+s+"></div></div></div>"),jQuery("#screen_mask").fadeTo(1,.5).fadeIn(200),jQuery("#overlay_page").html(e).addClass(a),jQuery(document).on("click","#close_button, #screen_mask, #overlay_page",function(e){if("overlay_page"!=jQuery(this).attr("id"))return closeModalWindow(),!1;var t=jQuery("#overlay_page form");if(t.length){var o=t.position().top+jQuery("#overlay_wrap").position().top,n=o+t.height();e.clientY>o&&e.clientY<n||closeModalWindow()}return!0}))}function closeModalWindow(e){return void 0===e&&(e=window.document),jQuery("#overlay_page",e).hide(),jQuery(".action_messages",e).remove(),jQuery("#server_messages",e).insertBefore(".first_payload_block"),jQuery("#overlay_wrap",e).remove(),jQuery("#screen_mask",e).remove(),!1}function user_crop_avatar(e,t,o){void 0===o&&(o="avatar");var n=750,i=jQuery(window).width(),r=jQuery(window).height(),a=r/i,s=10,_=10;s=320<(i=n<i?n:i<320?320:i)-2*s?10:0,_=320<(r=n<r?n:r<320?320:r)-2*_?10:0;var l=n<i?n:i,d=n<r?n:r;openModalWindow('<span id="spinner" class="loader_img loader_user_report absolute_center" title="'+evo_js_lang_loading+'"></span>',l+"px",d+"px",!0,evo_js_lang_crop_profile_pic,[evo_js_lang_crop,"btn-primary"],!0);var u=jQuery("div.modal-dialog div.modal-body").length?jQuery("div.modal-dialog div.modal-body"):jQuery("#overlay_page"),c=parseInt(u.css("paddingTop")),p=parseInt(u.css("paddingRight")),f=parseInt(u.css("paddingBottom")),y=parseInt(u.css("paddingLeft")),h=(jQuery("div.modal-dialog div.modal-body").length?parseInt(u.css("min-height")):d-100)-(c+f),v={user_ID:e,file_ID:t,aspect_ratio:a,content_width:l-(y+p),content_height:h,display_mode:"js",crumb_user:evo_js_crumb_user};return evo_js_is_backoffice?(v.ctrl="user",v.user_tab="crop",v.user_tab_from=o):(v.blog=evo_js_blog,v.disp="avatar",v.action="crop"),jQuery.ajax({type:"POST",url:evo_js_user_crop_ajax_url,data:v,success:function(e){openModalWindow(e,l+"px",d+"px",!0,evo_js_lang_crop_profile_pic,[evo_js_lang_crop,"btn-primary"])}}),!1}function user_report(e,t){openModalWindow('<span class="loader_img loader_user_report absolute_center" title="'+evo_js_lang_loading+'"></span>',"auto","",!0,evo_js_lang_report_user,[evo_js_lang_report_this_user_now,"btn-danger"],!0);var o={action:"get_user_report_form",user_ID:e,crumb_user:evo_js_crumb_user};return evo_js_is_backoffice?(o.is_backoffice=1,o.user_tab=t):o.blog=evo_js_blog,jQuery.ajax({type:"POST",url:evo_js_user_report_ajax_url,data:o,success:function(e){openModalWindow(e,"auto","",!0,evo_js_lang_report_user,[evo_js_lang_report_this_user_now,"btn-danger"])}}),!1}function user_contact_groups(e){return openModalWindow('<span class="loader_img loader_user_report absolute_center" title="'+evo_js_lang_loading+'"></span>',"auto","",!0,evo_js_lang_contact_groups,evo_js_lang_save,!0),jQuery.ajax({type:"POST",url:evo_js_user_contact_groups_ajax_url,data:{action:"get_user_contact_form",blog:evo_js_blog,user_ID:e,crumb_user:evo_js_crumb_user},success:function(e){openModalWindow(e,"auto","",!0,evo_js_lang_contact_groups,evo_js_lang_save)}}),!1}function evo_rest_api_request(url,params_func,func_method,method){var params=params_func,func=func_method;"function"==typeof params_func&&(func=params_func,params={},method=func_method),void 0===method&&(method="GET"),jQuery.ajax({contentType:"application/json; charset=utf-8",type:method,url:restapi_url+url,data:params}).then(function(data,textStatus,jqXHR){"object"==typeof jqXHR.responseJSON&&eval(func)(data,textStatus,jqXHR)})}function evo_rest_api_print_error(e,t,o){if("string"!=typeof t&&void 0===t.code&&(t=void 0===t.responseJSON?t.statusText:t.responseJSON),void 0===t.code)var n='<h4 class="text-danger">Unknown error: '+t+"</h4>";else n='<h4 class="text-danger">'+t.message+"</h4>",o&&(n+="<div><b>Code:</b> "+t.code+"</div><div><b>Status:</b> "+t.data.status+"</div>");evo_rest_api_end_loading(e,n)}function evo_rest_api_start_loading(e){jQuery(e).addClass("evo_rest_api_loading").append('<div class="evo_rest_api_loader">loading...</div>')}function evo_rest_api_end_loading(e,t){jQuery(e).removeClass("evo_rest_api_loading").html(t).find(".evo_rest_api_loader").remove()}function evo_link_initialize_fieldset(o){if(0<jQuery("#"+o+"attachments_fieldset_table").length){var e=jQuery("#"+o+"attachments_fieldset_table").height();e=320<e?320:e<97?97:e,jQuery("#"+o+"attachments_fieldset_wrapper").height(e),jQuery("#"+o+"attachments_fieldset_wrapper").resizable({minHeight:80,handles:"s",resize:function(e,t){jQuery("#"+o+"attachments_fieldset_wrapper").resizable("option","maxHeight",jQuery("#"+o+"attachments_fieldset_table").height()),evo_link_update_overlay(o)}}),jQuery(document).on("click","#"+o+"attachments_fieldset_wrapper .ui-resizable-handle",function(){var e=jQuery("#"+o+"attachments_fieldset_table").height(),t=jQuery("#"+o+"attachments_fieldset_wrapper").height()+80;jQuery("#"+o+"attachments_fieldset_wrapper").css("height",e<t?e:t),evo_link_update_overlay(o)})}}function evo_link_update_overlay(e){jQuery("#"+e+"attachments_fieldset_overlay").length&&jQuery("#"+e+"attachments_fieldset_overlay").css("height",jQuery("#"+e+"attachments_fieldset_wrapper").closest(".panel").height())}function evo_link_fix_wrapper_height(e){var t=void 0===e?"":e,o=jQuery("#"+t+"attachments_fieldset_table").height();jQuery("#"+t+"attachments_fieldset_wrapper").height()!=o&&jQuery("#"+t+"attachments_fieldset_wrapper").height(jQuery("#"+t+"attachments_fieldset_table").height())}function evo_link_change_position(o,e,t){var n=o,i=o.value,r=o.id.substr(17);return jQuery.get(e+"anon_async.php?action=set_object_link_position&link_ID="+r+"&link_position="+i+"&crumb_link="+t,{},function(e,t){"OK"==(e=ajax_debug_clear(e))?(evoFadeSuccess(jQuery(n).closest("tr")),jQuery(n).closest("td").removeClass("error"),"cover"==i&&jQuery("select[name=link_position][id!="+o.id+"] option[value=cover]:selected").each(function(){jQuery(this).parent().val("aftermore"),evoFadeSuccess(jQuery(this).closest("tr"))})):(jQuery(n).val(e),evoFadeFailure(jQuery(n).closest("tr")),jQuery(n.form).closest("td").addClass("error"))}),!1}function evo_link_insert_inline(e,t,o,n,i,r){if(null==n&&(n=0),void 0!==r){var a="["+e+":"+t;o.length&&(a+=":"+o),a+="]",void 0!==i&&!1!==i&&(a+=i+"[/"+e+"]");var s=jQuery("#display_position_"+t);0!=s.length&&"inline"!=s.val()?(deferInlineReminder=!0,evo_rest_api_request("links/"+t+"/position/inline",function(e){s.val("inline"),evoFadeSuccess(s.closest("tr")),s.closest("td").removeClass("error"),textarea_wrap_selection(r,a,"",n,window.document)},"POST"),deferInlineReminder=!1):textarea_wrap_selection(r,a,"",n,window.document)}}function evo_link_delete(n,i,r,e){return evo_rest_api_request("links/"+r,{action:e},function(e){if("item"==i||"comment"==i||"emailcampaign"==i||"message"==i){var t=window.b2evoCanvas;if(null!=t){var o=new RegExp("\\[(image|file|inline|video|audio|thumbnail):"+r+":?[^\\]]*\\]","ig");textarea_str_replace(t,o,"",window.document)}}jQuery(n).closest("tr").remove(),evo_link_fix_wrapper_height()},"DELETE"),!1}function evo_link_change_order(_,e,l){return evo_rest_api_request("links/"+e+"/"+l,function(e){var t=jQuery(_).closest("tr"),o=t.find("span[data-order]");if("move_up"==l){var n=o.attr("data-order"),i=jQuery(t.prev()).find("span[data-order]"),r=i.attr("data-order");t.prev().before(t),o.attr("data-order",r),i.attr("data-order",n)}else{n=o.attr("data-order");var a=jQuery(t.next()).find("span[data-order]"),s=a.attr("data-order");t.next().after(t),o.attr("data-order",s),a.attr("data-order",n)}evoFadeSuccess(t)},"POST"),!1}function evo_link_attach(e,t,o,n,i){return evo_rest_api_request("links",{action:"attach",type:e,object_ID:t,root:o,path:n},function(e){void 0===i&&(i="");var t=jQuery("#"+i+"attachments_fieldset_table .results table",window.parent.document),o=jQuery(e.list_content);t.replaceWith(jQuery("table",o)).promise().done(function(e){setTimeout(function(){window.parent.evo_link_fix_wrapper_height()},10)})}),!1}function evo_link_ajax_loading_overlay(){var e=jQuery("#attachments_fieldset_table"),t=!1;return 0==e.find(".results_ajax_loading").length&&(t=jQuery('<div class="results_ajax_loading"><div>&nbsp;</div></div>'),e.css("position","relative"),t.css({width:e.width(),height:e.height()}),e.append(t)),t}function evo_link_refresh_list(e,t,o){var n=evo_link_ajax_loading_overlay();return n&&evo_rest_api_request("links",{action:void 0===o?"refresh":"sort",type:e.toLowerCase(),object_ID:t},function(e){jQuery("#attachments_fieldset_table").html(e.html),n.remove(),evo_link_fix_wrapper_height()}),!1}function evo_link_sort_list(o){var n,i=jQuery("#"+o+"attachments_fieldset_table tbody.filelist_tbody tr");i.sort(function(e,t){var o=parseInt(jQuery("span[data-order]",e).attr("data-order")),n=parseInt(jQuery("span[data-order]",t).attr("data-order"));return(o=o||i.length)<(n=n||i.length)?-1:n<o?1:0}),$.each(i,function(e,t){0===e?jQuery(t).prependTo("#"+o+"attachments_fieldset_table tbody.filelist_tbody"):jQuery(t).insertAfter(n),n=t})}function ajax_debug_clear(e){return e=(e=e.replace(/<!-- Ajax response end -->/,"")).replace(/(<div class="jslog">[\s\S]*)/i,""),jQuery.trim(e)}function ajax_response_is_correct(e){return!!e.match(/<!-- Ajax response end -->/)&&""!=ajax_debug_clear(e)}jQuery(document).ready(function(){if("undefined"!=typeof evo_init_datepicker&&jQuery(evo_init_datepicker.selector).datepicker(evo_init_datepicker.config),"undefined"!=typeof evo_link_position_config&&(window.displayInlineReminder=evo_link_position_config.display_inline_reminder,window.deferInlineReminder=evo_link_position_config.defer_inline_reminder,jQuery(document).on("change",evo_link_position_config.selector,{url:evo_link_position_config.url,crumb:evo_link_position_config.crumb},function(e){"inline"==this.value&&window.displayInlineReminder&&!window.deferInlineReminder&&(alert(evo_link_position_config.alert_msg),window.displayInlineReminder=!1),evo_link_change_position(this,e.data.url,e.data.crumb)})),"undefined"!=typeof evo_itemform_renderers__click&&jQuery("#itemform_renderers .dropdown-menu").on("click",function(e){e.stopPropagation()}),"undefined"!=typeof evo_commentform_renderers__click&&jQuery("#commentform_renderers .dropdown-menu").on("click",function(e){e.stopPropagation()}),"undefined"!=typeof evo_disp_download_delay_config&&(window.b2evo_download_timer=evo_disp_download_delay_config,window.downloadInterval=setInterval(function(){jQuery("#download_timer").html(window.b2evo_download_timer),0==window.b2evo_download_timer&&(clearInterval(window.downloadInterval),jQuery("#download_help_url").show()),window.b2evo_download_timer--},1e3),jQuery("#download_timer_js").show()),"undefined"!=typeof evo_skin_bootstrap_forum__quote_button_click&&jQuery(".quote_button").click(function(){var e=jQuery("form[id^=evo_comment_form_id_]");return 0==e.length||(e.attr("action",jQuery(this).attr("href")),e.submit(),!1)}),"undefined"!=typeof evo_ajax_form_config)for(var e=Object.values(evo_ajax_form_config),i=0;i<e.length;i++){var r=e[i];window["ajax_form_offset_"+r.form_number]=jQuery("#ajax_form_number_"+r.form_number).offset().top,window["request_sent_"+r.form_number]=!1,window["ajax_form_loading_number_"+r.form_number]=0;var a="get_form"+r.form_number;window[a]=function(){var n="#ajax_form_number_"+r.form_number;window["ajax_form_loading_number_"+r.form_number]++,jQuery.ajax({url:htsrv_url+"anon_async.php",type:"POST",data:r.json_params,success:function(e){jQuery(n).html(ajax_debug_clear(e)),"get_comment_form"==r.json_params.action&&evo_render_star_rating()},error:function(e,t,o){jQuery(".loader_ajax_form",n).after('<div class="red center">'+o+": "+e.responseText+"</div>"),window["ajax_form_loading_number_"+r.form_number]<3&&setTimeout(function(){jQuery(".loader_ajax_form",n).next().remove(),window[a]()},1e3)}})};var t="check_and_show_"+r.form_number;window[t]=function(e){if(!window["request_sent_"+r.form_number]){var t=null!=typeof e&&e;(t=t||jQuery(window).scrollTop()>=window["ajax_form_offset_"+r.form_number]-jQuery(window).height()-20)&&(window["request_sent_"+r.form_number]=!0,window[a]())}},jQuery(window).scroll(function(){window[t]()}),jQuery(window).resize(function(){window[t]()}),window[t](r.load_ajax_form_on_page_load)}var o;if("undefined"!=typeof evo_thread_form_config&&(window.check_multiple_recipients=function(){1<jQuery('input[name="thrd_recipients_array[login][]"]').length?jQuery("#multiple_recipients").show():jQuery("#multiple_recipients").hide()},window.check_form_thread=function(){return""==jQuery("input#token-input-thrd_recipients").val()||(alert(evo_thread_form_config.missing_username_msg),jQuery("input#token-input-thrd_recipients").focus(),!1)},evo_thread_form_config.token_input_config.tokenFormatter=function(e){return"<li>"+e[evo_thread_form_config.username_display]+'<input type="hidden" name="thrd_recipients_array[id][]" value="'+e.id+'" /><input type="hidden" name="thrd_recipients_array[login][]" value="'+e.login+'" /></li>'},evo_thread_form_config.token_input_config.resultsFormatter=function(e){var t=e.login;return null!=e.fullname&&void 0!==e.fullname&&(t+="<br />"+e.fullname),"<li>"+e.avatar+"<div>"+t+"</div><span></span></li>"},evo_thread_form_config.token_input_config.onAdd=function(){window.check_multiple_recipients()},evo_thread_form_config.token_input_config.onDelete=function(){window.check_multiple_recipients()},evo_thread_form_config.token_input_config.onReady=function(){evo_thread_form_config.thrd_recipients_has_error&&jQuery(".token-input-list-facebook").addClass("token-input-list-error"),jQuery("#thrd_recipients").removeAttr("required")},jQuery("#thrd_recipients").tokenInput(restapi_url+"users/recipients",evo_thread_form_config.token_input_config),window.check_multiple_recipients()),"undefined"!=typeof evo_user_func__callback_filter_userlist&&(jQuery("#country").change(function(){jQuery(this),jQuery.ajax({type:"POST",url:htsrv_url+"anon_async.php",data:"action=get_regions_option_list&ctry_id="+jQuery(this).val(),success:function(e){jQuery("#region").html(ajax_debug_clear(e)),1<jQuery("#region option").length?jQuery("#region_filter").show():jQuery("#region_filter").hide(),load_subregions(0)}})}),jQuery("#region").change(function(){load_subregions(jQuery(this).val())}),jQuery("#subregion").change(function(){load_cities(jQuery("#country").val(),jQuery("#region").val(),jQuery(this).val())}),window.load_subregions=function(t){jQuery.ajax({type:"POST",url:htsrv_url+"anon_async.php",data:"action=get_subregions_option_list&rgn_id="+t,success:function(e){jQuery("#subregion").html(ajax_debug_clear(e)),1<jQuery("#subregion option").length?jQuery("#subregion_filter").show():jQuery("#subregion_filter").hide(),load_cities(jQuery("#country").val(),t,0)}})},window.load_cities=function(e,t,o){void 0===e&&(e=0),jQuery.ajax({type:"POST",url:htsrv_url+"anon_async.php",data:"action=get_cities_option_list&ctry_id="+e+"&rgn_id="+t+"&subrg_id="+o,success:function(e){jQuery("#city").html(ajax_debug_clear(e)),1<jQuery("#city option").length?jQuery("#city_filter").show():jQuery("#city_filter").hide()}})}),"undefined"!=typeof coll_activity_stats_widget_config&&(window.resize_coll_activity_stat_widget=function(){var e=[],t=[],o=[],n=coll_activity_stats_widget_config.time_period;if(null==plot){plot=jQuery("#canvasbarschart").data("plot"),o=plot.axes.xaxis.ticks.slice(0);for(var i=0;i<plot.series.length;i++)e.push(plot.series[i].data.slice(0));if(7==e[0].length)t=e;else for(i=0;i<e.length;i++){for(var r=[],a=7,s=1;0<a;a--,s++)r.unshift([a,e[i][e[i].length-s][1]]);t.push(r)}}if(jQuery("#canvasbarschart").width()<650){if("last_week"!=n){for(i=0;i<plot.series.length;i++)plot.series[i].data=t[i];plot.axes.xaxis.ticks=o.slice(-7),n="last_week"}}else if("last_month"!=n){for(i=0;i<plot.series.length;i++)plot.series[i].data=e[i];plot.axes.xaxis.ticks=o,n="last_month"}plot.replot({resetAxes:!0})},jQuery(window).resize(function(){clearTimeout(o),o=setTimeout(resize_coll_activity_stat_widget,100)})),"undefined"!=typeof evo_link_sortable_js_config){var s=Object.values(evo_link_sortable_js_config);for(i=0;i<s.length;i++)jQuery("#"+s[i].fieldset_prefix+"attachments_fieldset_table table").sortable({containerSelector:"table",itemPath:"> tbody",itemSelector:"tr",placeholder:jQuery.parseHTML('<tr class="placeholder"><td colspan="5"></td></tr>'),onMousedown:function(e,t,o){if(!o.target.nodeName.match(/^(a|img|select|span)$/i))return o.preventDefault(),!0},onDrop:function(t,e,o){jQuery("#"+s[i].fieldset_prefix+"attachments_fieldset_table table tr").removeClass("odd even"),jQuery("#"+s[i].fieldset_prefix+"attachments_fieldset_table table tr:odd").addClass("even"),jQuery("#"+s[i].fieldset_prefix+"attachments_fieldset_table table tr:even").addClass("odd");var n="";jQuery("#"+s[i].fieldset_prefix+"attachments_fieldset_table table tr").each(function(){var e=jQuery(this).find(".link_id_cell > span[data-order]");0<e.length&&(n+=e.html()+",")}),n=n.slice(0,-1),jQuery.ajax({url:htsrv_url+"anon_async.php",type:"POST",data:{action:"update_links_order",links:n,crumb_link:s[i].crumb_link},success:function(e){link_data=JSON.parse(ajax_debug_clear(e)),jQuery("#"+s[i].fieldset_prefix+"attachments_fieldset_table table tr").each(function(){var e=jQuery(this).find(".link_id_cell > span[data-order]");0<e.length&&e.attr("data-order",link_data[e.html()])}),evoFadeSuccess(t)}}),t.removeClass(e.group.options.draggedClass).removeAttr("style")}})}}),jQuery(document).ready(function(){"undefined"!=typeof evo_skin_bootstrap_forums__post_list_header&&jQuery("#evo_workflow_status_filter").change(function(){var e=location.href.replace(/([\?&])((status|redir)=[^&]*(&|$))+/,"$1"),t=jQuery(this).val();""!==t&&(e+=(-1==e.indexOf("?")?"?":"&")+"status="+t+"&redir=no"),location.href=e.replace("?&","?").replace(/\?$/,"")})}),jQuery(document).ready(function(){"undefined"!=typeof evo_comment_rating_config&&evo_render_star_rating()}),jQuery(document).ready(function(){"undefined"!=typeof evo_widget_coll_search_form&&(jQuery(evo_widget_coll_search_form.selector).tokenInput(evo_widget_coll_search_form.url,evo_widget_coll_search_form.config),void 0!==evo_widget_coll_search_form.placeholder&&jQuery("#token-input-search_author").attr("placeholder",evo_widget_coll_search_form.placeholder).css("width","100%"))}),jQuery(document).ready(function(){"undefined"!=typeof evo_autocomplete_login_config&&(jQuery("input.autocomplete_login").on("added",function(){jQuery("input.autocomplete_login").each(function(){if(!jQuery(this).hasClass("tt-input")&&!jQuery(this).hasClass("tt-hint")){var t="";t=jQuery(this).hasClass("only_assignees")?restapi_url+evo_autocomplete_login_config.url:restapi_url+"users/logins",jQuery(this).data("status")&&(t+="&status="+jQuery(this).data("status")),jQuery(this).typeahead(null,{displayKey:"login",source:function(e,n){jQuery.ajax({type:"GET",dataType:"JSON",url:t,data:{q:e},success:function(e){var t=new Array;for(var o in e.list)t.push({login:e.list[o]});n(t)}})}})}})}),jQuery("input.autocomplete_login").trigger("added"),evo_prevent_key_enter(evo_autocomplete_login_config.selector))}),jQuery(document).ready(function(){"undefined"!=typeof evo_widget_poll_initialize&&(jQuery('.evo_poll__selector input[type="checkbox"]').on("click",function(){var e=jQuery(this).closest(".evo_poll__table"),t=jQuery(".evo_poll__selector input:checked",e).length>=e.data("max-answers");jQuery(".evo_poll__selector input[type=checkbox]:not(:checked)",e).prop("disabled",t)}),jQuery(".evo_poll__table").each(function(){var e=jQuery(this);e.width()>e.parent().width()&&(jQuery(".evo_poll__title",e).css("white-space","normal"),jQuery(".evo_poll__title label",e).css({width:Math.floor(e.parent().width()/2)+"px","word-wrap":"break-word"}))}))}),jQuery(document).ready(function(){if("undefined"!=typeof evo_plugin_auto_anchors_settings){jQuery("h1, h2, h3, h4, h5, h6").each(function(){if(jQuery(this).attr("id")&&jQuery(this).hasClass("evo_auto_anchor_header")){var e=location.href.replace(/#.+$/,"")+"#"+jQuery(this).attr("id");jQuery(this).append(' <a href="'+e+'" class="evo_auto_anchor_link"><span class="fa fa-link"></span></a>')}});var t=jQuery("#evo_toolbar").length?jQuery("#evo_toolbar").height():0;jQuery(".evo_auto_anchor_link").on("click",function(){var e=jQuery(this).attr("href");return jQuery("html,body").animate({scrollTop:jQuery(this).offset().top-t-evo_plugin_auto_anchors_settings.offset_scroll},function(){window.history.pushState("","",e)}),!1})}}),jQuery(document).ready(function(){if("undefined"!=typeof evo_plugin_table_contents_settings){var o=jQuery("#evo_toolbar").length?jQuery("#evo_toolbar").height():0;jQuery(".evo_plugin__table_of_contents a").on("click",function(){var e=jQuery("#"+jQuery(this).data("anchor"));if(0==e.length||!e.prop("tagName").match(/^h[1-6]$/i))return!0;var t=jQuery(this).attr("href");return jQuery("html,body").animate({scrollTop:e.offset().top-o-evo_plugin_table_contents_settings.offset_scroll},function(){window.history.pushState("","",t)}),!1})}}),jQuery(document).ready(function(){var n,o,i,r,a;"undefined"!=typeof evo_plugin_tinymce_config__toggle_switch_warning&&(n=evo_plugin_tinymce_config__toggle_switch_warning,window.toggle_switch_warning=function(t){var e=n.activate_link,o=n.deactivate_link;return jQuery.get(t?e:o,function(e){jQuery(document).trigger("wysiwyg_warning_changed",[t])}),!1}),"undefined"!=typeof evo_plugin_tinymce_config__quicksettings&&(o=evo_plugin_tinymce_config__quicksettings,i=jQuery("#"+o.item_id),jQuery(document).on("wysiwyg_warning_changed",function(e,t){i.html(t?o.deactivate_warning_link:o.activate_warning_link)})),"undefined"!=typeof evo_plugin_tinymce_config__toggle_editor&&(r=evo_plugin_tinymce_config__toggle_editor,window.displayWarning=r.display_warning,window.confirm_switch=function(){return jQuery("input[name=hideWarning]").is(":checked")&&window.toggle_switch_warning(!1),window.tinymce_plugin_toggleEditor(r.content_id),closeModalWindow(),!1},window.tinymce_plugin_toggleEditor=function(e){var t=jQuery("#"+r.content_id);if(jQuery("[id^=tinymce_plugin_toggle_button_]").removeClass("active").attr("disabled","disabled"),!window.tinymce_plugin_init_done)return window.tinymce_plugin_init_done=!0,void window.tinymce_plugin_init_tinymce(function(){window.tinymce_plugin_toggleEditor(null)});window.tinymce.get(e)?(window.tinymce.execCommand("mceRemoveEditor",!1,e),jQuery.get(r.save_editor_state_url),jQuery("#tinymce_plugin_toggle_button_html").addClass("active"),jQuery("#tinymce_plugin_toggle_button_wysiwyg").removeAttr("disabled"),jQuery('[name="editor_code"]').attr("value","html"),jQuery(".quicktags_toolbar, .evo_code_toolbar, .evo_prism_toolbar, .b2evMark_toolbar, .evo_mermaid_toolbar").show(),jQuery("#block_renderer_evo_code, #block_renderer_evo_prism, #block_renderer_b2evMark, #block_renderer_evo_mermaid").removeClass("disabled"),jQuery("input#renderer_evo_code, input#renderer_evo_prism, input#renderer_b2evMark, input#renderer_evo_mermaid").each(function(){jQuery(this).hasClass("checked")&&jQuery(this).attr("checked","checked").removeClass("checked"),jQuery(this).removeAttr("disabled")}),e&&t.attr("data-required")&&(t.removeAttr("data-required"),t.attr("required",!0))):(window.tinymce.execCommand("mceAddEditor",!1,e),jQuery.get(r.save_editor_state_url),jQuery("#tinymce_plugin_toggle_button_wysiwyg").addClass("active"),jQuery("#tinymce_plugin_toggle_button_html").removeAttr("disabled"),jQuery('[name="editor_code"]').attr("value",r.plugin_code),jQuery(".quicktags_toolbar, .evo_code_toolbar, .evo_prism_toolbar, .b2evMark_toolbar, .evo_mermaid_toolbar").hide(),jQuery("#block_renderer_evo_code, #block_renderer_evo_prism, #block_renderer_b2evMark, #block_renderer_evo_mermaid").addClass("disabled"),jQuery("input#renderer_evo_code, input#renderer_evo_prism, input#renderer_b2evMark, input#renderer_evo_mermaid").each(function(){jQuery(this).is(":checked")&&jQuery(this).addClass("checked"),jQuery(this).attr("disabled","disabled").removeAttr("checked")}),e&&t.prop("required")&&(t.attr("data-required",!0),t.removeAttr("required")))},jQuery(document).on("wysiwyg_warning_changed",function(e,t){window.displayWarning=t}),jQuery("[id^=tinymce_plugin_toggle_button_]").click(function(){"WYSIWYG"==jQuery(this).val()&&window.displayWarning?(evo_js_lang_close=r.cancel_btn_label,openModalWindow("<p>"+r.toggle_warning_msg+'</p><form><input type="checkbox" name="hideWarning" value="1"> '+r.wysiwyg_checkbox_label+'<input type="submit" name="submit" onclick="return confirm_switch();"></form>',"500px","",!0,'<span class="text-danger">'+r.warning_text+"</span>",[r.ok_btn_label,"btn-primary"],!0)):window.tinymce_plugin_toggleEditor(r.content_id)})),"undefined"!=typeof evo_plugin_tinymce_config__init&&(a=evo_plugin_tinymce_config__init,window.autocomplete_static_options=[],jQuery(".user.login").each(function(){var e=jQuery(this).text();""!=e&&-1==window.autocomplete_static_options.indexOf(e)&&("@"==e[0]&&(e=e.substr(1)),window.autocomplete_static_options.push(e))}),window.autocomplete_static_options=window.autocomplete_static_options.join(),window.tmce_init=a.tmce_init,window.tinymce_plugin_displayed_error=!1,window.tinymce_plugin_init_done=!1,window.tinymce_plugin_init_tinymce=function(t){void 0===window.tinymce?window.tinymce_plugin_displayed_error||(alert(a.display_error_msg),window.tinymce_plugin_displayed_error=!0):(void 0!==window.tmce_init.oninit&&(t=function(){window.tmce_init.oninit(),t()}),window.tmce_init.oninit=function(){t(),window.tinymce.get(a.content_id)&&"object"==typeof b2evo_Callbacks&&(b2evo_Callbacks.register_callback("get_selected_text_for_"+a.content_id,function(e){var t=window.tinymce.get(a.content_id);return t?t.selection.getContent():null},!0),b2evo_Callbacks.register_callback("wrap_selection_for_"+a.content_id,function(e){var t=window.tinymce.get(a.content_id);if(!t)return null;var o=t.selection.getContent();if(e.replace)var n=e.before+e.after;else n=e.before+o+e.after;return t.selection.setContent(n),!0},!0),b2evo_Callbacks.register_callback("str_replace_for_"+a.content_id,function(e){var t=window.tinymce.get(a.content_id);return t?(t.setContent(t.getContent().replace(e.search,e.replace)),!0):null},!0),b2evo_Callbacks.register_callback("insert_raw_into_"+a.content_id,function(e){return window.tinymce.execInstanceCommand(a.content_id,"mceInsertRawHTML",!1,e),!0},!0));var e=jQuery("#"+a.content_id);e.prop("required")&&(e.attr("data-required",!0),e.removeAttr("required"))},window.tmce_init.init_instance_callback=function(e){if(window.shortcut_keys)for(var t=0;t<window.shortcut_keys.length;t++){var o=window.shortcut_keys[t];e.shortcuts.add(o,"b2evo shortcut key: "+o,function(){window.shortcut_handler(o)})}},tmce_init.init_instance_callback=function(e){if(window.shortcut_keys)for(var t=0;t<window.shortcut_keys.length;t++){var o=window.shortcut_keys[t];e.shortcuts.add(o,"b2evo shortcut key: "+o,function(){window.shortcut_handler(o)})}},window.tmce_init.setup=function(e){e.on("init",window.tmce_init.oninit)},window.tinymce.on("AddEditor",function(t){var e=jQuery("#"+a.content_id);return e.val().match(/<(p\s?|br\s?\/?)[^>]*>/i)||jQuery.ajax({type:"POST",url:a.update_content_url,data:{content:e.val()},success:function(e){t.editor.setContent(e)}}),!1}),window.tinymce.init(window.tmce_init))},a.use_tinymce&&window.tinymce_plugin_toggleEditor(a.content_id),jQuery('[name="editor_code"]').attr("value",a.editor_code))}),jQuery(document).ready(function(){if("undefined"!=typeof evo_init_shortlinks_toolbar_config){var n=evo_init_shortlinks_toolbar_config;if(window.shortlinks_toolbar=function(e,t){var o=n.toolbar_title_before+e+n.toolbar_title_after+n.toolbar_group_before+'<input type="button" title="'+n.button_title+'" class="'+n.button_class+'" data-func="shortlinks_load_window|'+t+'" value="'+n.button_value+'" />'+n.toolbar_group_after;jQuery("."+t+n.plugin_code+"_toolbar").html(o)},"undefined"!=typeof evo_init_shortlinks_toolbar)for(var e=Object.values(evo_init_shortlinks_toolbar),t=0;t<e.length;t++)window.shortlinks_toolbar(e[t].title,e[t].prefix)}}),jQuery(document).ready(function(){if("undefined"!=typeof evo_init_polls_toolbar_config){var n=evo_init_polls_toolbar_config;if(window.polls_toolbar=function(e,t){var o=n.toolbar_title_before+e+n.toolbar_title_after+n.toolbar_group_before+'<input type="button" title="'+n.button_title+'" class="'+n.button_class+'" data-func="polls_load_window|'+t+'" value="'+n.button_value+'" />'+n.toolbar_group_after;jQuery("."+t+n.plugin_code+"_toolbar").html(o)},window.polls_load_window=function(e){return openModalWindow('<div id="poll_wrapper"></div>',"auto","",!0,n.modal_window_title,["Insert Poll"],!0),polls_load_polls(e),!1},window.polls_api_request=function(e,t,o){jQuery.ajax({url:restapi_url+e}).then(o,function(e){polls_api_print_error(t,e)})},window.polls_api_print_error=function(e,t){if("string"!=typeof t&&void 0===t.code&&(t=void 0===t.responseJSON?t.statusText:t.responseJSON),void 0===t.code)var o='<h4 class="text-danger">Unknown error: '+t+"</h4>";else o='<h4 class="text-danger">'+t.message+"</h4>",n.debug&&(o+="<div><b>Code:</b> "+t.code+"</div><div><b>Status:</b> "+t.data.status+"</div>");jQuery(e).html(o)},window.polls_load_polls=function(i){i=i||"",polls_api_request("polls","#poll_wrapper",function(e){var t='<div id="'+i+'polls_list">';for(var o in t+="<ul>",e.polls){var n=e.polls[o];t+='<li><a href="#" data-poll-id="'+n.pqst_ID+'" data-prefix="'+i+'">'+n.pqst_question_text+"</a></li>"}t+="</ul>",t+="</div>",jQuery("#poll_wrapper").html(t),jQuery(document).on("click","#"+i+"polls_list a[data-poll-id]",function(){"undefined"!=typeof tinyMCE&&void 0!==tinyMCE.activeEditor&&tinyMCE.activeEditor&&tinyMCE.execCommand("mceFocus",!1,tinyMCE.activeEditor.id);var e=jQuery(this).data("prefix")?jQuery(this).data("prefix"):"";return textarea_wrap_selection(window[e+"b2evoCanvas"],"[poll:"+jQuery(this).data("pollId")+"]","",0),closeModalWindow(),!1})})},"undefined"!=typeof evo_init_polls_toolbar)for(var e=Object.values(evo_init_polls_toolbar),t=0;t<e.length;t++)window.polls_toolbar(e[t].title,e[t].prefix)}}),jQuery(document).keyup(function(e){27==e.keyCode&&closeModalWindow()}),jQuery(document).ready(function(){jQuery("img.loadimg").each(function(){jQuery(this).prop("complete")?(jQuery(this).removeClass("loadimg"),""==jQuery(this).attr("class")&&jQuery(this).removeAttr("class")):jQuery(this).on("load",function(){jQuery(this).removeClass("loadimg"),""==jQuery(this).attr("class")&&jQuery(this).removeAttr("class")})})}),jQuery(document).on("click","a.evo_post_flag_btn",function(){var t=jQuery(this),e=parseInt(t.data("id"));return 0<e&&(t.data("status","inprogress"),jQuery("span",jQuery(this)).addClass("fa-x--hover"),evo_rest_api_request("collections/"+t.data("coll")+"/items/"+e+"/flag",function(e){e.flag?(t.find("span:first").show(),t.find("span:last").hide()):(t.find("span:last").show(),t.find("span:first").hide()),jQuery("span",t).removeClass("fa-x--hover"),setTimeout(function(){t.removeData("status")},500)},"PUT")),!1}),jQuery(document).on("mouseover","a.evo_post_flag_btn",function(){"inprogress"!=jQuery(this).data("status")&&jQuery("span",jQuery(this)).addClass("fa-x--hover")}),jQuery(document).on("keydown","textarea, input",function(e){!e.metaKey&&!e.ctrlKey||13!=e.keyCode&&10!=e.keyCode||jQuery(this).closest("form").submit()});var ddexitpop=function(n){var i={delayregister:0,delayshow:200,hideaftershow:!0,displayfreq:"always",persistcookie:"ddexitpop_shown",fxclass:"rubberBand",mobileshowafter:3e3,onddexitpop:function(){}},e=["bounce","flash","pulse","rubberBand","shake","swing","tada","wobble","jello","bounceIn","bounceInDown","bounceInLeft","bounceInRight","bounceInUp","fadeIn","fadeInDown","fadeInDownBig","fadeInLeft","fadeInLeftBig","fadeInRight","fadeInRightBig","fadeInUp","fadeInUpBig","flipInX","flipInY","lightSpeedIn","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","slideInUp","slideInDown","slideInLeft","slideInRight","zoomIn","zoomInDown","zoomInLeft","zoomInRight","zoomInUp","rollIn"],t="ontouchstart"in window||0<navigator.msMaxTouchPoints?"touchstart":"click";function r(e){var t=new RegExp(e+"=[^;]+","i");return document.cookie.match(t)?document.cookie.match(t)[0].split("=")[1]:null}function a(e,t,o){var n="",i=new Date;if(void 0!==o){var r=parseInt(o)*(/hr/i.test(o)?60:/day/i.test(o)?1440:1);i.setMinutes(i.getMinutes()+r),n="; expires="+i.toUTCString()}document.cookie=e+"="+t+"; path=/"+n}var s={wrappermarkup:'<div id="ddexitpopwrapper"><div class="veil"></div></div>',$wrapperref:null,$contentref:null,displaypopup:!0,delayshowtimer:null,settings:null,ajaxrequest:function(e){var t=function(e){if(/^http/i.test(e)){var t=document.createElement("a");return t.href=e,t.href.replace(RegExp(t.hostname,"i"),location.hostname)}return e}(e);n.ajax({url:t,dataType:"html",error:function(e){alert("Error fetching content.<br />Server Response: "+e.responseText)},success:function(e){s.$contentref=n(e).appendTo(document.body),s.setup(s.$contentref)}})},detectexit:function(e){e.clientY<60&&(this.delayshowtimer=setTimeout(function(){s.showpopup(),s.settings.onddexitpop(s.$contentref)},this.settings.delayshow))},detectenter:function(e){e.clientY<60&&clearTimeout(this.delayshowtimer)},showpopup:function(){null!=this.$contentref&&1==this.displaypopup&&(!0===this.settings.randomizefxclass&&(this.settings.fxclass=e[Math.floor(Math.random()*e.length)]),this.$wrapperref.addClass("open"),this.$contentref.addClass(this.settings.fxclass),this.displaypopup=!1,this.settings.hideaftershow&&n(document).off("mouseleave.registerexit"))},hidepopup:function(){this.$wrapperref.removeClass("open"),this.$contentref.removeClass(this.settings.fxclass),this.displaypopup=!0},setup:function(e){this.$contentref.addClass("animated"),this.$wrapperref=n(this.wrappermarkup).appendTo(document.body),this.$wrapperref.append(this.$contentref),this.$wrapperref.find(".veil").on(t,function(){s.hidepopup()}),"always"!=this.settings.displayfreq&&("session"==this.settings.displayfreq?a(this.settings.persistcookie,"yes"):/\d+(hr|day)/i.test(this.settings.displayfreq)&&(a(this.settings.persistcookie,"yes",this.settings.displayfreq),a(this.settings.persistcookie+"_duration",this.settings.displayfreq,this.settings.displayfreq)))},init:function(e){var t=n.extend({},i,e),o=r(t.persistcookie+"_duration");!o||"session"!=t.displayfreq&&t.displayfreq==o||(a(t.persistcookie,"yes",-1),a(t.persistcookie+"_duration","",-1)),"always"!=t.displayfreq&&r(t.persistcookie)||("random"==t.fxclass&&(t.randomizefxclass=!0),"ajax"==(this.settings=t).contentsource[0]?this.ajaxrequest(t.contentsource[1]):"id"==t.contentsource[0]?(this.$contentref=n("#"+t.contentsource[1]).appendTo(document.body),this.setup(this.$contentref)):"inline"==t.contentsource[0]&&(this.$contentref=n(t.contentsource[1]).appendTo(document.body),this.setup(this.$contentref)),setTimeout(function(){n(document).on("mouseleave.registerexit",function(e){s.detectexit(e)}),n(document).on("mouseenter.registerenter",function(e){s.detectenter(e)})},t.delayregister),0<t.mobileshowafter&&n(document).one("touchstart",function(){setTimeout(function(){s.showpopup()},t.mobileshowafter)}))}};return s}(jQuery);