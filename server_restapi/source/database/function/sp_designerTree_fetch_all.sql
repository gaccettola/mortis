
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTree_fetch_all;

-- go

CREATE PROCEDURE sp_designerTree_fetch_all
(
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
        dt.is_active       = 1
    ;

END