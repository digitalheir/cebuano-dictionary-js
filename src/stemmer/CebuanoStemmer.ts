import {Stemmer} from "./Stemmer";

export const stemmer: Stemmer = {
    "language": "ceb",
    "compiled": true,
    "constants": {
        "letter": "[a-z]",
        "vowel": "[aeiou]",
        "consonant": "[bcdfghjklmnpqrstvwxyz]"
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
                },
                {
                    "form": "-y",
                    "label": "Y",
                    "patterns": [
                        {
                            "pattern": "({letter}+)y",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)y$"
                        }
                    ]
                },
                {
                    "form": "-yng",
                    "label": "Y NGA",
                    "patterns": [
                        {
                            "pattern": "({letter}+)yng",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)yng$"
                        }
                    ]
                }
            ]
        },
        {
            "name": "declensions",
            "affixes": [
                {
                    "form": "ga-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "ga({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ga([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gi-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "gi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "i-",
                    "label": "INST.PAS",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "i({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^i([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ig-",
                    "label": "TODO",
                    "rootType": "vn",
                    "patterns": [
                        {
                            "pattern": "ig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ig([a-z]+)$"
                        },
                        {
                            "pattern": "ig-({vowel}{letter}*)",
                            "root": "$1",
                            "compiledPattern": "^ig-([aeiou][a-z]*)$"
                        }
                    ]
                },
                {
                    "form": "iga-",
                    "label": "REL",
                    "rootType": "vna",
                    "patterns": [
                        {
                            "pattern": "iga({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^iga([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ma-",
                    "label": "FUT.AF",
                    "rootType": "vna",
                    "patterns": [
                        {
                            "pattern": "ma({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ma([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "mi-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "mi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^mi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "mu-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "mu({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^mu([a-z]+)$"
                        }
                    ]
                },
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
                    "form": "mag-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "mag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^mag([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "maN-",
                    "label": "PLUR",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "mam({letter}+)",
                            "root": "b$1",
                            "compiledPattern": "^mam([a-z]+)$"
                        },
                        {
                            "pattern": "man({letter}+)",
                            "root": "d$1",
                            "compiledPattern": "^man([a-z]+)$"
                        },
                        {
                            "pattern": "man({letter}+)",
                            "root": "s$1",
                            "compiledPattern": "^man([a-z]+)$"
                        },
                        {
                            "pattern": "man({letter}+)",
                            "root": "t$1",
                            "compiledPattern": "^man([a-z]+)$"
                        },
                        {
                            "pattern": "mang({letter}+)",
                            "root": "k$1",
                            "compiledPattern": "^mang([a-z]+)$"
                        },
                        {
                            "pattern": "mang({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^mang([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "na-",
                    "label": "PP.AF",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "na({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^na([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "naka-",
                    "label": "PP.POT",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "naka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^naka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nag-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "nag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nag([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ni-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "ni({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ni([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "naN-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "nam({letter}+)",
                            "root": "b$1",
                            "compiledPattern": "^nam([a-z]+)$"
                        },
                        {
                            "pattern": "nan({letter}+)",
                            "root": "d$1",
                            "compiledPattern": "^nan([a-z]+)$"
                        },
                        {
                            "pattern": "nan({letter}+)",
                            "root": "s$1",
                            "compiledPattern": "^nan([a-z]+)$"
                        },
                        {
                            "pattern": "nan({letter}+)",
                            "root": "t$1",
                            "compiledPattern": "^nan([a-z]+)$"
                        },
                        {
                            "pattern": "nang({letter}+)",
                            "root": "k$1",
                            "compiledPattern": "^nang([a-z]+)$"
                        },
                        {
                            "pattern": "nang({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nang([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "pag-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "pag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^pag([a-z]+)$"
                        },
                        {
                            "pattern": "pag-({vowel}{letter}*)",
                            "root": "$1",
                            "compiledPattern": "^pag-([aeiou][a-z]*)$"
                        }
                    ]
                },
                {
                    "form": "-um-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({consonant}?)um({letter}+)",
                            "root": "$1$2",
                            "compiledPattern": "^([bcdfghjklmnpqrstvwxyz]?)um([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "-a",
                    "label": "SPEC",
                    "patterns": [
                        {
                            "pattern": "({letter}+)ra",
                            "root": "$1d",
                            "compiledPattern": "^([a-z]+)ra$"
                        },
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
                },
                {
                    "form": "-an",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)ran",
                            "root": "$1d",
                            "compiledPattern": "^([a-z]+)ran$"
                        },
                        {
                            "pattern": "({letter}+{vowel})han",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])han$"
                        },
                        {
                            "pattern": "({letter}+)an",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)an$"
                        }
                    ]
                },
                {
                    "form": "-i",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)ri",
                            "root": "$1d",
                            "compiledPattern": "^([a-z]+)ri$"
                        },
                        {
                            "pattern": "({letter}+{vowel})hi",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])hi$"
                        },
                        {
                            "pattern": "({letter}+)i",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)i$"
                        }
                    ]
                },
                {
                    "form": "-un",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)run",
                            "root": "$1d",
                            "compiledPattern": "^([a-z]+)run$"
                        },
                        {
                            "pattern": "({letter}+{vowel})hun",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])hun$"
                        },
                        {
                            "pattern": "({letter}+)un",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)un$"
                        }
                    ]
                }
            ]
        },
        {
            "name": "wordformation",
            "affixes": [
                {
                    "form": "gai-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "gai({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gai([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gaipa-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "gaipa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gaipa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gaka-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "gaka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gaka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gapa-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "gapa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gapa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gapan-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "gapan({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gapan([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gapang-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "gapang({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gapang([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gihi-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "gihi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gihi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gika-",
                    "label": "PAS.PERF",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "gika({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gika([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gikahi-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gikahi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gikahi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gikapa-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gikapa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gikapa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gim-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gim({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gim([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gin-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gin({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gin([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gina-",
                    "label": "PAS.PERF",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "gina({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gina([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ginapa-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "ginapa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ginapa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ginapag-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "ginapag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ginapag([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ginapaha-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "ginapaha({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ginapaha([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ginapaka-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "ginapaka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ginapaka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ginapang-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "ginapang({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ginapang([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ginapanghi-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "ginapanghi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ginapanghi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ging-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "ging({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ging([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipa-",
                    "label": "PAS.PERF",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "gipa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipaha-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gipaha({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipaha([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipahi-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gipahi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipahi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipaka-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gipaka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipaka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipaki-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gipaki({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipaki([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipakig-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gipakig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipakig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipan-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gipan({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipan([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipanag-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gipanag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipanag([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipang-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gipang({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipang([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipanghi-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gipanghi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipanghi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipanig-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gipanig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipanig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "gipatig-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "gipatig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^gipatig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ha-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "ha({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ha([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "hi-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "hi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^hi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "hika-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "hika({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^hika([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "hima-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "hima({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^hima([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "hinga-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "hinga({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^hinga([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "hipang-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "hipang({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^hipang([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "hingka-",
                    "label": "PAS.PERF",
                    "patterns": [
                        {
                            "pattern": "hingka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^hingka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "hiN-",
                    "label": "FONDNESS",
                    "rootType": "vn",
                    "patterns": [
                        {
                            "pattern": "him({letter}+)",
                            "root": "b$1",
                            "compiledPattern": "^him([a-z]+)$"
                        },
                        {
                            "pattern": "hin({letter}+)",
                            "root": "d$1",
                            "compiledPattern": "^hin([a-z]+)$"
                        },
                        {
                            "pattern": "hin({letter}+)",
                            "root": "s$1",
                            "compiledPattern": "^hin([a-z]+)$"
                        },
                        {
                            "pattern": "hin({letter}+)",
                            "root": "t$1",
                            "compiledPattern": "^hin([a-z]+)$"
                        },
                        {
                            "pattern": "hing({letter}+)",
                            "root": "k$1",
                            "compiledPattern": "^hing([a-z]+)$"
                        },
                        {
                            "pattern": "hing({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^hing([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igaha-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "igaha({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igaha([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igaka-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "igaka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igaka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igapa-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "igapa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igapa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igapaha-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "igapaha({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igapaha([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igapahi-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "igapahi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igapahi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igapaka-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "igapaka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igapaka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igapang-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "igapang({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igapang([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igapasi-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "igapasi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igapasi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igka-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "igka-({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igka-([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igkasi-",
                    "label": "REL",
                    "patterns": [
                        {
                            "pattern": "igkasi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igkasi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igpa-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "igpa-({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igpa-([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "igpang-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "igpang-({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^igpang-([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ihi-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ihi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ihi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ika-",
                    "label": "ORD.NUM",
                    "rootType": "va",
                    "patterns": [
                        {
                            "pattern": "ika({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ika([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ikag-",
                    "label": "ORD.NUM",
                    "rootType": "va",
                    "patterns": [
                        {
                            "pattern": "ikag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ikag([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ikahi-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ikahi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ikahi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ikapa-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ikapa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ikapa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ikapakama-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ikapakama-({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ikapakama-([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ikapang-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ikapang({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ikapang([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ikapanig-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ikapanig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ikapanig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ikapasig-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ikapasig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ikapasig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipa-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "ipa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipaha-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipaha({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipaha([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipahi-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipahi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipahi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipaka-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipaka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipaka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipaki-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipaki({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipaki([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipakig-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipakig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipakig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipam-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipam({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipam([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipampa-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipampa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipampa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipang-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipang({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipang([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipanghi-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipanghi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipanghi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipanig-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipanig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipanig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipasig-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipasig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipasig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ipatig-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ipatig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ipatig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "isig-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "isig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^isig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "isigka-",
                    "label": "TODO",
                    "rootType": "n",
                    "patterns": [
                        {
                            "pattern": "isigka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^isigka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "itag-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "itag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^itag([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "inig-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "inig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^inig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "inigka-",
                    "label": "TODO",
                    "rootType": "va",
                    "patterns": [
                        {
                            "pattern": "inigka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^inigka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ka-",
                    "label": "FUT.POT",
                    "rootType": "nva",
                    "patterns": [
                        {
                            "pattern": "ka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "katagi-",
                    "label": "COM.PLACE",
                    "rootType": "n",
                    "patterns": [
                        {
                            "pattern": "katagi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^katagi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "makapa-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "makapa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^makapa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "maki-",
                    "label": "TODO",
                    "rootType": "vna",
                    "patterns": [
                        {
                            "pattern": "maki({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^maki([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "makig-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "makig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^makig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "magka-",
                    "label": "TODO",
                    "rootType": "av",
                    "patterns": [
                        {
                            "pattern": "magka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^magka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "magpa-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "magpa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^magpa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "magpaka-",
                    "label": "TODO",
                    "rootType": "n",
                    "patterns": [
                        {
                            "pattern": "magpaka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^magpaka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "magpaki-",
                    "label": "TODO",
                    "rootType": "n",
                    "patterns": [
                        {
                            "pattern": "magpaki({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^magpaki([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "maha-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "maha({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^maha([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "mahi-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "mahi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^mahi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "manag-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "manag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^manag([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "manga-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "manga({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^manga([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "mapa-",
                    "label": "TODO",
                    "rootType": "n",
                    "patterns": [
                        {
                            "pattern": "mapa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^mapa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "masig-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "masig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^masig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "masigka-",
                    "label": "TODO",
                    "rootType": "n",
                    "patterns": [
                        {
                            "pattern": "masigka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^masigka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "makipaN-",
                    "label": "PLUR",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "makipam({letter}+)",
                            "root": "b$1",
                            "compiledPattern": "^makipam([a-z]+)$"
                        },
                        {
                            "pattern": "makipan({letter}+)",
                            "root": "d$1",
                            "compiledPattern": "^makipan([a-z]+)$"
                        },
                        {
                            "pattern": "makipan({letter}+)",
                            "root": "s$1",
                            "compiledPattern": "^makipan([a-z]+)$"
                        },
                        {
                            "pattern": "makipan({letter}+)",
                            "root": "t$1",
                            "compiledPattern": "^makipan([a-z]+)$"
                        },
                        {
                            "pattern": "makipang({letter}+)",
                            "root": "k$1",
                            "compiledPattern": "^makipang([a-z]+)$"
                        },
                        {
                            "pattern": "makipang({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^makipang([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nakag-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "nakag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nakag([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nakig-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "nakig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nakig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nakapa-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "nakapa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nakapa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nagka-",
                    "label": "TODO",
                    "rootType": "av",
                    "patterns": [
                        {
                            "pattern": "nagka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nagka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nagpa-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "nagpa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nagpa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nagpaka-",
                    "label": "TODO",
                    "rootType": "anv",
                    "patterns": [
                        {
                            "pattern": "nagpaka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nagpaka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nagpaki-",
                    "label": "TODO",
                    "rootType": "anv",
                    "patterns": [
                        {
                            "pattern": "nagpaki({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nagpaki([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nagpasi-",
                    "label": "TODO",
                    "rootType": "anv",
                    "patterns": [
                        {
                            "pattern": "nagpasi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nagpasi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "naha-",
                    "label": "TODO",
                    "rootType": "anv",
                    "patterns": [
                        {
                            "pattern": "naha({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^naha([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nahag-",
                    "label": "TODO",
                    "rootType": "anv",
                    "patterns": [
                        {
                            "pattern": "nahag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nahag([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nahi-",
                    "label": "TODO",
                    "rootType": "anv",
                    "patterns": [
                        {
                            "pattern": "nahi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nahi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nahig-",
                    "label": "TODO",
                    "rootType": "anv",
                    "patterns": [
                        {
                            "pattern": "nahig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nahig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nanag-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "nanag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nanag([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nanga-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "nanga({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nanga([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "nasig-",
                    "label": "TODO",
                    "rootType": "v",
                    "patterns": [
                        {
                            "pattern": "nasig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^nasig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "pa-",
                    "label": "TODO",
                    "rootType": "nv",
                    "patterns": [
                        {
                            "pattern": "pa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^pa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "paka-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "paka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^paka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "paki-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "paki({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^paki([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "pakih-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "pakig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^pakig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "pagka-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "pagka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^pagka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "pagpa-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "pagpa({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^pagpa([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "pagpaka-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "pagpaka({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^pagpaka([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "pala-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "pala({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^pala([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "panga-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "panga({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^panga([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "pasi-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "pasi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^pasi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "paN-",
                    "label": "CAUSATIVE",
                    "patterns": [
                        {
                            "pattern": "pam({letter}+)",
                            "root": "b$1",
                            "compiledPattern": "^pam([a-z]+)$"
                        },
                        {
                            "pattern": "pan({letter}+)",
                            "root": "d$1",
                            "compiledPattern": "^pan([a-z]+)$"
                        },
                        {
                            "pattern": "pan({letter}+)",
                            "root": "s$1",
                            "compiledPattern": "^pan([a-z]+)$"
                        },
                        {
                            "pattern": "pan({letter}+)",
                            "root": "t$1",
                            "compiledPattern": "^pan([a-z]+)$"
                        },
                        {
                            "pattern": "pang({letter}+)",
                            "root": "k$1",
                            "compiledPattern": "^pang([a-z]+)$"
                        },
                        {
                            "pattern": "pang({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^pang([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "tag-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "tag({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^tag([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "taga-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "taga({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^taga([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "tagi-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "tagi({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^tagi([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "tali-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "tali({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^tali([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "tig-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "tig({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^tig([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "ting-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ting({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^ting([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "uma-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "uma({letter}+)",
                            "root": "$1",
                            "compiledPattern": "^uma([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "-in-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({consonant}?)in({letter}+)",
                            "root": "$1$2",
                            "compiledPattern": "^([bcdfghjklmnpqrstvwxyz]?)in([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "-il-",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({consonant}?)il({letter}+)",
                            "root": "$1$2",
                            "compiledPattern": "^([bcdfghjklmnpqrstvwxyz]?)il([a-z]+)$"
                        }
                    ]
                },
                {
                    "form": "-anan",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)ranan",
                            "root": "$1d",
                            "compiledPattern": "^([a-z]+)ranan$"
                        },
                        {
                            "pattern": "({letter}+{vowel})hanan",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])hanan$"
                        },
                        {
                            "pattern": "({letter}+)anan",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)anan$"
                        }
                    ]
                },
                {
                    "form": "-anang",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)ranang",
                            "root": "$1d",
                            "compiledPattern": "^([a-z]+)ranang$"
                        },
                        {
                            "pattern": "({letter}+{vowel})hanang",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])hanang$"
                        },
                        {
                            "pattern": "({letter}+)anang",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)anang$"
                        }
                    ]
                },
                {
                    "form": "-anay",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)ranay",
                            "root": "$1d",
                            "compiledPattern": "^([a-z]+)ranay$"
                        },
                        {
                            "pattern": "({letter}+{vowel})hanay",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])hanay$"
                        },
                        {
                            "pattern": "({letter}+)anay",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)anay$"
                        }
                    ]
                },
                {
                    "form": "-anun",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)ranun",
                            "root": "$1d",
                            "compiledPattern": "^([a-z]+)ranun$"
                        },
                        {
                            "pattern": "({letter}+{vowel})hanun",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])hanun$"
                        },
                        {
                            "pattern": "({letter}+)anun",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)anun$"
                        }
                    ]
                },
                {
                    "form": "-ay",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)ray",
                            "root": "$1d",
                            "compiledPattern": "^([a-z]+)ray$"
                        },
                        {
                            "pattern": "({letter}+{vowel})hay",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])hay$"
                        },
                        {
                            "pattern": "({letter}+)ay",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)ay$"
                        }
                    ]
                },
                {
                    "form": "-ayg",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)rayg",
                            "root": "$1d",
                            "compiledPattern": "^([a-z]+)rayg$"
                        },
                        {
                            "pattern": "({letter}+{vowel})hayg",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])hayg$"
                        },
                        {
                            "pattern": "({letter}+)ayg",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)ayg$"
                        }
                    ]
                },
                {
                    "form": "-du",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)du",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)du$"
                        }
                    ]
                },
                {
                    "form": "-dur",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)dur",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)dur$"
                        }
                    ]
                },
                {
                    "form": "-g",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)g",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)g$"
                        }
                    ]
                },
                {
                    "form": "-ira",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+{vowel})hira",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])hira$"
                        },
                        {
                            "pattern": "({letter}+)ira",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)ira$"
                        }
                    ]
                },
                {
                    "form": "-iru",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+{vowel})hiru",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])hiru$"
                        },
                        {
                            "pattern": "({letter}+)iru",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)iru$"
                        }
                    ]
                },
                {
                    "form": "-nun",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)nun",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)nun$"
                        }
                    ]
                },
                {
                    "form": "-unun",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "({letter}+)runun",
                            "root": "$1d",
                            "compiledPattern": "^([a-z]+)runun$"
                        },
                        {
                            "pattern": "({letter}+{vowel})hunun",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+[aeiou])hunun$"
                        },
                        {
                            "pattern": "({letter}+)unun",
                            "root": "$1",
                            "compiledPattern": "^([a-z]+)unun$"
                        }
                    ]
                },
                {
                    "form": "ka-an",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ka({letter}+)ran",
                            "root": "$1d",
                            "compiledPattern": "^ka([a-z]+)ran$"
                        },
                        {
                            "pattern": "ka({letter}+{vowel})han",
                            "root": "$1",
                            "compiledPattern": "^ka([a-z]+[aeiou])han$"
                        },
                        {
                            "pattern": "ka({letter}+)an",
                            "root": "$1",
                            "compiledPattern": "^ka([a-z]+)an$"
                        }
                    ]
                },
                {
                    "form": "ka-un",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ka({letter}+)run",
                            "root": "$1d",
                            "compiledPattern": "^ka([a-z]+)run$"
                        },
                        {
                            "pattern": "ka({letter}+{vowel})hun",
                            "root": "$1",
                            "compiledPattern": "^ka([a-z]+[aeiou])hun$"
                        },
                        {
                            "pattern": "ka({letter}+)un",
                            "root": "$1",
                            "compiledPattern": "^ka([a-z]+)un$"
                        }
                    ]
                },
                {
                    "form": "hi-an",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "hi({letter}+)ran",
                            "root": "$1d",
                            "compiledPattern": "^hi([a-z]+)ran$"
                        },
                        {
                            "pattern": "hi({letter}+{vowel})han",
                            "root": "$1",
                            "compiledPattern": "^hi([a-z]+[aeiou])han$"
                        },
                        {
                            "pattern": "hi({letter}+)an",
                            "root": "$1",
                            "compiledPattern": "^hi([a-z]+)an$"
                        }
                    ]
                },
                {
                    "form": "hi-un",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "hi({letter}+)run",
                            "root": "$1d",
                            "compiledPattern": "^hi([a-z]+)run$"
                        },
                        {
                            "pattern": "hi({letter}+{vowel})hun",
                            "root": "$1",
                            "compiledPattern": "^hi([a-z]+[aeiou])hun$"
                        },
                        {
                            "pattern": "hi({letter}+)un",
                            "root": "$1",
                            "compiledPattern": "^hi([a-z]+)un$"
                        }
                    ]
                },
                {
                    "form": "ma-un",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "ma({letter}+)run",
                            "root": "$1d",
                            "compiledPattern": "^ma([a-z]+)run$"
                        },
                        {
                            "pattern": "ma({letter}+{vowel})hun",
                            "root": "$1",
                            "compiledPattern": "^ma([a-z]+[aeiou])hun$"
                        },
                        {
                            "pattern": "ma({letter}+)un",
                            "root": "$1",
                            "compiledPattern": "^ma([a-z]+)un$"
                        }
                    ]
                },
                {
                    "form": "mag-ay",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "mag({letter}+)ray",
                            "root": "$1d",
                            "compiledPattern": "^mag([a-z]+)ray$"
                        },
                        {
                            "pattern": "mag({letter}+{vowel})hay",
                            "root": "$1",
                            "compiledPattern": "^mag([a-z]+[aeiou])hay$"
                        },
                        {
                            "pattern": "mag({letter}+)ay",
                            "root": "$1",
                            "compiledPattern": "^mag([a-z]+)ay$"
                        }
                    ]
                },
                {
                    "form": "pag-a",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "pag({letter}+)ra",
                            "root": "$1d",
                            "compiledPattern": "^pag([a-z]+)ra$"
                        },
                        {
                            "pattern": "pag({letter}+{vowel})ha",
                            "root": "$1",
                            "compiledPattern": "^pag([a-z]+[aeiou])ha$"
                        },
                        {
                            "pattern": "pag({letter}+)a",
                            "root": "$1",
                            "compiledPattern": "^pag([a-z]+)a$"
                        }
                    ]
                },
                {
                    "form": "paga-an",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "paga({letter}+)ran",
                            "root": "$1d",
                            "compiledPattern": "^paga([a-z]+)ran$"
                        },
                        {
                            "pattern": "paga({letter}+{vowel})han",
                            "root": "$1",
                            "compiledPattern": "^paga([a-z]+[aeiou])han$"
                        },
                        {
                            "pattern": "paga({letter}+)an",
                            "root": "$1",
                            "compiledPattern": "^paga([a-z]+)an$"
                        }
                    ]
                },
                {
                    "form": "paga-un",
                    "label": "TODO",
                    "patterns": [
                        {
                            "pattern": "paga({letter}+)run",
                            "root": "$1d",
                            "compiledPattern": "^paga([a-z]+)run$"
                        },
                        {
                            "pattern": "paga({letter}+{vowel})hun",
                            "root": "$1",
                            "compiledPattern": "^paga([a-z]+[aeiou])hun$"
                        },
                        {
                            "pattern": "paga({letter}+)un",
                            "root": "$1",
                            "compiledPattern": "^paga([a-z]+)un$"
                        }
                    ]
                }
            ]
        }
    ]
};