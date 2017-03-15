
-- clean-up

DROP PROCEDURE IF EXISTS sp_schema_addcolumn;

-- go

CREATE PROCEDURE sp_schema_addcolumn
(
    IN p_table_name TINYTEXT
,   IN p_field_name TINYTEXT
,   IN p_field_def  TINYTEXT
)
this_proc:BEGIN

    SET @p_db_name := DATABASE();

    IF NOT EXISTS
    (
        SELECT
            *
        FROM
            information_schema.COLUMNS C
        WHERE
            C.column_name  = p_field_name
        AND C.table_name   = p_table_name
        AND C.table_schema = @p_db_name
    )
	THEN
	BEGIN

		SET @ddl = CONCAT
		(
            'ALTER TABLE ', @p_db_name, '.', p_table_name, ' ADD COLUMN ', p_field_name, ' ', p_field_def
        );

		PREPARE stmt FROM @ddl;

		EXECUTE stmt;

    END;
	END IF;

END
