# Demo of Using Sqlite3 with Next.js

Setup credit belongs to this forum article:
https://sqlite.org/forum/forumpost/91af6788de

Steps:
- Install packages `yarn install`
- Run server `yarn dev`

This demo adds a text box where SQL queries can be entered.

An example query is shown that can be entered or copy/pasted.

Errors are now caught and a message is shown.

These can be copied and pasted in all at once:

```sql
CREATE TABLE IF NOT EXISTS u(a,b);

insert into u(a,b) values ('a','b');
insert into u(a,b) values ('c','d');
insert into u(a,b) values ('e','f');

select count(*) from u;
```

Other queries to try:
```
select * from u;

select max(b) as maxb from u;


SELECT name FROM sqlite_schema
WHERE type='table'
ORDER BY name;

select * from sqlite_schema;
```
