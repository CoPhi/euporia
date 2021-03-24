ace.define("ace/mode/euporia_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
    "use strict";
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var EuporiaHighlightRules = function() {
        var keywordMapper = this.createKeywordMapper({
            "keyword.control": "if|then|else",
            "keyword.operator": "and|or|not",
            "keyword.other": "class",
            "storage.type": "int|float|text",
            "storage.modifier": "private|public",
            "support.function": "print|sort",
            "constant.language": "true|false"
        }, "identifier");
        this.$rules = {
            "start": [
	     { token : "tag", regex : "#[a-z_]+"},
	     { token : "attrib", regex : "@[a-z_]+:"}, 
	     { token : "hand", regex : "\u261B|\u261A"},
                { token : "comment", regex : "//" },
                { token : "string",  regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]' },
                { token : "constant.numeric", regex : "0[xX][0-9a-fA-F]+\\b" },
                { token : "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b" },
                { token : "keyword.operator", regex : "!|%|\\\\|/|\\*|\\-|\\+|~=|==|<>|!=|<=|>=|=|<|>|&&|\\|\\|" },
                { token : "punctuation.operator", regex : "\\?|\\:|\\,|\\;|\\." },
                { token : "paren.lparen", regex : "[[({]" },
                { token : "paren.rparen", regex : "[\\])}]" },
                { token : "text", regex : "\\s+" },
                { token: keywordMapper, regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b" }
            ]
        };
    };
    oop.inherits(EuporiaHighlightRules, TextHighlightRules);
    exports.EuporiaHighlightRules = EuporiaHighlightRules;
});

ace.define("ace/mode/trag",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/euporia_highlight_rules","ace/worker/worker_client"], function(require, exports, module) {
"use strict";
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var HighlightRules = require("./euporia_highlight_rules").EuporiaHighlightRules;
    var WorkerClient = require("../worker/worker_client").WorkerClient;
    var TragMode = function() {
        this.HighlightRules = HighlightRules;
    };
    oop.inherits(TragMode, TextMode);
    (function() {
        this.createWorker = function(session) {
	 var worker = new WorkerClient(["ace"], "ace/mode/trag_worker", "TragWorker");
	 worker.attachToDocument(session.getDocument());
	 worker.on("annotate", function(e) {
                session.setAnnotations(e.data);
	 });
	 worker.on("terminate", function() {
                session.clearAnnotations();
	 });
	 return worker;
        };
        this.$id = "ace/mode/trag";
    }).call(TragMode.prototype);
    exports.Mode = TragMode;
});
