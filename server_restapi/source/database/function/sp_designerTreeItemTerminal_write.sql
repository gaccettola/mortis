
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItemTerminal_write;

-- go

CREATE PROCEDURE sp_designerTreeItemTerminal_write
(
    p_businessId            BIGINT
,   p_designerTreeItemId    BIGINT
,   p_terminalType          TINYINT UNSIGNED
,   p_idx                   SMALLINT UNSIGNED
,   p_label                 VARCHAR( 256)
,   p_radius                TINYINT UNSIGNED
,   p_cx                    SMALLINT UNSIGNED
,   p_cy                    SMALLINT UNSIGNED
)
this_proc:BEGIN

	INSERT INTO designerTreeItemTerminal
    (
        businessId
    ,   designerTreeItemId
    ,   terminalType
    ,   idx
    ,   label
    ,   radius
    ,   cx
    ,   cy
    )
    VALUES
    (
        p_businessId
    ,   p_designerTreeItemId
    ,   p_terminalType
    ,   p_idx
    ,   p_label
    ,   p_radius
    ,   p_cx
    ,   p_cy
    )
    ;

    SET @p_last_id := LAST_INSERT_ID ( );

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
        t.designerTreeItemTerminalId = @p_last_id
    AND t.is_active          = 1
    ;

END
