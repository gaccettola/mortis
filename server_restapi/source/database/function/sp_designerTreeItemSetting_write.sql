
-- clean up

DROP PROCEDURE IF EXISTS sp_designerTreeItemSetting_write;

-- go

CREATE PROCEDURE sp_designerTreeItemSetting_write
(
    p_businessId            BIGINT
,   p_settingCode           BIGINT
,   p_settingName           VARCHAR( 256)
,   p_settingDesc           VARCHAR( 256)
,   p_intValue              SMALLINT UNSIGNED
,   p_dateValue             DATETIME
,   p_stringValue           VARCHAR( 256)
)
this_proc:BEGIN

	INSERT INTO designerTreeItemSetting
    (
        businessId
    ,   settingCode
    ,   settingName
    ,   settingDesc
    ,   intValue
    ,   dateValue
    ,   stringValue
    )
    VALUES
    (
        p_businessId
    ,   p_settingCode
    ,   p_settingName
    ,   p_settingDesc
    ,   p_intValue
    ,   p_dateValue
    ,   p_stringValue
    )
    ;

    SET @p_last_id := LAST_INSERT_ID ( );

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
        s.designerTreeItemSettingId = @p_last_id
    AND s.is_active         = 1
    ;

END
