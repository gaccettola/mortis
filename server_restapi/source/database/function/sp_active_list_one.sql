
-- clean up

DROP PROCEDURE IF EXISTS sp_active_list_one;

-- go

CREATE PROCEDURE sp_active_list_one
(
    p_activeId      INT(10)
)
this_proc:BEGIN

    SELECT
        a.userId
     ,  a.businessId
    FROM
        active a
    WHERE
        a.activeId = p_activeId
    ;

END
