# dtree-converter
convert indented line block to an ascii directory tree.

## usage

```javascript
var convertedLines = new DtreeConverter(lines, "-").convert();
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
