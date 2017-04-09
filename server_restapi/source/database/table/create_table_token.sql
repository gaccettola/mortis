
-- System tokens

CREATE TABLE IF NOT EXISTS token (

    tokenId             BIGINT              NOT NULL AUTO_INCREMENT UNIQUE

,   tokenName           VARCHAR( 256)       NOT NULL DEFAULT ''
,   publicKey           VARCHAR(1024)       NOT NULL DEFAULT ''
,   privateKey          VARCHAR(1024)       NOT NULL DEFAULT ''

,	createdOn           DATETIME 		    DEFAULT CURRENT_TIMESTAMP
,	updatedOn           DATETIME 			DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

,   PRIMARY KEY (tokenId)
);

