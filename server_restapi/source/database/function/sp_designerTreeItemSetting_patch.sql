
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItemSetting_patch;

-- go

CREATE PROCEDURE sp_designerTreeItemSetting_patch
(
    p_designerTreeItemSettingId BIGINT
,   p_businessId                BIGINT
,   p_settingCode               BIGINT
,   p_settingName               VARCHAR( 256)
,   p_settingDesc               VARCHAR( 256)
,   p_intValue                  SMALLINT UNSIGNED
,   p_dateValue                 DATETIME
,   p_stringValue               VARCHAR( 256)
)
this_proc:BEGIN

	UPDATE designerTreeItemSetting
    SET
        businessId              = p_businessId
    ,   settingCode             = p_settingCode
    ,   settingName             = p_settingName
    ,   settingDesc             = p_settingDesc
    ,   intValue                = p_intValue
    ,   dateValue               = p_dateValue
    ,   stringValue             = p_stringValue
    ,   updatedOn               = CURRENT_TIMESTAMP
    WHERE
        designerTreeItemSettingId   = p_designerTreeItemSettingId
    ;

    SELECT
        s.designerTreeItemSettingId
    ,   s.businessId
    ,   s.settingCode
    ,   s.settingName
    ,   s.settingDesc
    ,   s.intValue
    ,   s.dateValue
    ,   s.stringValue
    ,   s.createdOn
    ,   s.updatedOn
    FROM
        designerTreeItemSetting s
    WHERE
        s.designerTreeItemSettingId = p_designerTreeItemSettingId
    AND s.is_active         = 1
    ;

END
