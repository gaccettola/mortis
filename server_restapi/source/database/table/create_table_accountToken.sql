
-- Tokens issues to accounts
-- accountId the token was issued to
-- the token that was issued

CREATE TABLE IF NOT EXISTS accountToken (
    accountTokenId  INT(10) UNSIGNED    NOT NULL AUTO_INCREMENT

,   accountId       INT(10) UNSIGNED    NOT NULL
,   token           VARCHAR(1024)       NOT NULL DEFAULT ''

,	createdOn       DATETIME 		    DEFAULT CURRENT_TIMESTAMP
,	updatedOn       DATETIME 			DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

,   PRIMARY KEY (accountTokenId)
);
