
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItem_fetch;

-- go

CREATE PROCEDURE sp_designerTreeItem_fetch
(
    p_designerTreeItemId        INT(10) UNSIGNED
)
this_proc:BEGIN

    SELECT
        t.designerTreeItemId
    ,   t.designerTreeId
    ,   t.businessId
    ,   t.idx
    ,   t.fill
    ,   t.radius
    ,   t.cx
    ,   t.cy
    ,   t.selected
    ,   t.min_height
    ,   t.height
    ,   t.width
    ,   t.is_primary
    ,   t.message_text
    ,   t.createdOn
    ,   t.updatedOn
    FROM
        designerTreeItem t
    WHERE
        t.designerTreeItemId    = p_designerTreeItemId
    AND t.is_active     = 1
    ;

END