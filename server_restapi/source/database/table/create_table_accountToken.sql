
-- Tokens issues to accounts
-- accountId the token was issued to
-- the token that was issued

CREATE TABLE IF NOT EXISTS accountToken (

    accountTokenId      BIGINT              NOT NULL AUTO_INCREMENT UNIQUE

,   accountId           BIGINT              NOT NULL
,   token               VARCHAR(1024)       NOT NULL DEFAULT ''

,	createdOn           DATETIME 		    DEFAULT CURRENT_TIMESTAMP
,	updatedOn           DATETIME 			DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

,   PRIMARY KEY (accountTokenId)
);
