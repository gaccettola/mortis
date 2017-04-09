
-- clean up

DROP PROCEDURE IF EXISTS sp_token_write;

-- go

CREATE PROCEDURE sp_token_write
(
    p_tokenName         VARCHAR( 256)
,   p_publicKey         VARCHAR(1024)
,   p_privateKey        VARCHAR(1024)
)
this_proc:BEGIN

	INSERT INTO token
    (
        tokenName
    ,   publicKey
    ,   privateKey
    )
    VALUES
    (
        p_tokenName
    ,   p_publicKey
    ,   p_privateKey
    )
    ;

    SET @p_last_id := LAST_INSERT_ID ( );

    SELECT
        t.tokenId
    ,   t.tokenName
    ,   t.publicKey
    ,   t.privateKey
    ,   t.createdOn
    ,   t.updatedOn
    FROM
        token t
    WHERE
        t.tokenId = @p_last_id
    ;

END
