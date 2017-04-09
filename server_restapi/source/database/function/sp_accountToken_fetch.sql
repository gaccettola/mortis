
-- clean up

DROP PROCEDURE IF EXISTS sp_accountToken_fetch;

-- go

CREATE PROCEDURE sp_accountToken_fetch
(
    p_accountTokenId    BIGINT
)
this_proc:BEGIN

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
