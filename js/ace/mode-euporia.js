ace.define("ace/mode/euporia_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
    "use strict";
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var EuporiaHighlightRules = function() {
        var keywordMapper = this.createKeywordMapper({
            "keyword.control": "xyz1",
            "keyword.operator": "//",
            "keyword.other": "xyz3",
            "storage.type": "xyz4",
            "storage.modifier": "xyz5",
            "support.function": "xyz6",
            "constant.language": "xyz7"
        }, "identifier");
        this.$rules = {
            "start": [
	     { token : "tag", regex : "=+[A-Z]+=+|#[a-zA-Z_]+"},
	     { token : "attrib", regex : "\\*[a-zàèéìòóù_]+:|@[a-z_]+:"}, 
	     { token : "hand", regex : "\u261B|\u261A"},
                { token : "comment", regex : "##.*" },
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

ace.define("ace/mode/euporia",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/euporia_highlight_rules","ace/worker/worker_client"], function(require, exports, module) {
"use strict";
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var HighlightRules = require("./euporia_highlight_rules").EuporiaHighlightRules;
    var WorkerClient = require("../worker/worker_client").WorkerClient;
    var EuporiaMode = function() {
        this.HighlightRules = HighlightRules;
    };
    oop.inherits(EuporiaMode, TextMode);
    (function() {
        this.createWorker = function(session) {
	 var worker = new WorkerClient(["ace"], "ace/mode/euporia_worker", "EuporiaWorker");
	 worker.attachToDocument(session.getDocument());
	 worker.on("annotate", function(e) {
                session.setAnnotations(e.data);
	 });
	 worker.on("terminate", function() {
                session.clearAnnotations();
	 });
	 return worker;
        };
        this.$id = "ace/mode/euporia";
    }).call(EuporiaMode.prototype);
    exports.Mode = EuporiaMode;
});
