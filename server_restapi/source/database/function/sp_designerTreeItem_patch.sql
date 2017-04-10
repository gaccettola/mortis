
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItem_patch;

-- go

CREATE PROCEDURE sp_designerTreeItem_patch
(
    p_designerTreeItemId  BIGINT
,   p_designerTreeId      BIGINT
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

	UPDATE designerTreeItem
    SET
        designerTreeId  = p_designerTreeId
    ,   businessId      = p_businessId
    ,   idx             = p_idx
    ,   fill            = p_fill
    ,   radius          = p_radius
    ,   cx              = p_cx
    ,   cy              = p_cy
    ,   selected        = p_selected
    ,   min_height      = p_min_height
    ,   height          = p_height
    ,   width           = p_width
    ,   is_primary      = p_is_primary
    ,   message_text    = p_message_text
    ,   updatedOn       = CURRENT_TIMESTAMP
    WHERE
        designerTreeItemId     = p_designerTreeItemId
    ;

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
