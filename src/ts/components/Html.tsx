import * as React from "react";
import {StatelessComponent} from "react";

export const Html: StatelessComponent<{ word?: string }> = ({word}) => {
    // <!--<link rel="apple-touch-icon" href="apple-touch-icon.png">-->
    return <html lang="en ceb">
    <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        <title>{`${word ? word + " — " : ""}Cebuano dictionary and stemmer` }</title>

        <meta name="description" content="Dictionary and stemmer for the Cebuano language spoken in the Philippines"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>


        <link rel="stylesheet" href="css/normalize.css"/>
        <link rel="stylesheet" href="css/main.css"/>
        <link rel="stylesheet" href="css/material-components-web.css"/>
        <link rel="stylesheet" href="css/app.css"/>
    </head>
    <body>
    <div
        dangerouslySetInnerHTML={{__html: `<!--[if lt IE 8]><p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p><![endif]-->`}}/>
    <h1>Cebuano dictionary </h1>

    <a href="https://github.com/digitalheir/cebuano-dictionary-js/"><img
        style={{position: "absolute", top: "0px", right: "0px", border: "0px"}}
        src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
        alt="Fork me on GitHub"
        data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"/></a>

    <div id="mount-point"/>

    <script src="js/app.js"/>
    </body>
    </html>;
};

// <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
// <!--<script>-->
// <!--(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=-->
// <!--function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;-->
// <!--e=o.createElement(i);r=o.getElementsByTagName(i)[0];-->
// <!--e.src='https://www.google-analytics.com/analytics.js';-->
// <!--r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));-->
// <!--ga('create','UA-XXXXX-X','auto');ga('send','pageview');-->
// <!--</script>-->
