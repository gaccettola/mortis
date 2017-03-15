
-- clean up

DROP PROCEDURE IF EXISTS sp_active_fetch;

-- go

CREATE PROCEDURE sp_active_fetch
(
    p_activeId      INT(10)
)
this_proc:BEGIN

    IF p_activeId = -1 THEN
    BEGIN

        SELECT
            a.activeId
        ,   a.userId
        ,   a.businessId
        ,   a.createdOn
        ,   a.updatedOn
        FROM
            active a
        ;

    END;
    ELSE
    BEGIN

        SELECT
            a.activeId
        ,   a.userId
        ,   a.businessId
        ,   a.createdOn
        ,   a.updatedOn
        FROM
            active a
        WHERE
            a.activeId = p_activeId
        ;

    END;
    END IF;

END
