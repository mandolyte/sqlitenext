# Sqlite3 with Next.js

I have moved some things around in order to have multiple 
experiments and examples in the same repo.

Each folder is described below.

## in-mem-main-thread

This shows an example of using an in-memory database. 
It runs on the main thread and might be used within hooks
as any such database connection might be.

There is a README with more details.

## worker

Uses web workers to handle all interactions with the database 
(still in-memory). Worker interactions use a pub/sub approach.
See README for details.

## textbox

Built from "worker", this example, a text box is available to enter SQL or DML.
The README has some things to copy/paste or make up your own!

## context

Built from textbox, this example moves important aspects to the
an application context, making the database easily available to 
all parts of the application.

# import_dump

The demo loads a table using a dump file from sqlite3 CLI.
It runs way too slow. See readme for more. And the "load_db"
demo below.

# load_db

This demo shows loading a database table with almost 99k rows 
by using a transaction and binding parameters to the inserts.
This loaded in about 6s. Much better than the import_dump demo.