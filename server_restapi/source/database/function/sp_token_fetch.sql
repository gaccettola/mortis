
-- clean up

DROP PROCEDURE IF EXISTS sp_token_fetch;

-- go

CREATE PROCEDURE sp_token_fetch
(
    p_tokenId  INT(10)
)
this_proc:BEGIN

    IF p_tokenId = -1 THEN
    BEGIN

        SELECT
            t.tokenId
        ,   t.tokenName
        ,   t.publicKey
        ,   t.privateKey
        ,   t.createdOn
        ,   t.updatedOn
        FROM
            token t
        ;

    END;
    ELSE
    BEGIN

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

    END;
    END IF;

END
