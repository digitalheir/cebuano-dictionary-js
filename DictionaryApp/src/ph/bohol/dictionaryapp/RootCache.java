package ph.bohol.dictionaryapp;

import java.util.LinkedHashMap;

@SuppressWarnings("serial")
public class RootCache extends LinkedHashMap<String, Boolean>
{	
	private final int capacity;

	public RootCache(int capacity)
	{
		super(capacity + 1, 1.1f, true);
		this.capacity = capacity;
	}

	@Override
	protected boolean removeEldestEntry(Entry<String, Boolean> eldest)
	{
		return size() > capacity;
	}
}