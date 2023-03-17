# Demo of loading a large CSV file

This will use the web worker to import a 
large dump file. The file has nearly 99K rows.

This will be done in the web worker at startup.

Without transaction support:
```
Time to initialize 1ms
Time to fetch dump file 685ms
Time to create table twl 15ms
Time to split into 2d Table 59ms
Time to import dump 6305ms
```

With transaction support:
```
Time to initialize 2ms
Time to fetch dump file 762ms
Time to create table twl 13ms
Time to split into 2d Table 65ms
Time to load file 5017ms
```