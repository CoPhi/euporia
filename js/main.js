            var target;
            var xhttp = new XMLHttpRequest();
            var editp=false;
            
            function encode(text){
                text=text.replace(/</g,'≺');
                text=text.replace(/>/g,'≻');
                text=text.replace(/&/g,'＆');
                return text;
            }
            function decode(text){
                text=text.replace(/≺/g,'<');
                text=text.replace(/≻/g,'>');
                text=text.replace(/＆/g,'&');
                return text;
            }
            function state(targetParam){
                document.getElementById("b"+targetParam).innerHTML="Save";
                if(editp===false){
                    var content=document.getElementById("an"+targetParam).innerText||document.getElementById("an"+targetParam).textContent;
                    content=decode(content);
                    if(content==="") content="* ";
                    var editor = ace.edit("an"+targetParam);
                    var session = editor.session;
                    session.setUseWrapMode(true);
                    session.setWrapLimitRange(80, 80);
                    editor.setTheme("ace/theme/euporia");
                    editor.getSession().setMode("ace/mode/euporia");
                    editor.setOptions({maxLines: 25, fontSize: "11pt"});
                    editor.autoComplete = false;
                    editor.setShowPrintMargin(false);
                    editor.setBehavioursEnabled(false);
                    editor.resize();
                    editor.setValue(content,-1);
                    var row = editor.session.getLength() - 1;
                    var column = editor.session.getLine(row).length;
                    editor.selection.moveTo(row, column);
                    editp=true;
                }
            }
            function add(targetParam) {
                if(document.getElementById("b"+targetParam).innerHTML.includes("Saved")){
                    return;
                }
                editp=false;
                var editor = ace.edit("an"+targetParam);
                var content=editor.getValue();
                editor.destroy();
                var oldDiv = editor.container;
                var newDiv = oldDiv.cloneNode(false);
                newDiv.innerText=content;
                oldDiv.parentNode.replaceChild(newDiv, oldDiv);
                target = targetParam;
                document.getElementById("b"+target).innerHTML="Saving...";
                content=encode(content);
                var parsedContent=parse(content).replace("<EOF>","<EOF/>");
                var divContent='<info xmlns="http://himeros.eu/euporia"><n>'+target+"</n><text><![CDATA["+content+"]]></text><parsed>"+parsedContent+"</parsed></info>";
                xhttp.open('POST', 'dbmanager.xql', true);
                xhttp.setRequestHeader("Content-type", "text/html");
                xhttp.send(divContent);
            }
            function parse(input){
                var chars = new delta.antlr4.InputStream(input);
                var lexer = new euporia.EuporiaLexer(chars);
                var tokens = new delta.antlr4.CommonTokenStream(lexer);
                var parser = new euporia.EuporiaParser(tokens);
                parser.buildParseTrees = true;
                var tree = parser.start();
                var xmlDoc=tree.accept(new euporia.DomVisitor());
                return xmlDoc;
            }

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    document.getElementById("b"+target).innerHTML = xhttp.responseText;
                }
            };
