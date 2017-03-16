
-- clean up

DROP PROCEDURE IF EXISTS sp_account_fetch;

-- go

CREATE PROCEDURE sp_account_fetch
(
    p_accountId     INT(10)
)
this_proc:BEGIN

    IF p_accountId = -1 THEN
    BEGIN

        SELECT
            a.accountId
        ,   a.userName
        ,   a.salt
        ,   a.hash
        ,   a.createdOn
        ,   a.updatedOn
        FROM
            account a
        ;

    END;
    ELSE
    BEGIN

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

    END;
    END IF;

END
