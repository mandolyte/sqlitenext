# Demo of importing a large dump file

This will use the web worker to import a 
large dump file. The file has nearly 99K rows.

This will be done in the web worker at startup.

- Test 1 did not return after several minutes.
- Test 2 will reduce the number of rows to about 10K. Results show that it runs at about 1s per 1000 rows for this import.

Here are the timings:
```
Time to initialize 2ms.
Time to fetch dump file 657ms.
Time to import dump 9949ms.
```

Try these two queries:
```
select * from sqlite_schema;
select count(*) from twl_tbl;
```

