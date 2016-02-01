# Ascii Tree

将锯齿状的行块转换成一个Ascii树。 [English](README.md)

## 同步版本

转换一棵树，不包含树的分隔行。换行符在转换过程中保持不变。
```javascript
  var tree = new AsciiTree(BytesLine.getArray("hello")).convert();
  assert.equal("└── hello", tree.toString());
  // or use builder helper.
  var tree = new AsciiTreeBuilder().withString("hello").withEncode("UTF-8").build().convert();
  assert.equal("└── hello", tree.toString());

  tree.toBufferArray();
  tree.toStringArray();
  tree.toString();
```
将文本中的所有树作转换，树行块通过分割行定义开始和结束。比如下面的文本块。

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
  //识别分割行的可以是字符串或正则表达式，字符的话是trim首尾之后的相等。
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

## 流版本

```javascript
  var src = fs.createReadStream('fixtures/tagfile.txt');
  var dst = fs.createWriteStream('file.txt');
  src.pipe(splitterStream()) //将输入流变成BytesLine输出流
    .pipe(blockStream("{% asciitree %}", "{% endasciitree %}")) //产生单一的行（不在树中间的话），行块（对应一棵树）
    .pipe(treeStream()) // 将单一行直接传递下去，将树块转换之后传递
    .pipe(unwrapStream()) // 扁平化成Buffer
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
