### description : server_database
the database server is designed to define the schema ( the tables ) and the functions of the database engine.

### general workflow
- the sql scripts are installed in order according to the rollforward.rc file.
- typically the common functions are first, then the tables, then the function

### rollforward.rc
- simple mapping of sql resurces where two columns are defined,
  - the left column is a simple label for the script to run and the right column defines the relative path to
    the resource. the column are separated by an abitrary delimiter.
- it is formatted to appear fixed width but is not processed according to any fixed width.
- any line starting with # is ignored
- .sql files may contain multiple scripts, scripts within a file are separated by --GO;

### example .rc :

  create table `user`                  :: ./table/user.sql
# inactive table `user_type`           :: ./table/user_type.sql

  create function `list user`          :: ./function/user_list.sql
# inactive function `list user type`   :: ./function/user_type_list.sql


### general data rules,
- expand and never shrink data.
  - this applies to adding tables and not removing tables
  - this applies to extending character or integer fields and not contracting them
  - this applies to adding rows but not removing them

- all script much be multi-run safe.
  - if you're gonna add a table or function, check if it exists first.
  - if you're gonna drop a table of function, check that it exists first
  - if you're gonna add a column, etc etc,

- scripts that create or alter the schema should contain the current schema definition and also any changes need to
  migrate a previous version of the schema forward.

- scritps that create or alter a function should remove previous version of the function beforehand if they exist
