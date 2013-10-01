package ph.bohol.dictionaryapp;

import java.util.LinkedHashMap;

import android.text.Spanned;

@SuppressWarnings("serial")
public class EntryCache extends LinkedHashMap<Integer, Spanned>
{	
	private final int capacity;

	public EntryCache(int capacity)
	{
		super(capacity + 1, 1.1f, true);
		this.capacity = capacity;
	}

	@Override
	protected boolean removeEldestEntry(Entry<Integer, Spanned> eldest)
	{
		return size() > capacity;
	}
}