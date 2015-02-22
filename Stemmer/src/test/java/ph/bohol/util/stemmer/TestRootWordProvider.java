package ph.bohol.util.stemmer;

public class TestRootWordProvider implements RootWordProvider {
    private int calls = 0;

    @Override
    public final boolean isRootWord(final String word) {
        calls++;
        return
                word.equals("sabut")
                        || word.equals("balay")
                        || word.equals("kaun")
                        || word.equals("bisaya")
                        || word.equals("abut");
    }

    @Override
    public final boolean isRootWordWithType(final String word, final String type) {
        return (word.equals("sabut") && type.equals("v")) || (word.equals("balay") && type.equals("n"));
    }

    final int getCalls() {
        return calls;
    }
}
