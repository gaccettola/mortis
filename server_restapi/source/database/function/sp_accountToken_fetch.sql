
-- clean up

DROP PROCEDURE IF EXISTS sp_accountToken_fetch;

-- go

CREATE PROCEDURE sp_accountToken_fetch
(
    p_accountTokenId    INT(10)
)
this_proc:BEGIN

    IF p_accountTokenId = -1 THEN
    BEGIN

        SELECT
            t.accountTokenId
        ,   t.accountId
        ,   t.token
        ,   t.createdOn
        ,   t.updatedOn
        FROM
            accountToken t
        ;

    END;
    ELSE
    BEGIN

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

    END;
    END IF;

END
