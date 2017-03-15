
-- clean up

DROP PROCEDURE IF EXISTS sp_active_create;

-- go

CREATE PROCEDURE sp_active_create
(
    p_userId     INT(11)
,   p_businessId INT(11)
)
this_proc:BEGIN

	INSERT INTO active
    (
        userId
    ,   businessId
    )
    VALUES
    (
	    p_userId
    ,   p_businessId
    )
    ;

    SET @p_last_id := LAST_INSERT_ID ( );

    SELECT
        a.userId
     ,  a.businessId
    FROM
        active a
    WHERE
        a.activeId = @p_last_id
    ;

END
