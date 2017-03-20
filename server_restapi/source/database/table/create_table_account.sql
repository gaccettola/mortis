
-- Accounts created, security related.
-- userName, the salt used, and the password hash

CREATE TABLE IF NOT EXISTS account (
    accountId   INT(10) UNSIGNED    NOT NULL AUTO_INCREMENT

,   userName    VARCHAR( 256)       NOT NULL DEFAULT ''
,   salt        VARCHAR(1024)       NOT NULL DEFAULT ''
,   hash        VARCHAR(1024)       NOT NULL DEFAULT ''

,	createdOn   DATETIME 		    DEFAULT CURRENT_TIMESTAMP
,	updatedOn   DATETIME 			DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

,   PRIMARY KEY (accountId)
);

-- go

CALL sp_schema_addcolumn
(
    'account'
,   'userName'
,   'VARCHAR( 256) NOT NULL DEFAULT "" after `accountId`'
);
