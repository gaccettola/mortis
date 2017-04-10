
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItemSetting_fetch;

-- go

CREATE PROCEDURE sp_designerTreeItemSetting_fetch
(
    p_designerTreeItemSettingId     BIGINT
)
this_proc:BEGIN

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