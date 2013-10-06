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

    <xsl:param name="fontSize" select="'20'"/>    
    <xsl:param name="expandAbbreviations" select="'false'"/>
    <xsl:param name="useMetric" select="'false'"/>

    <xsl:key name="id" match="*[@id]" use="@id"/>

    <!-- http://colorschemedesigner.com/#2N62lffYIRNQG  -->

    <xsl:template match="dictionary">
        <html>
            <head>
                <title>Dictionary of Cebuano Visayan</title>

                <style type="text/css">

                    body { font-size: <xsl:value-of select="$fontSize"/>pt; }

                    .entry, .hom, .sense, .eg { margin: 5px; }

                    .entry { margin-top: 10px; }

                    .entry { margin-left: 10px; padding-left: 10px; }

                    .hom { margin-left: 10px; border-left: solid 4px #FF858B; padding-left: 10px; }

                    .noun { border-color: #8FFC84; }
                    
                    .verb { border-color: #8EB4F9; }
                    
                    .adjective { border-color: #FFFE86; }

                    .sense { margin-left: 10px; padding-left: 10px; }

                    .form { font-size: 110%; }

                    .eg { margin-left: 10px; padding-left: 10px; }

                    .eg { color: gray; font-size: 90% }
                    
                    .eg i { font-style: italic }

                    .pos { font-size: 110%; color: red; }

                    .num { color: blue; }

                    .itype { }
                    
                    .bio { font-style: italic; font-weight: bold; }
                    
                    .tr { }
                    
                    .xr { }
                                        
                    .gramGrp { }
                    
                    .rm { font-style: normal; font-weight: normal; }

                </style>
            </head>
            <body>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="entry">
        <div class="entry">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="hom[pos='v']">
        <div class="hom verb">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="hom[pos='n']">
        <div class="hom noun">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="hom[pos='a']">
        <div class="hom adjective">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="hom">
        <div class="hom">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="sense">
        <div class="sense">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="form">
        <b class="form">
            <xsl:apply-templates/>
        </b>
    </xsl:template>

    <xsl:template match="w">
        <span id="{@id}">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="number">
        <b class="num">
            <xsl:apply-templates/>
        </b>
    </xsl:template>

    <xsl:template match="gramGrp">
        <span class="gramGrp">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="pos">
        <i class="pos">
            <xsl:choose>
                <xsl:when test=".='v'">verb</xsl:when>
                <xsl:when test=".='n'">noun</xsl:when>
                <xsl:when test=".='a'">adjective</xsl:when>
                <xsl:otherwise><xsl:apply-templates/></xsl:otherwise>
            </xsl:choose>
        </i>
    </xsl:template>

    <xsl:template match="pos[parent::xr]">
        <i><xsl:apply-templates/></i>
    </xsl:template>

    <xsl:template match="number[parent::xr]">
        <b><xsl:apply-templates/></b>
    </xsl:template>

    <xsl:template match="number[parent::form]">
        <sub><xsl:apply-templates/></sub>
    </xsl:template>

    <xsl:template match="number[parent::hw]">
        <sub><xsl:apply-templates/></sub>
    </xsl:template>

    <xsl:template match="bio">
        <span class="bio">
            <a>
                <xsl:attribute name="href">http://www.google.com/search?q=<xsl:value-of select="translate(., ' ', '+')"/></xsl:attribute>
                <xsl:apply-templates/>
            </a>
        </span>
    </xsl:template>

    <xsl:template match="note">
        <span class="note">[* <xsl:apply-templates/> *]</span>
    </xsl:template>

    <xsl:template match="tr">
        <span class="tr">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="xr">
        <span class="xr">
            <xsl:choose>
                <xsl:when test="@target">
                    <a class="search">
                        <xsl:attribute name="href">
                            <!-- TODO: hack to remove x and q encoding present in files. -->
                            <xsl:text>search:</xsl:text><xsl:value-of select="substring-after(translate(@target, 'xq1234567890', ''), '#')"/>
                        </xsl:attribute>
                        <xsl:apply-templates />
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates />
                </xsl:otherwise>
            </xsl:choose>
        </span>
    </xsl:template>

    <xsl:template match="eg">
        <div class="eg">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="q">
        <i><xsl:apply-templates/></i>
    </xsl:template>

    <xsl:template match="hw">
        <b><xsl:apply-templates/></b>
    </xsl:template>

    <xsl:template match="*">
        <xsl:copy>
            <xsl:apply-templates/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="pb"/>

    <xsl:template match="itype">
        <span class="itype">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="bx | formx">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>

    <xsl:template match="r">
        <span class="rm">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="ix">
        <i>
            <xsl:apply-templates/>
        </i>
    </xsl:template>

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
    
    
    <!-- Discard unwanted stuff -->

    <xsl:template match="TEI.2|text|body|trans|div1|sc|corr|head|foreign|back|divGen|sic">
        <xsl:apply-templates/>
    </xsl:template>

</xsl:stylesheet>
