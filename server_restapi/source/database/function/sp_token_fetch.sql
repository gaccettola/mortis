
-- clean up

DROP PROCEDURE IF EXISTS sp_token_fetch;

-- go

CREATE PROCEDURE sp_token_fetch
(
    p_tokenId           BIGINT
)
this_proc:BEGIN

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
        t.tokenId = p_tokenId
    ;

END
