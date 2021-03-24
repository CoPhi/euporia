importScripts("worker-base.js");

//1-----------
// load nodejs compatible require
var ace_require = require;
require = undefined;
var Honey = { 'requirePath': ['..'] }; // walk up to js folder, see Honey docs
importScripts("../lib/require.js");
var antlr4_require = require;
require = ace_require;

//2-----------
// load antlr4 and EuporiaHeliandLanguage
var antlr4, euporiaHeliand;
try {
    require = antlr4_require;
    antlr4 = require('antlr4/index');
    euporiaHeliand = require('euporiaHeliand/index');
} finally {
    require = ace_require;
}

//3-----------
// class for gathering errors and posting them to ACE editor
var AnnotatingErrorListener = function(annotations) {
    antlr4.error.ErrorListener.call(this);
    this.annotations = annotations;
    return this;
};

AnnotatingErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
AnnotatingErrorListener.prototype.constructor = AnnotatingErrorListener;

AnnotatingErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    this.annotations.push({
        row: line - 1,
        column: column,
        text: msg,
        type: "error"
 });
};


//4-----------
var validate = function(input) {
    var stream = antlr4.CharStreams.fromString(input);
    var lexer = new euporiaHeliand.EuporiaHeliandLexer(stream);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new euporiaHeliand.EuporiaHeliandParser(tokens);
    var annotations = [];
    var listener = new AnnotatingErrorListener(annotations)
    parser.removeErrorListeners();
    parser.addErrorListener(listener);
    parser.start();
    return annotations;
};
//------------


//var validate = function(input) {
//    return [ { row: 0, column: 0, text: input, type: "error" } ];
//};

ace.define("ace/mode/trag_worker",["require","exports","module","ace/lib/oop","ace/worker/mirror"], function(require, exports, module) {
    "use strict";
    var oop = require("../lib/oop");
    var Mirror = require("../worker/mirror").Mirror;
    //var parse = require("./json/json_parse");
    var TragWorker = exports.TragWorker = function(sender) {
        Mirror.call(this, sender);
        this.setTimeout(200);
    };
    
    oop.inherits(TragWorker, Mirror);
    
    (function() {
        
        this.onUpdate = function() {
	 var value = this.doc.getValue();
	 var errors = [];
	 try {
                if (value) validate(value);
	 } catch (e) {
                var pos = this.doc.indexToPosition(e.at-1);
                errors.push({
                    row: pos.row,
                    column: pos.column,
                    text: e.message,
                    type: "error"
                });
	 }
	 //errors=validate(value);
	 errors=validate(value);
	 this.sender.emit("annotate", errors);
        };
        
    }).call(TragWorker.prototype);
    
});

