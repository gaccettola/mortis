
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItemConnection_write;

-- go

CREATE PROCEDURE sp_designerTreeItemConnection_write
(
    p_designerTreeId    BIGINT
,   p_businessId        BIGINT
,   p_idx               SMALLINT UNSIGNED
,   p_src_terminal_idx  SMALLINT UNSIGNED
,   p_dst_terminal_idx  SMALLINT UNSIGNED
,   p_selected          TINYINT UNSIGNED
,   p_src_cx            SMALLINT UNSIGNED
,   p_src_cy            SMALLINT UNSIGNED
,   p_src_ct            SMALLINT UNSIGNED
,   p_dst_cx            SMALLINT UNSIGNED
,   p_dst_cy            SMALLINT UNSIGNED
,   p_dst_ct            SMALLINT UNSIGNED
,   p_path              VARCHAR( 256)
)
this_proc:BEGIN

	INSERT INTO designerTreeItemConnection
    (
        designerTreeId
    ,   businessId
    ,   idx
    ,   src_terminal_idx
    ,   dst_terminal_idx
    ,   selected
    ,   src_cx
    ,   src_cy
    ,   src_ct
    ,   dst_cx
    ,   dst_cy
    ,   dst_ct
    ,   path
    )
    VALUES
    (
        p_designerTreeId
    ,   p_businessId
    ,   p_idx
    ,   p_src_terminal_idx
    ,   p_dst_terminal_idx
    ,   p_selected
    ,   p_src_cx                 
    ,   p_src_cy
    ,   p_src_ct
    ,   p_dst_cx
    ,   p_dst_cy
    ,   p_dst_ct
    ,   p_path
    )
    ;

    SET @p_last_id := LAST_INSERT_ID ( );

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
        c.designerTreeItemConnectionId = @p_last_id
    AND c.is_active             = 1
    ;

END
