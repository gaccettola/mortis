
-- clean up

DROP PROCEDURE IF EXISTS sp_userRole_patch;

-- go

CREATE PROCEDURE sp_userRole_patch
(
    p_userRoleId        INT(10) UNSIGNED
,   p_name              VARCHAR( 256)
,   p_description       VARCHAR( 256)
,   p_note              VARCHAR( 256)
)
this_proc:BEGIN

	UPDATE active
    SET
        name            = p_name
    ,   description     = p_description
    ,   note            = p_note
    ,   updatedOn       = CURRENT_TIMESTAMP
    WHERE
        userRoleId     = p_userRoleId
    ;

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
        t.userRoleId   = @p_last_id
    ;

END
