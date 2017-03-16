
-- clean up

DROP PROCEDURE IF EXISTS sp_token_fetch_name;

-- go

CREATE PROCEDURE sp_token_fetch_name
(
    p_tokenName     VARCHAR( 256)
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
        t.tokenName = p_tokenName
    ;

END
