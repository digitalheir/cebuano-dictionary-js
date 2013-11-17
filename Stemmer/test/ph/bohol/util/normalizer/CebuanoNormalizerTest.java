package ph.bohol.util.normalizer;


import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class CebuanoNormalizerTest
{
    @Test
    public final void test()
    {
        CebuanoNormalizer n = new CebuanoNormalizer();

        // Wolff's spelling
        assertEquals("makasabut", n.normalize("makasabot"));

        // Capitals
        assertEquals("makasabut", n.normalize("MAKASABOT"));

        // Accents
        assertEquals("makasabut", n.normalize("Mákàsãböt"));

        // Old spelling forms
        assertEquals("kinahanglan", n.normalize("Quinahanglan"));
    }
}
