import {Stemmer} from "./Stemmer";
const stemmer: Stemmer = {
    "language": "ceb",
    "compiled": true,
    "constants": {
        "letter": "[a-z]",
        "vowel": "[aeiou]"
    },
    "groups": [
        {
            "name": "linkers",
            "affixes": [
                {
                    "form": "-ng",
                    "label": "NGA",
                    "patterns": [
                        {
                            "pattern": "({letter}+)ng",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)ng$"
                        },
                        {
                            "pattern": "({letter}+)ng",
                            "root": "$1n",
                            "compiledPattern": "^([a-z]+)ng$"
                        }
                    ]
                }
            ]
        },
        {
            "name": "declensions",
            "affixes": [
                {
                    "form": "maka-",
                    "label": "FUT.POT",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "maka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^maka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "naka-",
                    "label": "PP.POT",
                    "patterns": [
                        {
                            "pattern": "naka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^naka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ma-",
                    "label": "FUT.AF",
                    "patterns": [
                        {
                            "pattern": "ma({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ma([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ka-",
                    "label": "FUT.POT",
                    "patterns": [
                        {
                            "pattern": "ka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "-a",
                    "label": "SPEC",
                    "patterns": [
                        {
                            "pattern": "({letter}+{vowel})ha",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])ha$"
                        },
                        {
                            "pattern": "({letter}+)a",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)a$"
                        }
                    ]
                }
            ]
        }
    ]
};
export default stemmer;