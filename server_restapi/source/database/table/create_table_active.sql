
-- test table

CREATE TABLE IF NOT EXISTS active (
    activeId   INT(10) UNSIGNED NOT NULL AUTO_INCREMENT
,   userId     INT(11)          NOT NULL DEFAULT '0'
,   businessId INT(11)          NOT NULL DEFAULT '0'
,   PRIMARY KEY (activeId)
);

-- go

CALL sp_schema_addindex ( 'active', 'userId' );

-- go

CALL sp_schema_addindex ( 'active', 'userId, businessId' );

-- go

CALL sp_schema_addcolumn
(
    'active'
,   'userId'
,   'Int(11) NOT NULL DEFAULT 0 after `activeId`'
);
