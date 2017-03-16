
-- clean up

DROP PROCEDURE IF EXISTS sp_account_fetch_user;

-- go

CREATE PROCEDURE sp_account_fetch_user
(
    p_userName  VARCHAR(256)
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
        a.userName = p_userName
    ;

END
