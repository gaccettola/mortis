
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTree_fetch_one;

-- go

CREATE PROCEDURE sp_designerTree_fetch_one
(
    p_designerTreeId    BIGINT
)
this_proc:BEGIN

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