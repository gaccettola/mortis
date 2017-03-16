
-- clean up

DROP PROCEDURE IF EXISTS sp_token_patch;

-- go

CREATE PROCEDURE sp_token_patch
(
    p_tokenId       INT(10)
,   p_tokenName     VARCHAR( 256)
,   p_publicKey     VARCHAR(1024)
,   p_privateKey    VARCHAR(1024)
)
this_proc:BEGIN

	UPDATE active
    SET
        tokenName   = p_tokenName
    ,   publicKey   = p_publicKey
    ,   privateKey  = p_privateKey
    ,   updatedOn   = CURRENT_TIMESTAMP
    WHERE
        tokenId     = p_tokenId
    ;

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
        t.tokenId   = @p_last_id
    ;

END
