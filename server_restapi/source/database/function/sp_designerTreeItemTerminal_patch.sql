
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItemTerminal_patch;

-- go

CREATE PROCEDURE sp_designerTreeItemTerminal_patch
(
    p_designerTreeItemTerminalId    BIGINT
,   p_businessId                    BIGINT
,   p_designerTreeItemId            BIGINT
,   p_terminalType                  TINYINT UNSIGNED
,   p_idx                           SMALLINT UNSIGNED
,   p_label                         VARCHAR( 256)
,   p_radius                        TINYINT UNSIGNED
,   p_cx                            SMALLINT UNSIGNED
,   p_cy                            SMALLINT UNSIGNED
)
this_proc:BEGIN

	UPDATE designerTreeItemTerminal
    SET
        businessId                  = p_businessId
    ,   designerTreeItemId          = p_designerTreeItemId
    ,   terminalType                = p_terminalType
    ,   idx                         = p_idx
    ,   label                       = p_label
    ,   radius                      = p_radius
    ,   cx                          = p_cx
    ,   cy                          = p_cy
    ,   updatedOn                   = CURRENT_TIMESTAMP
    WHERE
        designerTreeItemTerminalId  = p_designerTreeItemTerminalId
    ;

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
