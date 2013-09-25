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

    <xsl:template match="dictionary">
        <html>
            <head>
                <title>Dictionary of Cebuano Visayan</title>

                <style type="text/css">

                    body { font-size: <xsl:value-of select="$fontSize"/>pt; }

                    .form { font-size: 120%; }

                    .eg { font-size: 80%; color: gray; }
                    .eg i {  font-style: italic }

                    .pos { font-size: 120%; color: red; }

                    .num { font-weight: bold; color: blue; }

                    .itype { }

                    .bio { font-style: italic; font-weight: bold; }
                    .tr { background-color: #FFFFCC; }
                    .xr {  }
                    
                    .gramGrp {  }
                    .exp { color: grey; }

                    .rm { font-style: normal; font-weight: normal; }

                </style>
            </head>
            <body>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>

    <xsl:function name="local:get-page-url" as="xs:string">
        <xsl:param name="page" as="xs:string"/>
        <xsl:variable name="pageNumber" select="number($page)"/>

        <xsl:choose>
            <xsl:when test="$page = '537a'">
                <xsl:sequence select="'http://seapdatapapers.library.cornell.edu/cgi/t/text/pageviewer-idx?c=seap&amp;cc=seap&amp;idno=seap085b&amp;node=seap085b%3A11&amp;view=image&amp;seq=7&amp;size=200'"/>
            </xsl:when>
            <xsl:when test="$pageNumber &lt; 538">
                <xsl:sequence select="concat(concat(
                    'http://seapdatapapers.library.cornell.edu/cgi/t/text/pageviewer-idx?c=seap&amp;cc=seap&amp;idno=seap085a&amp;node=seap085a%3A11&amp;view=image&amp;seq=', 
                    $pageNumber + 24),
                    '&amp;size=200')"/>
            </xsl:when>
            <xsl:when test="$pageNumber &gt; 537">
                <xsl:sequence select="concat(concat(
                    'http://seapdatapapers.library.cornell.edu/cgi/t/text/pageviewer-idx?c=seap&amp;cc=seap&amp;idno=seap085b&amp;node=seap085b%3A11&amp;view=image&amp;seq=', 
                    $pageNumber - 530),
                    '&amp;size=200')"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text></xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:function>

    <xsl:template match="entry">
        <!-- 
            <xsl:if test="parent::dictionary">
                <div class="page-ref"><a href="{local:get-page-url(@page)}"><xsl:value-of select="@page"/></a></div>
            </xsl:if>
        -->
        <span class="entry">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="hom[pos='v']">
        <span class="hom verb">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="hom[pos='n']">
        <span class="hom noun">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="hom[pos='a']">
        <span class="hom adjective">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="hom">
        <span class="hom">
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="sense">
        <span class="sense">
            <xsl:apply-templates/>
        </span>
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
            <xsl:apply-templates/>
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
            <xsl:apply-templates/>
        </span>
    </xsl:template>

    <xsl:template match="eg">
        <span class="eg">
            <xsl:apply-templates/>
        </span>
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

    <xsl:template match="pb">
        <!-- 
        <span class="pb">
            <xsl:value-of select="@n"/>
        </span>
        -->
    </xsl:template>

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
    
    <!-- Discard unwanted stuff -->

    <xsl:template match="TEI.2|text|body|trans|div1|sc|corr|head|foreign|back|divGen|sic">
        <xsl:apply-templates/>
    </xsl:template>

</xsl:stylesheet>
