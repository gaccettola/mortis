
-- clean up

DROP PROCEDURE IF EXISTS sp_active_update;

-- go

CREATE PROCEDURE sp_active_update
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
    WHERE
        activeId = p_activeId
    ;

    SELECT
        a.userId
     ,  a.businessId
    FROM
        active a
    WHERE
        a.activeId = p_activeId
    ;

END
