
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItemTerminal_fetch_tree;

-- go

CREATE PROCEDURE sp_designerTreeItemTerminal_fetch_tree
(
    p_designerTreeId    BIGINT
)
this_proc:BEGIN

    SELECT
        t.designerTreeItemTerminalId
    ,   t.businessId
    ,   t.designerTreeItemId
    ,   t.terminalType
    ,   t.idx
    ,   t.label
    ,   t.radius
    ,   t.cx
    ,   t.cy
    ,   t.createdOn
    ,   t.updatedOn
    FROM
        designerTreeItemTerminal t
        INNER JOIN designerTreeItem i ON
            t.designerTreeItemId = i.designerTreeItemId
    WHERE
        i.designerTreeId    = p_designerTreeId
    AND t.is_active         = 1
    ;

END