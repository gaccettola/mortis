
-- clean up

DROP PROCEDURE IF EXISTS sp_userRole_fetch;

-- go

CREATE PROCEDURE sp_userRole_fetch
(
    p_userRoleId        INT(10) UNSIGNED
)
this_proc:BEGIN

    SELECT
        t.userRoleId
    ,   t.name
    ,   t.description
    ,   t.note
    ,   t.createdOn
    ,   t.updatedOn
    FROM
        userRole t
    WHERE
        t.userRoleId = p_userRoleId
    ;

END