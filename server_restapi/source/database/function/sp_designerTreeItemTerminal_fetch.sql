
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItemTerminal_fetch;

-- go

CREATE PROCEDURE sp_designerTreeItemTerminal_fetch
(
    p_designerTreeItemTerminalId    BIGINT
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
    WHERE
        t.designerTreeItemTerminalId = p_designerTreeItemTerminalId
    AND t.is_active          = 1
    ;

END