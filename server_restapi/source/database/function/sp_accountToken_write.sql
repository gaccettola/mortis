
-- clean up

DROP PROCEDURE IF EXISTS sp_accountToken_write;

-- go

CREATE PROCEDURE sp_accountToken_write
(
    p_accountId         INT(10) UNSIGNED
,   p_token             VARCHAR(1024)
)
this_proc:BEGIN

	INSERT INTO accountToken
    (
        accountId
    ,   token
    )
    VALUES
    (
        p_accountId
    ,   p_token
    )
    ;

    SET @p_last_id := LAST_INSERT_ID ( );

    SELECT
        t.accountTokenId
    ,   t.accountId
    ,   t.token
    ,   t.createdOn
    ,   t.updatedOn
    FROM
        accountToken t
    WHERE
        t.accountTokenId    = @p_last_id
    ;

END
