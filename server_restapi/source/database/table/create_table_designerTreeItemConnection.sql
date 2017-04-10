
--

CREATE TABLE IF NOT EXISTS designerTreeItemConnection (

    designerTreeItemConnectionId    BIGINT              NOT NULL AUTO_INCREMENT UNIQUE

,   designerTreeId                  BIGINT              NOT NULL DEFAULT 0
,   businessId                      BIGINT              NOT NULL DEFAULT 0
,   idx                             SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   src_terminal_idx                SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   dst_terminal_idx                SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   selected                        TINYINT UNSIGNED    NOT NULL DEFAULT 0
,   src_cx                          SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   src_cy                          SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   src_ct                          SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   dst_cx                          SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   dst_cy                          SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   dst_ct                          SMALLINT UNSIGNED   NOT NULL DEFAULT 0
,   path                            VARCHAR( 256)       NOT NULL DEFAULT ''

,   is_active                       TINYINT UNSIGNED    NOT NULL DEFAULT 1

,	createdOn                       DATETIME 		    DEFAULT CURRENT_TIMESTAMP
,	updatedOn                       DATETIME 			DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

,   PRIMARY KEY (designerTreeItemConnectionId)
);
