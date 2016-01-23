# Ascii Tree

convert indented line block to an ascii directory tree.

## usage

convert one tree.
```javascript
var convertedLines = new AsciiTree(lines, "-").convert(); // "-" is optional, AsciiTree will guess the leading char.
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
var convertedLines = new AsciiTrees(lines, startTag, endTag,prepend, append, "-").convert();

var convertedLines = new AsciiTrees(lines,/^{%\s+asciitree\s+%}$/, "{% endasciitree %}", '<pre>', '</pre>');
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
