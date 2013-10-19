package ph.bohol.util.stemmer;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.HashMap;

import org.junit.Test;

public class AffixTest extends Affix
{
    @Test
    public final void testApply()
    {
        Affix a = createTestAffix();

        assertTrue(a.applies("makasabot"));
        assertFalse(a.applies("nakasabot"));
    }

    @Test
    public final void testToString()
    {
        Affix a = createTestAffix();

        String test = a.toString();
    }

    private Affix createTestAffix()
    {
        Affix a = new Affix();
        a.setForm("maka-");
        a.setLabel("FUT.POT");
        a.addPattern(new AffixPattern("maka([a-z]+)", "$1"));

        a.compile(new HashMap<String, String>());
        return a;
    }
}
