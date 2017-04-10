
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTree_write;

-- go

CREATE PROCEDURE sp_designerTree_write
(
    p_businessId        BIGINT
,   p_designerTreeName  VARCHAR( 256)
,   p_designerTreeDesc  VARCHAR( 256)
)
this_proc:BEGIN

    INSERT INTO designerTree
    (
        businessId
    ,   designerTreeName
    ,   designerTreeDesc
    )
    VALUES
    (
        p_businessId
    ,   p_designerTreeName
    ,   p_designerTreeDesc
    )
    ;

    SET @p_last_id := LAST_INSERT_ID ( );

    SELECT
        dt.designerTreeId
    ,   dt.businessId
    ,   dt.designerTreeName
    ,   dt.designerTreeDesc
    ,   dt.createdOn
    ,   dt.updatedOn
    FROM
        designerTree dt
    WHERE
        dt.designerTreeId  = @p_last_id
    AND dt.is_active       = 1
    ;

END