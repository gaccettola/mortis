
-- fetch the accountToken issued to an account, newest first

-- clean up

DROP PROCEDURE IF EXISTS sp_accountToken_fetch_account;

-- go

CREATE PROCEDURE sp_accountToken_fetch_account
(
    p_accountId INT(10)
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
        t.accountId = p_accountId
    ORDER BY
        t.accountTokenId DESC
    ;

END
