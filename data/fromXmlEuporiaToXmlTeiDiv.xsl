<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:eu="http://himeros.eu/euporia" xmlns="http://www.tei-c.org/ns/1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="2.0">
    <xsl:output method="xml" omit-xml-declaration="yes" indent="no"/>
    <xsl:strip-space elements="*"/>
    
    <xsl:template match="eu:start">
        <xsl:element name="div">
            <!-- insert your XSLT instructions here and cancel the following line -->
            <xsl:element name="p">
                <xsl:apply-templates/>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    <!--craeate here your templates-->
    
</xsl:stylesheet>