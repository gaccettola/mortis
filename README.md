### description   : mortis
boilerplate for web, mobile, desktop projects incluing a restapi and update server

### general directory structure and motivation,
- each module contains
  - a directory for implementation
  - a directory for tests
  - a directory for notes

### modules
- client_desktop  : client application for desktop  ( electron  - osx, windows, linux )
- client_mobile   : client application for mobile   ( ionic     - ios, android        )
- client_web      : client application for browsers ( chrome                          )
- common          : code used by both the server(s) and client(s)
- server_database : database tables and function
- server_restapi  : nodejs restapi, serves data to the clients
- server_update   : nodejs udpate service, serves updates to the desktop


the server_database directory us these sub-directories
- common          : setup and common functions that have little to do with the application storage needs
- function        : database functions that create, alter, and return information
- table           : database storage. not accessed except by the database functions


each client & server directory contains the files,
- readme.me       : brief description of the directory
- _clean.sh       : script to clean, remove, purge, reset the temporary project files
- _prepare.sh     : script to prepare the directory for being executed.  usually to pull in dependancies


each client & server directory contains the directories,
- debug           : temporary directory for files that are being executed during development
- release         : temporary dorectory for files that are prepared for delivery
- source          : the source code


each client directory has, within it`s `source` directory, the sub-directories
- modules         : often `pages` or `views`
- services        : shared resources, often used by the modules


each server directory has, within it`s `source` directory, the sub-directories
- controller      :
- services        : shared resources, often used by the controllers


the project root contains,
- _clean.sh       : calls, on all top level sub-directory, the script to `clean`
- _prepare.sh     : calls, on all top level sub-directory, the script to `prepare`