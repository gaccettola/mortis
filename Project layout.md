

### modules
- client_desktop     : client application for desktop  ( electron  - osx, windows, linux )
- client_mobile      : client application for mobile   ( ionic     - ios, android        )
- client_web         : client application for browsers ( chrome                          )
- common             : code across multiple modules
- server_restapi     : nodejs restapi, serves data to the clients
- server_update     : nodejs update service, serves updates to the desktop

### each client directory contains,
- _clean.sh          : removes temporary files
- _prepare.sh        : prepares
- _prepare_rub.sh    : prepares then runs execute 
? note               : temporary directory for files that are being executed during development
+ source             : the source code
? test               : the source code tests
? debug              : temporary directory for files that are being executed during development
? release            : temporary directory for files that are prepared for delivery

### restapi server has, within it's 'source' directory, the sub-directories
- controller         : endpoint handlers
- services           : shared resources, often used by the controllers
- database           : root for the database
- database/common    : common database functions - add_column, add_index, that kind of stuff
- database/function  : stored procedures - mostly related to the domain model
- database/table     : database storage. not accessed except by the database functions

### the project root contains,
- _clean.sh          : calls, on all top level sub-directory, the script to 'clean'
- _clean_compress.sh : removes the temp files and rolls it all into a tar
- _prepare.sh        : calls, on all top level sub-directory, the script to 'prepare'
