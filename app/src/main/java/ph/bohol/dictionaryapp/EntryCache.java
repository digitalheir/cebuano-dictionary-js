package ph.bohol.dictionaryapp;

import android.text.Spanned;

import java.util.LinkedHashMap;

@SuppressWarnings("serial")
class EntryCache extends LinkedHashMap<Integer, Spanned> {
    private static final float LOAD_FACTOR = 1.1f;
    private final int capacity;

    public EntryCache(final int newCapacity) {
        super(newCapacity + 1, LOAD_FACTOR, true);
        this.capacity = newCapacity;
    }

    @Override
    protected final boolean removeEldestEntry(final Entry<Integer, Spanned> eldest) {
        return size() > capacity;
    }
}
