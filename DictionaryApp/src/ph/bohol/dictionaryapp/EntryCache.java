package ph.bohol.dictionaryapp;

import java.util.LinkedHashMap;

import android.text.Spanned;

@SuppressWarnings("serial")
public class EntryCache extends LinkedHashMap<Integer, Spanned>
{	
	private final int capacity;

	public EntryCache(final int newCapacity)
	{
		super(newCapacity + 1, 1.1f, true);
		this.capacity = newCapacity;
	}

	@Override
	protected boolean removeEldestEntry(final Entry<Integer, Spanned> eldest)
	{
		return size() > capacity;
	}
}