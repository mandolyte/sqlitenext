# Demo of loading a large CSV file

This will use the web worker to import a 
large dump file. The file has nearly 99K rows.

The database will be created in the Origin Private File System.

Timings:

```
Time to initialize 21ms
Time to fetch dump file 676ms
Time to create table twl 15ms
Time to split into 2d Table 55ms
Time to load file 4398ms
```

