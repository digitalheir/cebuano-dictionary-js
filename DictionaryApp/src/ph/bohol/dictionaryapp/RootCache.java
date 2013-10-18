package ph.bohol.dictionaryapp;

import java.util.LinkedHashMap;

@SuppressWarnings("serial")
public class RootCache extends LinkedHashMap<String, Boolean>
{	
	private final int capacity;

	public RootCache(final int newCapacity)
	{
		super(newCapacity + 1, 1.1f, true);
		this.capacity = newCapacity;
	}

	@Override
	protected boolean removeEldestEntry(final Entry<String, Boolean> eldest)
	{
		return size() > capacity;
	}
}