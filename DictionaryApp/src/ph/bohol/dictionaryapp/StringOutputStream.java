package ph.bohol.dictionaryapp;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
 
/**
 * StringOutputStream backed by ByteArrayOutputStream that simplifies  reading of {@link OutputStream}  directly into string
 * @author Grzegorz Bugaj
 *
 */
public class StringOutputStream extends OutputStream{
	private ByteArrayOutputStream buffer = new ByteArrayOutputStream();
	private static final Charset DEFAULT_CHARACTER_SET = Charset.forName("UTF-8");
	private Charset characterSet;
 
	@Override
	public void write(int b) throws IOException {
		buffer.write(b);
	}
 
	@Override
	public void write(byte[] b) throws IOException {
		buffer.write(b);
	}
 
	@Override
	public void write(byte[] b, int off, int len) throws IOException {
		buffer.write(b, off, len);
	}
 
	/**
	 * Get currently set character set if none set default charset of UTF-8 will be used
	 * @return Charaset 
	 */
	public Charset getCharacterSet() {
		if(characterSet == null)
			return DEFAULT_CHARACTER_SET;
 
		return characterSet;
	}
 
	public void setCharacterSet(Charset characterSet) {
		this.characterSet = characterSet;
	}
 
 
	@Override
	public String toString() {
		return new String(buffer.toByteArray(), getCharacterSet());
	}
}
