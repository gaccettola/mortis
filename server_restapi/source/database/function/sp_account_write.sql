
-- clean up

DROP PROCEDURE IF EXISTS sp_account_write;

-- go

CREATE PROCEDURE sp_account_write
(
    p_userName  VARCHAR(256)
,   p_salt      VARCHAR(1024)
,   p_hash      VARCHAR(1024)
)
this_proc:BEGIN

	INSERT INTO account
    (
        userName
    ,   salt
    ,   hash
    )
    VALUES
    (
        p_userName
    ,   p_salt
    ,   p_hash
    )
    ;

    SET @p_last_id := LAST_INSERT_ID ( );

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
        a.accountId = @p_last_id
    ;

END
