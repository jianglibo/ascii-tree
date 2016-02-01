# Ascii Tree

convert indented line block to an ascii directory tree.[中文](README_ZH.md)

[API](https://jianglibo.github.com/ascii-tree/docs)

## sync

convert one tree.
```javascript
  var tree = new AsciiTree(BytesLine.getArray("hello")).convert();
  assert.equal("└── hello", tree.toString());
  // or use builder helper.
  var tree = new AsciiTreeBuilder().withContent("hello").withEncode("UTF-8").build().convert();
  assert.equal("└── hello", tree.toString());

  tree.toBufferArray();
  tree.toStringArray();
  tree.toString();
```

convert mutilple blocks in a file. block is surround by startTag and endTag, which can be a string or a regex. prepend will be the first line of block result, append will be last line or result.

```
{% asciitree %}
app
-main.js
-helper.js
-others
--Brocfile.js
package.json
{% endasciitree %}
```

```javascript
  var convertor = new Convertor(string, /^{%\s+asciitree\s+%}$/, "{% endasciitree %}", '<pre>', '</pre>').convert();
  //or use builder helper.

  var convertorBuilder = new ConvertorBuilder()
    .withContent(string)
    .withStartTag("{% asciitree %}")
    .withEndTag("{% endasciitree %}")
    .withPrepend("<pre>")
    .withAppend("</pre>");

  var convertor = convertorBuilder.build().convert();
  convertor.toStringArray();
  convertor.toBufferArray();
  convertor.toString();
```
results:

```
<pre>
├── app
|   ├── main.js
|   ├── helper.js
|   └── others
|       └── Brocfile.js
└── package.json
</pre>
```


in:
```
app
-main.js
-helper.js
-others
--Brocfile.js
package.json
```

out:
```
├── app
|   ├── main.js
|   ├── helper.js
|   └── others
|       └── Brocfile.js
└── package.json
```

## stream

```javascript
  var src = fs.createReadStream('fixtures/tagfile.txt');
  var dst = fs.createWriteStream('file.txt');
  src.pipe(splitterStream()) //to BytesLine
    .pipe(blockStream("{% asciitree %}", "{% endasciitree %}")) //produce one line or block of lines.
    .pipe(treeStream()) // bypass oneline, process block of lines.
    .pipe(unwrapStream()) // flatten block lines to Buffer.
    .pipe(dst);

  //or define a function
  function treepipe(src) {
   return src.pipe(splitterStream()) //to BytesLine
    .pipe(blockStream("{% asciitree %}", "{% endasciitree %}")) //produce one line or block of lines.
    .pipe(treeStream()) // bypass oneline, process block of lines.
    .pipe(unwrapStream()); // flatten block lines to Buffer.
  }

  treepipe(src).pipe(dst);
```
