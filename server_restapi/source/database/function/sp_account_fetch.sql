
-- clean up

DROP PROCEDURE IF EXISTS sp_account_fetch;

-- go

CREATE PROCEDURE sp_account_fetch
(
    p_accountId         BIGINT
)
this_proc:BEGIN

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
