
-- clean up

DROP PROCEDURE IF EXISTS sp_active_patch;

-- go

CREATE PROCEDURE sp_active_patch
(
    p_activeId      INT(10)
,   p_userId        INT(11)
,   p_businessId    INT(11)
)
this_proc:BEGIN

	UPDATE active
    SET
        userId      = p_userId
    ,   businessId  = p_businessId
    ,   updatedOn   = CURRENT_TIMESTAMP
    WHERE
        activeId = p_activeId
    ;

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

END
