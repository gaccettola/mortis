
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItem_write;

-- go

CREATE PROCEDURE sp_designerTreeItem_write
(
    p_designerTreeId      BIGINT
,   p_businessId          BIGINT
,   p_idx                 SMALLINT UNSIGNED
,   p_fill                VARCHAR( 256)
,   p_radius              SMALLINT UNSIGNED
,   p_cx                  SMALLINT UNSIGNED
,   p_cy                  SMALLINT UNSIGNED
,   p_selected            TINYINT UNSIGNED
,   p_min_height          SMALLINT UNSIGNED
,   p_height              SMALLINT UNSIGNED
,   p_width               SMALLINT UNSIGNED
,   p_is_primary          TINYINT UNSIGNED
,   p_message_text        VARCHAR( 256)
)
this_proc:BEGIN

	INSERT INTO designerTreeItem
    (
        designerTreeId
    ,   businessId
    ,   idx
    ,   fill
    ,   radius
    ,   cx
    ,   cy
    ,   selected
    ,   min_height
    ,   height
    ,   width
    ,   is_primary
    ,   message_text
    )
    VALUES
    (
        p_designerTreeId
    ,   p_businessId
    ,   p_idx
    ,   p_fill
    ,   p_radius
    ,   p_cx
    ,   p_cy
    ,   p_selected
    ,   p_min_height
    ,   p_height
    ,   p_width
    ,   p_is_primary
    ,   p_message_text
    )
    ;

    SET @p_last_id := LAST_INSERT_ID ( );

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
        t.designerTreeItemId    = @p_last_id
    AND t.is_active     = 1
    ;

END
