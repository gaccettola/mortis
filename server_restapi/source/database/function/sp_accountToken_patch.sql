
-- clean up

DROP PROCEDURE IF EXISTS sp_accountToken_patch;

-- go

CREATE PROCEDURE sp_accountToken_patch
(
    p_accountTokenId    INT(10)
,   p_accountId         INT(10) UNSIGNED
,   p_token             VARCHAR(1024)
)
this_proc:BEGIN

	UPDATE accountToken
    SET
        accountId       = p_accountId
    ,   token           = p_token
    ,   updatedOn       = CURRENT_TIMESTAMP
    WHERE
        accountTokenId  = p_accountTokenId
    ;

    SELECT
        t.accountTokenId
    ,   t.accountId
    ,   t.token
    ,   t.createdOn
    ,   t.updatedOn
    FROM
        accountToken t
    WHERE
        t.accountTokenId    = p_accountTokenId
    ;

END