
-- clean up

DROP PROCEDURE IF EXISTS sp_account_patch;

-- go

CREATE PROCEDURE sp_account_patch
(
    p_accountId INT(10)
,   p_userName  VARCHAR(256)
,   p_salt      VARCHAR(1024)
,   p_hash      VARCHAR(1024)
)
this_proc:BEGIN

	UPDATE account
    SET
        userName    = p_userName
    ,   salt        = p_salt
    ,   hash        = p_hash
    ,   updatedOn   = CURRENT_TIMESTAMP
    WHERE
        accountId   = p_accountId
    ;

    SELECT
        a.accountId
    ,   a.userName
    ,   a.salt
    ,   a.hash
    ,   a.createdOn
    ,   a.updatedOn
    FROM
        account a
    WHERE
        a.accountId = p_accountId
    ;

END
