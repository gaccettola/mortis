
--

CREATE TABLE IF NOT EXISTS designerTreeItem (

    designerTreeItemId  BIGINT              NOT NULL AUTO_INCREMENT UNIQUE

,   designerTreeId      BIGINT              NOT NULL DEFAULT 0
,   businessId          BIGINT              NOT NULL DEFAULT 0

,   idx                 SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   fill                VARCHAR( 256)       NOT NULL DEFAULT ''
,   radius              SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   cx                  SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   cy                  SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   selected            TINYINT UNSIGNED    NOT NULL DEFAULT 0
,   min_height          SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   height              SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   width               SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   is_primary          TINYINT UNSIGNED    NOT NULL DEFAULT 0
,   message_text        VARCHAR( 256)       NOT NULL DEFAULT ''

,   is_active           TINYINT UNSIGNED    NOT NULL DEFAULT 1

,	createdOn           DATETIME 		    DEFAULT CURRENT_TIMESTAMP
,	updatedOn           DATETIME 			DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

,   PRIMARY KEY (designerTreeItemId)
);

