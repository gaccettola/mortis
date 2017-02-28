### description   : mortis
boilerplate for web, mobile, desktop projects including a restapi and update server

there are several good boilerplate projects out there.  this isn't going to be one of them.
it's gonna be a bit more than a boilerplate.

few complete packages out there.  and when i say complete i mean,
 - web     application, via angular ( with a clean set of directives )
 - mobile  application, via ionic ( more directives and components )
 - desktop application, via electron with some sqlite3 caching
 - restapi via node
 - desktop application update server
 - dockerized database server for primary storage
 - dockerized redis server for relaying the real-time messages
 - kubernetes yml files for deploying to gcloud
 - all the scripts for run debugging, releasing
 - all the gulp tasks for linting hinting
 - and later once it it up and running better documentation
 - and once the documentation is better, some audio video to explain things better.

yeah, it's gonna be monolithic.

### general directory structure,
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
- server_update   : nodejs update service, serves updates to the desktop


the server_database directory us these sub-directories
- common          : setup and common functions that have little to do with the application storage needs
- function        : database functions that create, alter, and return information
- table           : database storage. not accessed except by the database functions


each client & server directory contains the files,
- readme.me       : brief description of the directory
- _clean.sh       : script to clean, remove, purge, reset the temporary project files
- _prepare.sh     : script to prepare the directory for being executed.  usually to pull in dependencies


each client & server directory contains the directories,
- debug           : temporary directory for files that are being executed during development
- release         : temporary directory for files that are prepared for delivery
- source          : the source code


each client directory has, within it's 'source' directory, the sub-directories
- modules         : often 'pages' or 'views'
- services        : shared resources, often used by the modules


each server directory has, within it's 'source' directory, the sub-directories
- controller      :
- services        : shared resources, often used by the controllers


the project root contains,
- _clean.sh          : calls, on all top level sub-directory, the script to 'clean'
- _clean_compress.sh : removes the temp files and rolls it all into a tar
- _prepare.sh        : calls, on all top level sub-directory, the script to 'prepare'