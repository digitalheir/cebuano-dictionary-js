<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:local="http://localhost"
    version="2.0"
    exclude-result-prefixes="xs dc">

    <xsl:output 
        method="html" 
        indent="yes"
        encoding="ISO-8859-1"/>

    <xsl:preserve-space elements="*"/>

    <xsl:key name="id" match="*[@id]" use="@id"/>

    <xsl:param name="fontSize" select="'20'"/>    
    <xsl:param name="expandAbbreviations" select="'false'"/>
    <xsl:param name="useMetric" select="'false'"/>

    <xsl:template match="dictionary">
        <html>
            <head>
                <title>Dictionary of Cebuano Visayan</title>

                <style type="text/css">

                    body { font-size: <xsl:value-of select="$fontSize"/>pt; }

                    .rm { font-style: normal; font-weight: normal; }

                </style>
            </head>
            <body>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="form | number | hw | bx | formx | b">
        <b><xsl:apply-templates/></b>
    </xsl:template>

    <xsl:template match="pos | q | ix | i">
        <i><xsl:apply-templates/></i>
    </xsl:template>

    <xsl:template match="number[parent::form] | number[parent::hw] | sub">
        <sub><xsl:apply-templates/></sub>
    </xsl:template>

    <xsl:template match="bio">
        <b><i><xsl:apply-templates/></i></b>
    </xsl:template>

    <xsl:template match="r">
        <span class="rm">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <!--  We drop all examples in the compact presentation, and are also not interested in the verb codes -->
    <xsl:template match="eg | itype | pb"/>

    <xsl:template match="abbr">
        <xsl:choose>
            <xsl:when test="$expandAbbreviations = 'true'">
                <xsl:value-of select="@expan" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="measure">
        <xsl:choose>
            <xsl:when test="$useMetric = 'true'">
                <xsl:value-of select="@reg" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
</xsl:stylesheet>
