package ph.bohol.util.stemmer;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class AffixPattern {
    private String pattern;
    private String root;
    private String compiledPattern;

    public AffixPattern() {

    }

    public AffixPattern(final String newPattern, final String newRoot) {
        this.setPattern(newPattern);
        this.setRoot(newRoot);
    }

    public final boolean applies(final String word) {
        return word.matches(compiledPattern);
    }

    public final String strip(final String word) {
        if (word.matches(compiledPattern)) {
            return word.replaceAll(compiledPattern, root);
        } else {
            return null;
        }
    }

    public final String getPattern() {
        return pattern;
    }

    public final void setPattern(final String newPattern) {
        this.pattern = newPattern;
    }

    final String getRoot() {
        return root;
    }

    public final void setRoot(final String newRoot) {
        this.root = newRoot;
    }

    public final String toString() {
        return "<pattern pattern='" + pattern + "' root='" + root + "'/>\n";
    }

    final void compile(final Map<String, String> constants) {
        // Replace constants given as "...{key}..." in pattern.
        Pattern constantPattern = Pattern.compile("\\{(\\w+)\\}");
        Matcher matcher = constantPattern.matcher(pattern);

        int position = 0;
        String result = "";
        while (matcher.find()) {
            result += pattern.substring(position, matcher.start());
            result += constants.get(matcher.group(1));
            position = matcher.end();
        }
        result += pattern.substring(position);

        compiledPattern = result;
    }
}
