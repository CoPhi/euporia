<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="2.0">

    <xsl:output encoding="UTF-8" method="xhtml" omit-xml-declaration="yes"/>

    <xsl:template match="tei:lg">
        <xsl:element name="div">
            <xsl:apply-templates select="tei:head"/>
            <xsl:for-each select="tei:l">
                <xsl:element name="span">
                    <xsl:attribute name="class">cit</xsl:attribute>
                    <xsl:value-of select="@n"/><xsl:text> </xsl:text>
                </xsl:element>
                <xsl:element name="span">
                    <xsl:attribute name="class">verseText</xsl:attribute>
                    <xsl:value-of select="text()"/>
                </xsl:element>
                <br/>
            </xsl:for-each>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="tei:head">
        <xsl:element name="strong">
            <xsl:value-of select="text()"/>
        </xsl:element><br/>
    </xsl:template>
    
</xsl:stylesheet>