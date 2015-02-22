package ph.bohol.dictionaryapp;

import java.util.LinkedHashMap;

@SuppressWarnings("serial")
class RootCache extends LinkedHashMap<String, Boolean> {
    private static final float LOAD_FACTOR = 1.1f;
    private final int capacity;

    public RootCache(final int newCapacity) {
        super(newCapacity + 1, LOAD_FACTOR, true);
        this.capacity = newCapacity;
    }

    @Override
    protected final boolean removeEldestEntry(final Entry<String, Boolean> eldest) {
        return size() > capacity;
    }
}
