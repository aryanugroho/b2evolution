var evo=evo||{};evo.shortcode={types:{image:{regexp:/(<span.*?data-evo-tag.*?>)?(\[(image):(\d+):?([^\[\]]*)\])(<\/span>)?/g},thumbnail:{regexp:/(<span.*?data-evo-tag.*?>)?(\[(thumbnail):(\d+):?([^\[\]]*)\])(<\/span>)?/g},inline:{regexp:/(<span.*?data-evo-tag.*?>)?(\[(inline):(\d+):?([^\[\]]*)\])(<\/span>)?/g},button:{regexp:/(<span.*?data-evo-tag.*?>)?(\[(button):image#(\d+)([^\[\]]*)\][^\[]*\[\/button\])(<\/span>)?/g},cta:{regexp:/(<span.*?data-evo-tag.*?>)?(\[(cta):?\d*:image#(\d+)([^\[\]]*)\][^\[]*\[\/cta\])(<\/span>)?/g},like:{regexp:/(<span.*?data-evo-tag.*?>)?(\[(like):image#(\d+)([^\[\]]*)\][^\[]*\[\/like\])(<\/span>)?/g},dislike:{regexp:/(<span.*?data-evo-tag.*?>)?(\[(dislike):image#(\d+)([^\[\]]*)\][^\[]*\[\/dislike\])(<\/span>)?/g},activate:{regexp:/(<span.*?data-evo-tag.*?>)?(\[(activate):image#(\d+)([^\[\]]*)\][^\[]*\[\/activate\])(<\/span>)?/g},unsubscribe:{regexp:/(<span.*?data-evo-tag.*?>)?(\[(unsubscribe):image#(\d+)([^\[\]]*)\][^\[]*\[\/unsubscribe\])(<\/span>)?/g}},next:function(e,t,n){var i,o=evo.shortcode.regexp(e);if(o.lastIndex=n||0,i=o.exec(t))return{index:i.index,content:i[0],shortcode:evo.shortcode.fromMatch(i)}},regexp:function(e){return evo.shortcode.types[e].regexp},fromMatch:function(e){return new evo.shortcode({type:e[3],link_ID:e[4],content:e[5]})}},evo.shortcode=$.extend(function(e){this.type=e.type,this.link_ID=e.link_ID,this.content=e.content},evo.shortcode),function(t,n,i,w){"use strict";var v={},r={};n.views={register:function(e,t){v[e]=n.View.extend(w.extend(t,{type:e}))},unregister:function(e){delete v[e]},get:function(e){return v[e]},unbind:function(){w.each(r,function(e,t){t.unbind()})},setMarkers:function(e){var r,t,d=[{content:e}],c=this;w.each(v,function(a,s){t=d.slice(),d=[],w.each(t,function(e,t){var n,i,o=t.content;if(t.processed)d.push(t);else{for(;o&&(n=s.prototype.match(o));)n.index&&d.push({content:o.substring(0,n.index)}),i=(r=c.createInstance(a,n.content,n.options)).loader?".":r.text,d.push({content:r.ignore?i:'<span data-evo-view-marker="'+r.encodedText+'">'+i+"</span>",processed:!0}),o=o.slice(n.index+n.content.length);o&&d.push({content:o})}})});var n=[];return w.each(d,function(e,t){return n.push(t.content)}),e=n.join("")},createInstance:function(e,t,n,i){var o,a,s=this.get(e);return t=tinymce.DOM.decode(t),!i&&(a=this.getInstance(t))?a:(o=encodeURIComponent(t),n=w.extend(n||{},{text:t,encodedText:o,renderedHTML:null}),r[t]=new s(n))},getInstance:function(e){return"string"==typeof e?r[e]:r[t.decodeURIComponent(w(e).attr("data-evo-view-text"))]},getText:function(e){return decodeURIComponent(w(e).attr("data-evo-view-text")||"")},render:function(n){w.each(r,function(e,t){t.render(null,n)})},update:function(e,t,n,i){var o=this.getInstance(n);o&&o.update(e,t,n,i)},edit:function(n,i){var o=this.getInstance(i);o&&o.edit&&o.edit(o.text,function(e,t){o.update(e,n,i,t)})},remove:function(e,t){var n=this.getInstance(t);n&&n.remove(e,t)}},n.View=function(e){w.extend(this,e),this.initialize()},n.View.extend=function(e){function t(e){n.View.call(this,e)}for(name in(t.prototype=Object.create(n.View.prototype)).constructor=t,e)t.prototype[name]=e[name];return t},w.extend(n.View.prototype,{content:null,loader:!0,initialize:function(){},getContent:function(e){return this.content},render:function(e,t){var i=this;null!=e&&(this.content=e),e=this.getContent(),(this.loader||e)&&(t&&this.unbind(),this.replaceMarkers(),e&&this.setContent(e,function(e,t,n){w(t).data("rendered",!0),i.bindNode.call(i,e,t,n)},!!t&&null))},bindNode:function(){},unbindNode:function(){},unbind:function(){var i=this;this.getNodes(function(e,t,n){i.unbindNode.call(i,e,t,n),w(t).trigger("evo-view-unbind")},!0)},getEditors:function(n){w.each(tinymce.editors,function(e,t){t.plugins.evo_view&&n.call(this,t)},this)},getNodes:function(t,n){var i=this;this.getEditors(function(e){w(e.getBody()).find('[data-evo-view-text="'+i.encodedText+'"]').filter(function(){var e;return null==n||(e=!0===w(this).data("rendered"),n?e:!e)}).each(function(){t.call(i,e,this,w(this).find(".evo-view-content").get(0))})})},getMarkers:function(n){var i=this.encodedText;this.getEditors(function(e){var t=this;w(e.getBody()).find('[data-evo-view-marker="'+i+'"]').each(function(){n.call(t,e,this)})})},markerText:'<div class="evo-view-wrap" data-evo-view-text="%encodedText%" data-evo-view-type="%viewType%"><div class="evo-view-selection-before"></div><div class="evo-view-body" contenteditable="false"><div class="evo-view-content evo-view-type-%viewType%"></div></div><div class="evo-view-selection-after"></div></div>',replaceMarkers:function(){var a=this;this.getMarkers(function(e,t){var n,i=t===e.selection.getNode();if(a.loader||w(t).text()===a.text){var o=a.markerText.replace(/%encodedText%/g,a.encodedText).replace(/%viewType%/g,a.type);n=e.$(o),e.$(t).replaceWith(n),i&&e.evo.setViewCursor(!1,n[0])}else e.dom.setAttrib(t,"data-evo-view-marker",null)})},removeMarkers:function(){this.getMarkers(function(e,t){e.dom.setAttrib(t,"data-evo-view-marker",null)})},setContent:function(i,o,e){"object"===w.type(i)&&-1!==i.body.indexOf("<script")?this.setIframes(i.head||"",i.body,o,e):"string"===w.type(i)&&-1!==i.indexOf("<script")?this.setIframes("",i,o,e):i==this.text?this.getNodes(function(e,t,n){t.replaceWith(this.text)},e):this.getNodes(function(e,t,n){-1!==(i=i.body||i).indexOf("<iframe")&&(i+='<div class="evo-view-overlay"></div>'),n.innerHTML="",n.appendChild("string"==typeof i?e.dom.createFragment(i):i),o&&o.call(this,e,t,n)},e)},setIframes:function(p,h,g,e){var f=t.MutationObserver||t.WebKitMutationObserver||t.MozMutationObserver,m=this;this.getNodes(function(r,d,c){var v=r.dom,l="",u=r.getBody().className||"",e=r.getDoc().getElementsByTagName("head")[0];tinymce.each(v.$('link[rel="stylesheet"]',e),function(e,t){t.href&&-1===t.href.indexOf("skins/lightgray/content.min.css")&&-1===t.href.indexOf("skins/wordpress/wp-content.css")&&(l+=v.getOuterHTML(t))}),m.iframeHeight&&v.add(c,"div",{style:{width:"100%",height:m.iframeHeight}}),setTimeout(function(){var t,n,e,i,o;function a(){var e;o||t.contentWindow&&(e=w(t),m.iframeHeight=w(n.body).height(),e.height()!==m.iframeHeight&&(e.height(m.iframeHeight),r.nodeChanged()))}if(c.innerHTML="",t=v.add(c,"iframe",{src:tinymce.Env.ie?'javascript:""':"",frameBorder:"0",allowTransparency:"true",scrolling:"no",class:"evo-view-sandbox",style:{width:"100%",display:"block"},height:m.iframeHeight}),v.add(c,"div",{class:"evo-view-overlay"}),(n=t.contentWindow.document).open(),n.write('<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+p+l+'<style>html {background: transparent;padding: 0;margin: 0;}body#evo-view-iframe-sandbox {background: transparent;padding: 1px 0 !important;margin: -1px 0 0 !important;}body#evo-view-iframe-sandbox:before,body#evo-view-iframe-sandbox:after {display: none;content: "";}</style></head><body id="evo-view-iframe-sandbox" class="'+u+'">'+h+"</body></html>"),n.close(),m.iframeHeight&&(o=!0,setTimeout(function(){o=!1,a()},3e3)),w(t.contentWindow).on("load",a),f)(e=new f(_.debounce(a,100))).observe(n.body,{attributes:!0,childList:!0,subtree:!0}),w(d).one("evo-view-unbind",function(){e.disconnect()});else for(i=1;i<6;i++)setTimeout(a,700*i);function s(){n.body.className=r.getBody().className}r.on("evo-body-class-change",s),w(d).one("evo-view-unbind",function(){r.off("evo-body-class-change",s)}),g&&g.call(m,r,d,c)},50)},e)},setLoader:function(){this.setContent('<div class="loading-placeholder"><div class="dashicons dashicons-admin-media"></div><div class="evo-view-loading"><ins></ins></div></div>')},setError:function(e,t){this.setContent('<div class="evo-view-error"><div class="dashicons dashicons-'+(t||"no")+'"></div><p>'+e+"</p></div>")},match:function(e){var t=i.next(this.type,e);if(t)return{index:t.index,content:t.content,options:{shortcode:t.shortcode}}},update:function(i,o,a,s){w.each(v,function(e,t){var n=t.prototype.match(i);if(n)return w(a).data("rendered",!1),o.dom.setAttrib(a,"data-evo-view-text",encodeURIComponent(i)),v.createInstance(type,i,n.options,s).render(),o.focus(),!1})},remove:function(e,t){this.unbindNode.call(this,e,t,w(t).find(".evo-view-content").get(0)),w(t).trigger("evo-view-unbind"),e.dom.remove(t),e.focus()}})}(window,window.evo,window.evo.shortcode,window.jQuery),function(e,t,n){var i,o;i={loader:!0},o=n.extend({},i,{initialize:function(){var a=this,e=[];e.push("tags[]="+encodeURI(a.text)),e.length&&(e=e.join("&")),this.getEditors(function(o){tinymce.util.XHR.send({url:o.getParam("anon_async_url")+"?action=render_inlines&type="+o.getParam("target_type")+"&id="+(null==o.getParam("target_ID")?"":o.getParam("target_ID"))+(o.getParam("temp_ID")?"&temp_link_owner_ID="+o.getParam("temp_ID"):""),content_type:"application/x-www-form-urlencoded",data:e,success:function(e){var t=tinymce.util.JSON.parse(e),n=o.dom.create("div"),i=o.dom.createFragment(t[a.text]);n.appendChild(i),a.render(n.innerHTML)}})})}}),t.register("image",o);var a=n.extend({},o,{markerText:'<span class="evo-view-wrap" data-evo-view-text="%encodedText%" data-evo-view-type="%viewType%"><span class="evo-view-selection-before"> </span><span class="evo-view-body" contenteditable="false"><span class="evo-view-content evo-view-type-%viewType%"></span></span><span class="evo-view-selection-after"> </span></span>'});t.register("thumbnail",a),t.register("inline",a);var s=n.extend({},o,{markerText:'<div class="evo-view-wrap" data-evo-view-text="%encodedText%" data-evo-view-type="%viewType%" data-evo-view-plugin-type="email_element"><div class="evo-view-selection-before"></div><div class="evo-view-body" contenteditable="false"><div class="evo-view-content evo-view-type-%viewType%"></div></div><div class="evo-view-selection-after"></div></div>'});t.register("button",s),t.register("cta",s),t.register("like",s),t.register("dislike",s),t.register("activate",s),t.register("unsubscribe",s)}(window,window.evo.views,window.jQuery);