
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTree_patch;

-- go

CREATE PROCEDURE sp_designerTree_patch
(
    p_designerTreeId    BIGINT
,   p_businessId        BIGINT
,   p_designerTreeName  VARCHAR( 256)
,   p_designerTreeDesc  VARCHAR( 256)
)
this_proc:BEGIN


    UPDATE designerTree
    SET
        businessId          = p_businessId
    ,   designerTreeName    = p_designerTreeName
    ,   designerTreeDesc    = p_designerTreeDesc
    ,   updatedOn           = CURRENT_TIMESTAMP
    WHERE
        designerTreeId      = p_designerTreeId
    ;

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
        dt.designerTreeId  = p_designerTreeId
    AND dt.is_active       = 1
    ;

END