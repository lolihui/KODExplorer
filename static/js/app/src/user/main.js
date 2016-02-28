define("app/src/user/main", ["lib/jquery-lib", "lib/util", "lib/artDialog/jquery-artDialog", "../../common/core", "../../tpl/copyright.html", "../../tpl/search.html", "../../tpl/search_list.html", "../../tpl/upload.html"], function(e) {
    e("lib/jquery-lib"), e("lib/util"), e("lib/artDialog/jquery-artDialog"), core = e("../../common/core"), $(document).ready(function() {
        core.update("check_status");
        var e = function() {
            var e = $("#username").val(),
                t = $("#password").val(),
                a = $("input[name=rember_password]").attr("checked") ? 1 : 0,
                i = "./index.php?user/loginSubmit&name=" + urlEncode(e) + "&check_code=" + $("input.check_code").val() + "&password=" + urlEncode(t) + "&rember_password=" + a;
            window.location.href = i
        };
        $("#username").focus(), $("#submit").bind("click", e), $("#username,#password,input.check_code").keyEnter(e)
    })
}), define("app/common/core", [], function(require, exports) {
    return {
        filetype: {
            image: ["jpg", "jpeg", "png", "bmp", "gif", "ico"],
            music: ["mp3", "wma", "wav", "mid", "m4a", "aac", "midi"],
            movie: ["avi", "flv", "f4v", "wmv", "3gp", "mp4", "wmv", "asf", "m4v", "mov", "mpg"],
            doc: ["doc", "docx", "docm", "xls", "xlsx", "xlsb", "xlsm", "ppt", "pptx", "pptm"],
            text: ["oexe", "inc", "inf", "csv", "log", "asc", "tsv"],
            code: ["abap", "abc", "as", "ada", "adb", "htgroups", "htpasswd", "conf", "htaccess", "htgroups", "htpasswd", "asciidoc", "asm", "ahk", "bat", "cmd", "c9search_results", "cpp", "c", "cc", "cxx", "h", "hh", "hpp", "cirru", "cr", "clj", "cljs", "CBL", "COB", "coffee", "cf", "cson", "Cakefile", "cfm", "cs", "css", "curly", "d", "di", "dart", "diff", "patch", "Dockerfile", "dot", "dummy", "dummy", "e", "ejs", "ex", "exs", "elm", "erl", "hrl", "frt", "fs", "ldr", "ftl", "gcode", "feature", ".gitignore", "glsl", "frag", "vert", "go", "groovy", "haml", "hbs", "handlebars", "tpl", "mustache", "hs", "hx", "html", "htm", "xhtml", "erb", "rhtml", "ini", "cfg", "prefs", "io", "jack", "jade", "java", "js", "jsm", "json", "jq", "jsp", "jsx", "jl", "tex", "latex", "ltx", "bib", "lean", "hlean", "less", "liquid", "lisp", "ls", "logic", "lql", "lsl", "lua", "lp", "lucene", "Makefile", "GNUmakefile", "makefile", "OCamlMakefile", "make", "md", "markdown", "mask", "matlab", "mel", "mc", "mush", "mysql", "nix", "m", "mm", "ml", "mli", "pas", "p", "pl", "pm", "pgsql", "php", "phtml", "ps1", "praat", "praatscript", "psc", "proc", "plg", "prolog", "properties", "proto", "py", "r", "Rd", "Rhtml", "rb", "ru", "gemspec", "rake", "Guardfile", "Rakefile", "Gemfile", "rs", "sass", "scad", "scala", "scm", "rkt", "scss", "sh", "bash", ".bashrc", "sjs", "smarty", "tpl", "snippets", "soy", "space", "sql", "styl", "stylus", "svg", "tcl", "tex", "txt", "textile", "toml", "twig", "ts", "typescript", "str", "vala", "vbs", "vb", "vm", "v", "vh", "sv", "svh", "vhd", "vhdl", "xml", "rdf", "rss", "wsdl", "xslt", "atom", "mathml", "mml", "xul", "xbl", "xaml", "xq", "yaml", "yml", "htm", "xib", "storyboard", "plist", "csproj"],
            bindary: ["pdf", "bin", "zip", "swf", "gzip", "rar", "arj", "tar", "gz", "cab", "tbz", "tbz2", "lzh", "uue", "bz2", "ace", "exe", "so", "dll", "chm", "rtf", "odp", "odt", "pages", "class", "psd", "ttf", "fla", "7z", "dmg", "iso", "dat", "ipa"]
        },
        ico: function(e) {
            var t = G.static_path + "images/file_16/",
                a = ["folder", "file", "edit", "search", "up", "setting", "appStore", "error", "info", "mp3", "flv", "pdf", "doc", "xls", "ppt", "html", "swf"],
                i = $.inArray(e, a);
            return -1 == i ? t + "file.png" : t + e + ".png"
        },
        contextmenu: function(e) {
            try {
                rightMenu.hidden()
            } catch (t) {}
            var t = e || window.event;
            return t ? t && $(t.target).is("textarea") || $(t.target).is("input") || 0 != $(t.target).parents(".topbar").length || 0 != $(t.target).parents(".edit_body").length || 0 != $(t.target).parents(".aui_state_focus").length ? !0 : !1 : !0
        },
        pathThis: function(e) {
            e = e.replace(/\\/g, "/");
            var t = e.split("/"),
                a = t[t.length - 1];
            if ("" == a && (a = t[t.length - 2]), 0 == a.search("fileProxy")) {
                a = urlDecode(a.substr(a.search("&path=")));
                var t = a.split("/");
                a = t[t.length - 1], "" == a && (a = t[t.length - 2])
            }
            return a
        },
        pathFather: function(e) {
            e = e.replace(/\\/g, "/");
            var t = e.lastIndexOf("/");
            return e.substr(0, t + 1)
        },
        pathExt: function(e) {
            e = e.replace(/\\/g, "/"), e = e.replace(/\/+/g, "/");
            var t = e.lastIndexOf(".");
            return e = e.substr(t + 1), e.toLowerCase()
        },
        path2url: function(e) {
            if ("http" == e.substr(0, 4)) return e;
            if (e = e.replace(/\\/g, "/"), e = e.replace(/\/+/g, "/"), e = e.replace(/\/\.*\//g, "/"), G.is_root && e.substring(0, G.web_root.length) == G.web_root) return G.web_host + e.replace(G.web_root, "");
            var t = G.app_host + "/index.php?explorer/fileProxy&path=" + urlEncode(e);
            return G.share_page !== void 0 && (t = G.app_host + "/index.php?share/fileProxy&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(e)), t
        },
        authCheck: function(e, t) {
            return G.is_root ? !0 : AUTH.hasOwnProperty(e) ? AUTH[e] ? !0 : (void 0 == t && (t = LNG.no_permission), core.tips.tips(t, !1), !1) : !0
        },
        ajaxError: function(e) {
            core.tips.close(LNG.system_error, !1);
            var t = e.responseText,
                a = '<div class="ajaxError">' + t + "</div>",
                i = $.dialog.list.ajaxErrorDialog;
            return "<!--user login-->" == t.substr(0, 17) ? (FrameCall.goRefresh(), void 0) : (i ? i.content(a) : $.dialog({
                id: "ajaxErrorDialog",
                padding: 0,
                fixed: !0,
                resize: !0,
                ico: core.ico("error"),
                title: "ajax error",
                content: a
            }), void 0)
        },
        file_get: function(e, t) {
            var a = "./index.php?editor/fileGet&filename=" + urlEncode2(e);
            G.share_page !== void 0 && (a = "./index.php?share/fileGet&user=" + G.user + "&sid=" + G.sid + "&filename=" + urlEncode2(e)), $.ajax({
                url: a,
                dataType: "json",
                beforeSend: function() {
                    core.tips.loading(LNG.loading)
                },
                error: core.ajaxError,
                success: function(e) {
                    core.tips.close(LNG.success), "function" == typeof t && t(e.data.content)
                }
            })
        },
        setting: function(e) {
            void 0 == e && (e = G.is_root ? "system" : "user"), void 0 == window.top.frames.Opensetting_mode ? $.dialog.open("./index.php?setting#" + e, {
                id: "setting_mode",
                fixed: !0,
                ico: core.ico("setting"),
                resize: !0,
                title: LNG.setting,
                width: 960,
                height: 580
            }) : ($.dialog.list.setting_mode.display(!0), FrameCall.top("Opensetting_mode", "Setting.setGoto", '"' + e + '"'))
        },
        copyright: function() {
            var e = require("../tpl/copyright.html"),
                t = template.compile(e),
                a = t({
                    LNG: LNG,
                    G: G
                });
            $.dialog({
                id: "copyright_dialog",
                bottom: 0,
                right: 0,
                simple: !0,
                resize: !1,
                title: LNG.about + " kod",
                width: 425,
                padding: "0",
                fixed: !0,
                content: a
            })
        },
        appStore: function() {
            $.dialog.open("./index.php?app", {
                id: "app_store",
                fixed: !0,
                ico: core.ico("appStore"),
                resize: !0,
                title: LNG.app_store,
                width: 900,
                height: 550
            })
        },
        openIE: function(e) {
            $.dialog.open(e, {
                fixed: !0,
                resize: !0,
                title: LNG.app_store,
                width: "80%",
                height: "70%"
            })
        },
        openApp: function(app) {
            if ("url" == app.type) {
                var icon = app.icon; - 1 == app.icon.search(G.static_path) && "http" != app.icon.substring(0, 4) && (icon = G.static_path + "images/app/" + app.icon), "number" != typeof app.width && -1 == app.width.search("%") && (app.width = parseInt(app.width)), "number" != typeof app.height && -1 == app.height.search("%") && (app.height = parseInt(app.height)), $.dialog.open(app.content, {
                    title: app.name,
                    fixed: !0,
                    ico: icon,
                    resize: app.resize,
                    simple: app.simple,
                    title: app.name.replace(".oexe", ""),
                    width: app.width,
                    height: app.height
                })
            } else {
                var exec = app.content;
                eval("{" + exec + "}")
            }
        },
        update: function(e) {
            var t = base64_decode("aHR0cDovL3N0YXRpYy5rYWxjYWRkbGUuY29tL3VwZGF0ZS9tYWluLmpz") + "?a=" + UUID();
            require.async(t, function(t) {
                try {
                    //t.todo(e)
                } catch (a) {}
            })
        },
        explorer: function(e, t) {
            void 0 == e && (e = ""), void 0 == t && (t = core.pathThis(e));
            var a = "./index.php?/explorer&type=iframe&path=" + e;
            G.share_page !== void 0 && (a = "./index.php?share/folder&type=iframe&user=" + G.user + "&sid=" + G.sid + "&path=" + e), $.dialog.open(a, {
                resize: !0,
                fixed: !0,
                ico: core.ico("folder"),
                title: t,
                width: 880,
                height: 550
            })
        },
        explorerCode: function(e) {
            void 0 == e && (e = "");
            var t = "index.php?/editor&project=" + e;
            G.share_page !== void 0 && (t = "./index.php?share/code_read&user=" + G.user + "&sid=" + G.sid + "&project=" + e), $.dialog.open(t, {
                resize: !0,
                fixed: !0,
                ico: core.ico("folder"),
                title: core.pathThis(e),
                width: "80%",
                height: "70%"
            })
        },
        setSkin_finished: function() {
            var e = $(".setSkin_finished").attr("src");
            e && ($("#link_css_list").attr("href", e), $(".setSkin_finished").remove())
        },
        setSkin: function(e, t) {
            var a = G.static_path + "style/skin/" + e + t;
            $("body").append('<img src="' + a + '" onload="core.setSkin_finished();" onerror="core.setSkin_finished();" class="setSkin_finished">')
        },
        editorFull: function() {
            var e = $("iframe[name=OpenopenEditor]");
            e.toggleClass("frame_fullscreen")
        },
        language: function(e) {
            Cookie.set("kod_user_language", e, 8760), window.location.reload()
        },
        tips: {
            topHeight: function() {
                return "undefined" != typeof Global && Global.topbar_height ? Global.topbar_height : 0
            },
            loading: function(e) {
                Tips.loading(e, "info", core.tips.topHeight())
            },
            close: function(e, t) {
                "object" == typeof e ? Tips.close(e.data, e.code, core.tips.topHeight()) : Tips.close(e, t, core.tips.topHeight())
            },
            tips: function(e, t) {
                "object" == typeof e ? Tips.tips(e.data, e.code, core.tips.topHeight()) : Tips.tips(e, t, core.tips.topHeight())
            }
        },
        fullScreen: function() {
            "true" == $("body").attr("fullScreen") && core.exitfullScreen(), $("body").attr("fullScreen", "true");
            var e = document.documentElement;
            e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen && e.webkitRequestFullScreen()
        },
        exitfullScreen: function() {
            $("body").attr("fullScreen", "false"), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
        },
        createFlash: function(e, t, a) {
            var i = '<object type="application/x-shockwave-flash" id="' + a + '" data="' + e + '" width="100%" height="100%">' + '<param name="movie" value="' + e + '"/>' + '<param name="allowfullscreen" value="true" />' + '<param name="allowscriptaccess" value="always" />' + '<param name="flashvars" value="' + t + '" />' + '<param name="wmode" value="transparent" />' + "</object>";
            return i
        },
        search: function(e, t) {
            var a, i, n = require("../tpl/search.html"),
                s = require("../tpl/search_list.html"),
                o = function() {
                    var s = template.compile(n);
                    0 == $(".dialog_do_search").length ? (l(), i = {
                        search: e,
                        path: t,
                        is_content: void 0,
                        is_case: void 0,
                        ext: "",
                        LNG: LNG
                    }, a = $.dialog({
                        id: "dialog_do_search",
                        padding: 0,
                        fixed: !0,
                        ico: core.ico("search"),
                        resize: !0,
                        title: LNG.search,
                        width: 450,
                        content: s(i)
                    }), c(i), $("#search_ext").tooltip({
                        placement: "bottom",
                        html: !0
                    }), $("#search_path").tooltip({
                        placement: "bottom",
                        html: !0,
                        title: function() {
                            return $("#search_path").val()
                        }
                    })) : ($("#search_value").val(e), $("#search_path").val(t), r(), $.dialog.list.dialog_do_search.display(!0))
                },
                r = function() {
                    i = {
                        search: $("#search_value").val(),
                        path: $("#search_path").val(),
                        is_content: $("#search_is_content").attr("checked"),
                        is_case: $("#search_is_case").attr("checked"),
                        ext: $("#search_ext").val()
                    }, c(i)
                },
                l = function() {
                    $("#search_value").die("keyup").live("keyup", function() {
                        ui.path.setSearchByStr($(this).val())
                    }), $("#search_value,#search_ext,#search_path").keyEnter(r), $(".search_header a.button").die("click").live("click", r), $(".search_result .list .name").die("click").live("click", function() {
                        var e = $(this).find("a").html(),
                            t = $(this).parent().find(".path a").html() + e;
                        $(this).parent().hasClass("file") ? ui.pathOpen.open(t) : "explorer" == Config.pageApp ? ui.path.list(t + "/", "tips") : core.explorer(t + "/")
                    }), $(".search_result .list .path a").die("click").live("click", function() {
                        var e = $(this).html();
                        "explorer" == Config.pageApp ? ui.path.list(e, "tips") : core.explorer(e)
                    })
                },
                c = function(e) {
                    var t = 150;
                    $("#search_value").focus(), $(".search_result .list").remove();
                    var a = $(".search_result .message td");
                    if (!e.search || !e.path) return a.hide().html(LNG.search_info).fadeIn(t), void 0;
                    if (1 >= e.search.length) return a.hide().html("too short!").fadeIn(t), void 0;
                    var i = "index.php?explorer/search";
                    G.share_page !== void 0 && (i = "index.php?share/search&user=" + G.user + "&sid=" + G.sid), $.ajax({
                        url: i,
                        dataType: "json",
                        type: "POST",
                        data: e,
                        beforeSend: function() {
                            a.hide().html(LNG.searching + '<img src="' + G.static_path + 'images/loading.gif">').fadeIn(t)
                        },
                        error: core.ajaxError,
                        success: function(e) {
                            if (!e.code) return a.hide().html(e.data).fadeIn(t), void 0;
                            if (0 == e.data.filelist.length && 0 == e.data.folderlist.length) return a.hide().html(LNG.search_null).fadeIn(t), void 0;
                            a.hide();
                            var i = template.compile(s);
                            e.data.LNG = LNG, $(i(e.data)).insertAfter(".search_result .message").fadeIn(t)
                        }
                    })
                };
            o()
        },
        server_dwonload: function(e) {
            core.upload_check("explorer:serverDownload");
            var t = $(".download_box"),
                a = t.find("#download_list"),
                i = t.find("input").val();
            if (t.find("input").val(""), !i || "http" != i.substr(0, 4)) return core.tips.tips("url false!", !1), void 0;
            var n = UUID(),
                s = '<div id="' + n + '" class="item">' + '<div class="info"><span class="title" tytle="' + i + '">' + core.pathThis(i) + "</span>" + '<span class="size">0b</span>' + '<span class="state">' + LNG.upload_ready + "</span>" + '<a class="remove font-icon icon-remove" href="javascript:void(0)"></a>' + '<div style="clear:both"></div></div></div>';
            a.find(".item").length > 0 ? $(s).insertBefore(a.find(".item:eq(0)")) : a.append(s);
            var o, r, l, c = 0,
                d = $("#" + n),
                p = $("#" + n + " .state").text(LNG.download_ready),
                u = $('<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0%;text-align:right;"></div></div>').appendTo("#" + n).find(".progress-bar");
            $("#" + n + " .remove").bind("click", function() {
                $.get("./index.php?explorer/serverDownload&type=remove&uuid=" + n), $(this).parent().parent().slideUp(function() {
                    $(this).remove(), ui.f5()
                })
            }), $.ajax({
                url: "./index.php?explorer/serverDownload&type=download&save_path=" + e + "&url=" + urlEncode2(i) + "&uuid=" + n,
                dataType: "json",
                error: function(e, t, a) {
                    core.ajaxError(e, t, a), clearInterval(o), o = !1, clearTimeout(r), o = !1, u.parent().remove(), p.addClass("error").text(LNG.download_error)
                },
                success: function(e) {
                    clearInterval(o), o = !1, clearTimeout(r), o = !1, e.code ? (ui.f5_callback(function() {
                        ui.path.setSelectByFilename(e.info)
                    }), p.text(LNG.download_success), $("#" + n + " .info .title").html(e.info)) : p.addClass("error").text(LNG.error), u.parent().remove()
                }
            });
            var h = function() {
                $.ajax({
                    url: "./index.php?explorer/serverDownload&type=percent&uuid=" + n,
                    dataType: "json",
                    success: function(e) {
                        var t = "",
                            a = e.data;
                        if (o) {
                            if (!e.code) return p.text(LNG.loading), void 0;
                            if (a) {
                                if (a.size = parseFloat(a.size), a.time = parseFloat(a.time), l) {
                                    var i = (a.size - l.size) / (a.time - l.time);
                                    if (c > .2 * i) {
                                        var n = c;
                                        c = i, i = n
                                    } else c = i;
                                    t = core.file_size(i) + "/s"
                                }
                                if (0 == a.length) d.find(".progress-bar").css("width", "100%").text(LNG.loading);
                                else {
                                    var s = 100 * (a.size / a.length);
                                    d.find(".progress-bar").css("width", s + "%"), p.text(parseInt(s) + "%(" + t + ")")
                                }
                                d.find(".size").text(core.file_size(a.length)), l = a
                            }
                        }
                    }
                })
            };
            r = setTimeout(function() {
                h(), o = setInterval(function() {
                    h()
                }, 1e3)
            }, 100)
        },
        file_size: function(e) {
            if (0 == e) return "0B";
            e = parseFloat(e);
            var t = {
                GB: 1073741824,
                MB: 1048576,
                KB: 1024,
                "B ": 0
            };
            for (var a in t)
                if (e >= t[a]) return (e / t[a]).toFixed(1) + a;
            return "0B"
        },
        upload_check: function(e) {
            return void 0 == e && (e = "explorer:fileUpload"), !G.is_root && AUTH.hasOwnProperty(e) && 1 != AUTH[e] ? (core.tips.tips(LNG.no_permission, !1), void 0) : "*recycle*/" == G.this_path || "*share*/" == G.this_path || "*share*/" == G.this_path || G.json_data && "writeable" != G.json_data.path_type ? (core.tips.tips(LNG.no_permission_write, !1), !1) : !0
        },
        upload: function() {
            G.upload_path = G.this_path;
            var e = urlDecode(G.upload_path);
            if (uploader.option("server", "index.php?explorer/fileUpload&path=" + urlEncode(G.upload_path)), 30 >= e.length ? e : "..." + e.substr(e.length - 30), 0 != $(".dialog_file_upload").length) return $.dialog.list.dialog_file_upload.display(!0), void 0;
            var t = require("../tpl/upload.html"),
                a = template.compile(t),
                i = WebUploader.Base.formatSize(G.upload_max);
            $.dialog({
                padding: 5,
                resize: !0,
                ico: core.ico("up"),
                id: "dialog_file_upload",
                fixed: !0,
                title: LNG.upload_muti,
                content: a({
                    LNG: LNG,
                    maxsize: i
                }),
                close: function() {
                    $.each(uploader.getFiles(), function(e, t) {
                        uploader.skipFile(t), uploader.removeFile(t)
                    })
                }
            }), $(".file_upload .tips").tooltip({
                placement: "bottom"
            }), $(".file_upload .top_nav a.menu").unbind("click").bind("click", function() {
                $(this).hasClass("tab_upload") ? ($(".file_upload .tab_upload").addClass("this"), $(".file_upload .tab_download").removeClass("this"), $(".file_upload .upload_box").removeClass("hidden"), $(".file_upload .download_box").addClass("hidden")) : ($(".file_upload .tab_upload").removeClass("this"), $(".file_upload .tab_download").addClass("this"), $(".file_upload .upload_box").addClass("hidden"), $(".file_upload .download_box").removeClass("hidden"))
            }), $(".file_upload .download_box button").unbind("click").bind("click", function() {
                core.server_dwonload(G.upload_path)
            }), uploader.addButton({
                id: "#picker"
            })
        },
        upload_init: function() {
            var e = "#thelist",
                t = !0;
            $.browser.msie && (t = !1);
            var a = 10485760;
            a >= G.upload_max && (a = .8 * G.upload_max), uploader = WebUploader.create({
                swf: G.static_path + "js/lib/webuploader/Uploader.swf",
                dnd: "body",
                threads: 2,
                compress: !1,
                resize: !1,
                prepareNextFile: !0,
                duplicate: !0,
                chunked: t,
                chunkRetry: 3,
                chunkSize: a
            }), $("#uploader .success").die("click").live("click", function() {
                var e = $(this).find("span.title").attr("title");
                "explorer" == Config.pageApp ? ui.path.list(core.pathFather(e), "tips", function() {
                    ui.path.setSelectByFilename(core.pathThis(e))
                }) : core.explorer(core.pathFather(e))
            }), $("#uploader .open").die("click").live("click", function(e) {
                var t = $(this).find("span.title").attr("title");
                ui.pathOpen.open(t), stopPP(e)
            }), $(".upload_box_clear").die("click").live("click", function() {
                $("#thelist .success,#thelist .error").each(function() {
                    $(this).slideUp(300, function() {
                        $(this).remove()
                    })
                })
            }), $(".upload_box_setting").die("click").live("click", function() {
                $(".upload_box_config").toggleClass("hidden")
            }), $("#uploader .remove").die("click").live("click", function(e) {
                var t = $(this).parent().parent().attr("id");
                uploader.skipFile(t), uploader.removeFile(t, !0), $(this).parent().parent().slideUp(function() {
                    $(this).remove()
                }), stopPP(e)
            });
            var i = 0,
                n = 0,
                s = "0B/s",
                o = function(e, t) {
                    var a = e.size * t,
                        i = 3;
                    e.speed === void 0 ? e.speed = [
                        [time() - 500, 0],
                        [time(), a]
                    ] : i >= e.speed.length ? e.speed.push([time(), a]) : (e.speed = e.speed.slice(1, i), e.speed.push([time(), a]));
                    var n = e.speed[e.speed.length - 1],
                        o = e.speed[0],
                        r = (n[1] - o[1]) / ((n[0] - o[0]) / 1e3);
                    return r = core.file_size(r) + "/s", s = r, r
                },
                r = [];
            uploader.on("uploadBeforeSend", function(e, t) {
                var a = urlEncode(e.file.fullPath);
                (void 0 == a || "undefined" == a) && (a = ""), t.fullPath = a
            }).on("fileQueued", function(t) {
                if (!core.upload_check()) return uploader.skipFile(t), uploader.removeFile(t), void 0;
                var a, n = $(e),
                    a = t.fullPath;
                t.finished = !1, (void 0 == a || "undefined" == a) && (a = t.name), i++, $(e).find(".item").length > 0 && (n = $(e).find(".item:eq(0)"));
                var s = '<div id="' + t.id + '" class="item"><div class="info">' + '<span class="title" title="' + G.upload_path + a + '">' + core.pathThis(a) + "</span>" + '<span class="size">' + core.file_size(t.size) + "</span>" + '<span class="state">' + LNG.upload_ready + "</span>" + '<a class="remove font-icon icon-remove" href="javascript:void(0)"></a>' + '<div style="clear:both"></div></div></div>';
                $(e).find(".item").length > 0 ? $(s).insertBefore($(e).find(".item:eq(0)")) : $(e).append(s), uploader.upload()
            }).on("uploadProgress", function(e, t) {
                $(".dialog_file_upload .aui_title").text(LNG.uploading + ": " + n + "/" + i + " (" + s + ")");
                var a = o(e, t),
                    r = $("#" + e.id),
                    l = r.find(".progress .progress-bar");
                l.length || (l = $('<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0%"></div></div>').appendTo(r).find(".progress-bar")), r.find(".state").text(parseInt(100 * t) + "%(" + a + ")"), l.css("width", 100 * t + "%")
            }).on("uploadAccept", function(e, t) {
                e.file.serverData = t;
                try {
                    r.push(core.pathThis(t.info))
                } catch (a) {}
            }).on("uploadSuccess", function(e) {
                var t = 36 * $("#" + e.id).index(".item");
                $("#uploader").scrollTop(t), n++;
                var a = e.serverData;
                if (a.code ? ($("#" + e.id).addClass("success"), $("#" + e.id).find(".state").text(a.data), $("#" + e.id).find(".remove").removeClass("icon-remove").addClass("icon-ok").addClass("open").removeClass("remove")) : ($("#" + e.id).find(".state").addClass("error"), $("#" + e.id).find(".state").text(a.data).attr("title", a.data)), uploader.removeFile(e), $("#" + e.id).find(".progress").fadeOut(), !e.fullPath) {
                    var i = r;
                    ui.f5_callback(function() {
                        ui.path.setSelectByFilename(i)
                    })
                }
            }).on("uploadError", function(e, t) {
                n++, $("#" + e.id).find(".progress").fadeOut(), $("#" + e.id).find(".state").addClass("error"), $("#" + e.id).find(".state").text(LNG.upload_error + "(" + t + ")")
            }).on("uploadFinished", function() {
                $(".dialog_file_upload .aui_title").text(LNG.upload_success + ": " + n + "/" + i), i = 0, n = 0, uploader.reset(), "explorer" == Config.pageApp && ui.tree.checkIfChange(G.this_path);
                var e = r;
                ui.f5_callback(function() {
                    ui.path.setSelectByFilename(e), r = []
                })
            }).on("error", function(e) {
                core.tips.tips(e, !1)
            });
            var l;
            inState = !1, dragOver = function() {
                0 == inState && (inState = !0, MaskView.tips(LNG.upload_drag_tips)), l && window.clearTimeout(l)
            }, dragLeave = function(e) {
                stopPP(e), l && window.clearTimeout(l), l = window.setTimeout(function() {
                    inState = !1, MaskView.close()
                }, 100)
            }, dragDrop = function(e) {
                try {
                    if (e = e.originalEvent || e, core.upload_check()) {
                        var t = e.dataTransfer.getData("text/plain");
                        t && "http" == t.substring(0, 4) ? ui.pathOperate.appAddURL(t) : core.upload()
                    }
                    stopPP(e)
                } catch (e) {}
                inState && (inState = !1, MaskView.close())
            }
        }
    }
}), define("app/tpl/copyright.html", [], '<div class="copyright_dialog_content">\n	<div class="title">\n		<div class="logo"><i class="icon-cloud"></i>KodExplorer v{{G.version}}</div>\n		<div class=\'info\'>——{{LNG.kod_name_copyright}}</div>\n	</div>\n	<div class="content">\n		<p>{{#LNG.copyright_desc}}</p>\n		<div>{{#LNG.copyright_contact}}</div>\n		<div>{{#LNG.copyright_info}}</div> \n	</div>\n</div>'), define("app/tpl/search.html", [], "<div class='do_search'>\n    <div class='search_header'>\n       <div class='s_br'>\n            <input type='text' id='search_value' value='{{search}}'/><a class='right button icon-search'></a>\n            <div style='float:right'>{{LNG.path}}:<input type='text' id='search_path' value='{{path}}'/></div>\n        </div>\n       <div class='s_br'>\n            <input type='checkbox' id='search_is_case' {{if is_case}}checked='true'{{/if}}/>\n            <label for='search_is_case'>{{LNG.search_uplow}}</label>\n            <input type='checkbox' id='search_is_content' {{if is_content}}checked='true'{{/if}}/>\n            <label for='search_is_content'>{{LNG.search_content}}</label>\n            <div style='float:right'>{{LNG.file_type}}:<input type='text' id='search_ext' value='{{ext}}' title='{{LNG.search_ext_tips}}'/></div>\n        </div>\n    </div>\n    <div class='search_result'>\n        <table border='0' cellspacing='0' cellpadding='0'>\n            <tr class='search_title'>\n               <td class='name'>{{LNG.name}}</td>\n               <td class='type'>{{LNG.type}}</td>\n               <td class='size'>{{LNG.size}}</td>\n               <td class='path'>{{LNG.path}}</td>\n            </tr>\n            <tr class='message'><td colspan='4'></td></tr>\n        </table>\n    </div>\n</div>\n\n"), define("app/tpl/search_list.html", [], "{{each folderlist as v i}}\n    <tr class='list folder' data-path='{{v.path}}{{v.name}}' data-type='folder' data-size='0'>\n        <td class='name'><a href='javascript:void(0);' title='{{LNG.open}}{{v.name}}'>{{v.name}}</a></td>\n        <td class='type'>{{LNG.folder}}</td>\n        <td class='size'>0</td>\n        <td class='path'><a href='javascript:void(0);' title='{{LNG.goto}}{{v.path}}'>{{v.path}}</a></td>\n    </tr>\n{{/each}}\n{{each filelist as v i}}\n<tr class='list file'\n    data-path='{{v.path}}{{v.name}}' \n    data-type='{{v.ext}}' \n    data-size='{{v.size}}'>\n    <td class='name'><a href='javascript:void(0);' title='{{LNG.open}}{{v.name}}'>{{v.name}}</a></td>\n    <td class='type'>{{v.ext}}</td>\n    <td class='size'>{{v.size_friendly}}</td>\n    <td class='path'><a href='javascript:void(0);' title='{{LNG.goto}}{{v.path}}'>{{v.path}}</a></td>\n</tr>\n{{/each}}"), define("app/tpl/upload.html", [], "<div class='file_upload'>\n    <div class='top_nav'>\n       <a href='javascript:void(0);' class='menu this tab_upload'>{{LNG.upload_local}}</a>\n       <a href='javascript:void(0);' class='menu tab_download''>{{LNG.download_from_server}}</a>\n       <div style='clear:both'></div>\n    </div>\n    <div class='upload_box'>\n        <div class='btns'>\n            <div id='picker'>{{LNG.upload_select}}</div>\n            <div class=\"upload_box_tips\">\n            <a href=\"javascript:void(0);\" class=\"upload_box_clear\">{{LNG.upload_clear}}</a> \n            <!-- \n            | <a href=\"javascript:void(0);\" class=\"upload_box_setting\">\n            {{LNG.upload_setting}}<b class=\"caret\"></b></a> \n            -->\n            </div>\n            <div style='clear:both'></div>\n        </div>\n\n        <div class=\"upload_box_config hidden\">\n            <i>{{LNG.upload_tips}}</i>\n            <div class=\"upload_check_box\">\n                <b>{{LNG.upload_exist}}</b>\n                <label><input type=\"radio\" name=\"existing\" value=\"rename\" checked=\"checked\">{{LNG.upload_exist_rename}}</label>\n                <label><input type=\"radio\" name=\"existing\" value=\"replace\">{{LNG.upload_exist_replace}}</label>\n                <label><input type=\"radio\" name=\"existing\" value=\"skip\">{{LNG.upload_exist_skip}}</label>\n            </div>\n        </div>\n        <div id='uploader' class='wu-example'>\n            <div id='thelist' class='uploader-list'></div>\n        </div>\n    </div>\n    <div class='download_box hidden'>\n        <div class='list'>{{LNG.download_address}}<input type='text' name='url'/>\n        <button class='btn btn-default btn-sm' type='button'>{{LNG.download}}</button>\n        </div>\n        <div style='clear:both'></div>\n        <div id='downloader'>\n            <div id='download_list' class='uploader-list'></div>\n        </div>\n    </div>\n</div>");