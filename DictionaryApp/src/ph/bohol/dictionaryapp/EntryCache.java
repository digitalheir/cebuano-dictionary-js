package ph.bohol.dictionaryapp;

import java.util.LinkedHashMap;

import android.text.Spanned;

@SuppressWarnings("serial")
public class EntryCache extends LinkedHashMap<Integer, Spanned>
{
    private static final float LOAD_FACTOR = 1.1f;
    private final int capacity;

    public EntryCache(final int newCapacity)
    {
        super(newCapacity + 1, LOAD_FACTOR, true);
        this.capacity = newCapacity;
    }

    @Override
    protected final boolean removeEldestEntry(final Entry<Integer, Spanned> eldest)
    {
        return size() > capacity;
    }
}
