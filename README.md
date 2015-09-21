# README #

The dictionary app is an easy to use, fast, off-line UI on a single dictionary. Entries can be presented in various ways to look like either a traditional dictionary entry, or using a more structured modern view.

### What is this repository for? ###

This repository contains the source code for the Cebuano Dictionary app by Jeroen Hellingman.

It contains everything to be able to rebuild the dictionary app, except for the dictionary data itself, which can be found 
on GitHub.

### How do I get set up? ###

* Download Android Studio (http://developer.android.com/sdk/index.html)
* Download an Android Emulator; Genymotion is great (https://www.genymotion.com/#!/)
* Set up your own keystore for signing your own builds (That is not shared for obvious reasons)

For rebuilding the dictionary database itself, you'll need to

* Get the dictionary data from https://github.com/jhellingman/phildict/tree/master/Data/Wolff
* Get a working perl configuration (on windows, for example: http://strawberryperl.com/)
* Get sqlite3 (http://www.sqlite.org/)
* Perl scripts are included there that build the compressed resource included in the dictionary app.

Note that if you follow the database structure, it will be fairly easy to load other dictionaries into this app; however, some code changes will be needed. I will be happy to assist in doing this, and am working on further public domain dictionary databases to be converted into an app.

### Contribution guidelines ###

If you wish to use this app for your own dictionary, feel tree to go ahead.

For working effectively with this app, you need to

* Understand the Android App Structure and APIs
* Understand using sqlite3 and SQL queries
* Understand XML and XSLT transformations (for presenting the dictionary data on screen).

If you have your dictionary data in some form of XML, and wish to publish it as an off-line app for Android, we can work together to massage the data for use with this app, and branch and adjust code where necessary to support the peculiarities of your data and the languages it is in. I will feel happy to contribute my time freely if the dictionary data is significant and open source.

If you can help writing automated UI tests, your help and knowledge will be most appreciated.

* Writing tests
* Code review
* Other guidelines

### Open Issues ###

* Automatic stripping of affixes is still under development
* Data is based on John U. Wolff's Cebuano dictionary, which dates from 1972. This is the most recent Cebuano dictionary source freely available.

### Who do I talk to? ###

* Repo owner or admin: Jeroen Hellingman, jeroen@bohol.ph