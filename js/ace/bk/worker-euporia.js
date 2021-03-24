importScripts("worker-base.js");
ace.define('ace/worker/euporia',["require","exports","module","ace/lib/oop","ace/worker/mirror"], function(require, exports, module) {
    "use strict";
    alert('ci sono passato');
    var oop = require("ace/lib/oop");
    var Mirror = require("ace/worker/mirror").Mirror;

    var EuporiaWorker = function(sender) {
        Mirror.call(this, sender);
        this.setTimeout(200);
        this.$dialect = null;
    };

    oop.inherits(EuporiaWorker, Mirror);

    (function() {

        this.onUpdate = function() {
            var value = this.doc.getValue();
            var annotations = validate(value);
            this.sender.emit("annotate", annotations);
        };

    }).call(EuporiaWorker.prototype);

    exports.EuporiaWorker = EuporiaWorker;
});

var validate = function(input) {
    return [ { row: 0, column: 0, text: "EuporiaMode says Hello!", type: "error" } ];
};
