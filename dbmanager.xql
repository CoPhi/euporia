xquery version "3.1";
declare namespace eu="http://himeros.eu/euporia";
declare namespace tei="http://www.tei-c.org/ns/1.0";
declare namespace functx = "http://www.functx.com";
import module namespace transform="http://exist-db.org/xquery/transform";
declare option exist:serialize "method=xml media-type=text/xml indent=no";

let $annoDsl:=doc("data/casanovaIliadeVenezianoAnno001Dsl.xml") (:load document to insert DSL annotations:)
let $annoXml:=doc("data/casanovaIliadeVenezianoAnno001Xml.xml") (:load document to insert parsed annotations in XML:)
let $annoTei:=doc("data/casanovaIliadeVenezianoAnno001Tei.xml") (:load document to insert transformed annotations in TEI:)
let $data:=request:get-data() (:receive data from index.xql in this format: <info xmlns="http://himeros.eu/euporia"><n>[divN]</n><text>[DSL annotation]</text><parsed>[parsed XML annotation]</parsed></info>:)
let $xmlContent:=$data/eu:info/eu:parsed/eu:start (:parsed content in XML:)
let $teiContent:=transform:transform($data/eu:info/eu:parsed/eu:start,doc("data/fromXmlEuporiaToXmlTeiDiv.xsl"),()) (:transformed content in TEI:)
return (
    (:UPDATE DSL FILE:)
    if ($annoDsl/eu:annotations/eu:div[@n=$data/eu:info/eu:n/text()]) (:if div node does not exist, create it in the DSL annotation file:)
        then () else update insert <div xmlns="http://himeros.eu/euporia" n="{$data/eu:info/eu:n/text()}"/> into $annoDsl/eu:annotations,
    update value $annoDsl/eu:annotations/eu:div[@n=$data/eu:info/eu:n/text()] with $data/eu:info/eu:text/text(), (:update content:)
    
    (:UPDATE PARSED XML FILE:)(:NB: in production, this section can be commented or deleted:)
    if ($annoXml/eu:annotations/eu:div[@n=$data/eu:info/eu:n/text()]) (:if div node does not exist, create it in the parsed XML annotation file:)
        then () else update insert <div xmlns="http://himeros.eu/euporia" n="{$data/eu:info/eu:n/text()}"/> into $annoXml/eu:annotations,
    update delete $annoXml//eu:div[@n=$data/eu:info/eu:n/text()]/node(), (:delete out of date div, if exists:)
    update insert $xmlContent/child::node() into $annoXml//eu:div[@n=$data/eu:info/eu:n/text()], (:insert new or updated content:)
    
    (:UPDATE TRANSFORMED TEI FILE:)
    if ($annoTei//tei:body/tei:div[@n=$data/eu:info/eu:n/text()]) (:if div node does not exist, create it in the transformed TEI annotation file:)
        then () else update insert <div xmlns="http://www.tei-c.org/ns/1.0" n="{$data/eu:info/eu:n/text()}"/> into $annoTei//tei:body,
    update delete $annoTei//tei:div[@n=$data/eu:info/eu:n/text()]/node(), (:possibly delete out of date div, if exists:)
    update insert $teiContent/child::node() into $annoTei//tei:div[@n=$data/eu:info/eu:n/text()], (:insert new or updated content:)
    "Saved" (:return "Saved", which will be written as the label of the "Save" button in the index.xql file:)
    )

