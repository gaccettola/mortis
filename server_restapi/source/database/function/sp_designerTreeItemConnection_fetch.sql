
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItemConnection_fetch;

-- go

CREATE PROCEDURE sp_designerTreeItemConnection_fetch
(
    p_designerTreeItemConnectionId BIGINT
)
this_proc:BEGIN

    SELECT
        c.designerTreeItemConnectionId
    ,   c.designerTreeId
    ,   c.businessId
    ,   c.idx
    ,   c.src_terminal_idx
    ,   c.dst_terminal_idx
    ,   c.selected
    ,   c.src_cx
    ,   c.src_cy
    ,   c.src_ct
    ,   c.dst_cx
    ,   c.dst_cy
    ,   c.dst_ct
    ,   c.path
    ,   c.createdOn
    ,   c.updatedOn
    FROM
        designerTreeItemConnection c
    WHERE
        c.designerTreeItemConnectionId = p_designerTreeItemConnectionId
    AND c.is_active             = 1

    ;

END