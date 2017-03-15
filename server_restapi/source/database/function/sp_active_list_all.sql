
-- clean up

DROP PROCEDURE IF EXISTS sp_active_list_all;

-- go

CREATE PROCEDURE sp_active_list_all
(
)
this_proc:BEGIN

    SELECT
        a.userId
     ,  a.businessId
    FROM
        active a
    ;

END
