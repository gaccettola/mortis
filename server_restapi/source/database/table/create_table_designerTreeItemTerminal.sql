
--

CREATE TABLE IF NOT EXISTS designerTreeItemTerminal (

    designerTreeItemTerminalId  BIGINT              NOT NULL AUTO_INCREMENT UNIQUE

,   businessId                  BIGINT              NOT NULL DEFAULT 0

,   designerTreeItemId          BIGINT              NOT NULL DEFAULT 0

    -- 0 Input 1 Ouput
,   terminalType                TINYINT UNSIGNED    NOT NULL DEFAULT 0

,   idx                         SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   label                       VARCHAR( 256)       NOT NULL DEFAULT ''
,   radius                      TINYINT UNSIGNED    NOT NULL DEFAULT 0
,   cx                          SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   cy                          SMALLINT UNSIGNED   NOT NULL DEFAULT 0

,   is_active                   TINYINT UNSIGNED    NOT NULL DEFAULT 1

,	createdOn                   DATETIME 		    DEFAULT CURRENT_TIMESTAMP
,	updatedOn                   DATETIME 			DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

,   PRIMARY KEY (designerTreeItemTerminalId)
);
