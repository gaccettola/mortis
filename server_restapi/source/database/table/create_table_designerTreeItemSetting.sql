
--

CREATE TABLE IF NOT EXISTS designerTreeItemSetting (

    designerTreeItemSettingId   BIGINT              NOT NULL AUTO_INCREMENT UNIQUE

,   businessId                  BIGINT              NOT NULL DEFAULT 0
,   settingCode                 BIGINT              NOT NULL DEFAULT 0
,   settingName                 VARCHAR( 256)       NOT NULL DEFAULT ''
,   settingDesc                 VARCHAR( 256)       NOT NULL DEFAULT ''
,   intValue                    SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   dateValue                   DATETIME 		    DEFAULT CURRENT_TIMESTAMP
,   stringValue                 VARCHAR( 256)       NOT NULL DEFAULT ''

,   is_active                   TINYINT UNSIGNED    NOT NULL DEFAULT 1

,	createdOn                   DATETIME 		    DEFAULT CURRENT_TIMESTAMP
,	updatedOn                   DATETIME 			DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

,   PRIMARY KEY (designerTreeItemSettingId)
);
