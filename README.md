# dtree-converter
convert indented line block to an ascii directory tree.


in:
```
app
-main.js
-helper.js
-others
--Brocfile.js
```

out:
```
package.json
├── app
|   ├── main.js
|   ├── helper.js
|   └── others
|       └── Brocfile.js
└── package.json
```
