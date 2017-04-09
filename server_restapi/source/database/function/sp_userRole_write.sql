
-- clean up

DROP PROCEDURE IF EXISTS sp_userRole_write;

-- go

CREATE PROCEDURE sp_userRole_write
(
    p_name              VARCHAR( 256)
,   p_description       VARCHAR(1024)
,   p_note              VARCHAR(1024)
)
this_proc:BEGIN

	INSERT INTO userRole
    (
        name
    ,   description
    ,   note
    )
    VALUES
    (
        p_name
    ,   p_description
    ,   p_note
    )
    ;

    SET @p_last_id := LAST_INSERT_ID ( );

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
        t.userRoleId = @p_last_id
    ;

END
