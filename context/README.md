# Demo of Using Sqlite3 with Next.js

Setup credit belongs to this forum article:
https://sqlite.org/forum/forumpost/91af6788de

Steps:
- Install packages `yarn install`
- Run server `yarn dev`


A movie dataset:
https://datasets.imdbws.com/


CREATE TABLE IF NOT EXISTS u(a,b);

insert into u(a,b) values ('a','b');
insert into u(a,b) values ('c','d');
insert into u(a,b) values ('e','f');

select count(*) from u;
