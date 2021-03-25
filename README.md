# euporia
## Presentation
Euporia is an annotation tool based on Domain Specific Languages (DSLs). You can create the Context-Free Grammar for your DSL and generate the parser for your language. Your grammar must be named <code>Euporia</code> and the starting rule must be <code>start</code>.

## Instructions
The current version of Euporia is an applet for <a href="http://exist-db.org/">eXist-db 5.3.0</a>. Install the <a href="https://hub.docker.com/r/existdb/existdb/tags">docker for eXist-dba</a> (tested on the 5.3.0-SNAPSHOT release) and upload your <a href="https://github.com/CoPhi/euporia/releases/download/v0.1-alpha/euporia-0.1.xar">euporia-0.1.xar</a> file through the eXist-db Package Manager.

Write your grammar as a .g4 <a href="https://www.antlr.org/">ANTL4</a> grammar with parser and lexer in the same document, and then copy and paste it into the <a href="https://cophilab.ilc.cnr.it/parseForge/">Parser Forge</a>, in order to create the parser. Dowload the generated <code>euporia.js</code> file and upload it into the <code>js/euporia</code> folder by overriding the file with the same name.

Through the eXist-db IDE, upload your <code>.xml</code> files into the data folder and customize the <code>index.xql</code> and <code>dbmanager.xql</code> files.

If you want start annotating, be sure to be logged into eXist-db and open the Annotation Panel.
