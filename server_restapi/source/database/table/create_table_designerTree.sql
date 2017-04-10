
--

CREATE TABLE IF NOT EXISTS designerTree (

    designerTreeId      BIGINT              NOT NULL AUTO_INCREMENT UNIQUE

,   businessId          BIGINT              NOT NULL DEFAULT 0
,   designerTreeName    VARCHAR( 256)       NOT NULL DEFAULT ""
,   designerTreeDesc    VARCHAR( 256)       NOT NULL DEFAULT ""

,   is_active           TINYINT UNSIGNED    NOT NULL DEFAULT 1

,	createdOn           DATETIME 		    DEFAULT CURRENT_TIMESTAMP
,	updatedOn           DATETIME 			DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

,   PRIMARY KEY (designerTreeId)
);
