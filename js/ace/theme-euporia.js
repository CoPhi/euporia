ace.define("ace/theme/euporia",["require","exports","module","ace/lib/dom"], function(require, exports, module) {
"use strict";

exports.isDark = false;
exports.cssText = ".ace-euporia .ace_gutter {\
background: #ebebeb;\
border-right: 1px solid rgb(159, 159, 159);\
color: rgb(136, 136, 136);\
}\
.ace-euporia .ace_print-margin {\
width: 1px;\
background: #ebebeb;\
}\
.ace-euporia {\
background-color: #FFFFFF;\
color: black;\
}\
.ace-euporia .ace_fold {\
background-color: rgb(60, 76, 114);\
}\
.ace-euporia .ace_cursor {\
color: black;\
}\
.ace-euporia .ace_storage,\
.ace-euporia .ace_keyword,\
.ace-euporia .ace_variable {\
color: rgb(127, 0, 85);\
}\
.ace-euporia .ace_constant.ace_buildin {\
color: rgb(88, 72, 246);\
}\
.ace-euporia .ace_constant.ace_library {\
color: rgb(6, 150, 14);\
}\
.ace-euporia .ace_function {\
color: rgb(60, 76, 114);\
}\
.ace-euporia .ace_string {\
color: rgb(42, 0, 255);\
}\
.ace-euporia .ace_comment {\
color: rgb(113, 150, 130);\
}\
.ace-euporia .ace_comment.ace_doc {\
color: rgb(63, 95, 191);\
}\
.ace-euporia .ace_comment.ace_doc.ace_tag {\
color: rgb(127, 159, 191);\
}\
.ace-euporia .ace_constant.ace_numeric {\
color: red;\
}\
.ace-euporia .ace_boundary {\
color: rgb(255, 215, 0);\
}\
.ace-euporia .ace_tag {\
color: rgb(64, 64, 255);\
font-weight: bold;\
}\
.ace-euporia .ace_attrib {\
color: rgb(0, 128, 0);\
font-weight: bold;\
}\
.ace-euporia .ace_hand {\
color: rgb(0, 128, 128);\
}\
.ace-euporia .ace_type {\
color: rgb(127, 0, 127);\
}\
.ace-euporia .ace_xml-pe {\
color: rgb(104, 104, 91);\
}\
.ace-euporia .ace_marker-layer .ace_selection {\
background: rgb(181, 213, 255);\
}\
.ace-euporia .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.ace-euporia .ace_meta.ace_tag {\
color:rgb(25, 118, 116);\
}\
.ace-euporia .ace_invisible {\
color: #ddd;\
}\
.ace-euporia .ace_entity.ace_other.ace_attribute-name {\
color:rgb(127, 0, 127);\
}\
.ace-euporia .ace_marker-layer .ace_step {\
background: rgb(255, 255, 0);\
}\
.ace-euporia .ace_active-line {\
background: rgb(232, 242, 254);\
}\
.ace-euporia .ace_gutter-active-line {\
background-color : #DADADA;\
}\
.ace-euporia .ace_marker-layer .ace_selected-word {\
border: 1px solid rgb(181, 213, 255);\
}\
.ace-euporia .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
}";

exports.cssClass = "ace-euporia";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
