
-- clean-up

DROP PROCEDURE IF EXISTS sp_schema_addindex;

-- GO;

CREATE PROCEDURE sp_schema_addindex
(
    p_table_name    TINYTEXT
,   p_given_columns TINYTEXT
)
this_proc:BEGIN

    SET @index_exists    :=  0;
    SET @given_index     :=  '';
    SET @given_columns2  :=  '';

    SET @p_db_name       := DATABASE();

    SET @given_columns2  := REPLACE( p_given_columns, ', ', '_' );

    SET @given_index     := UPPER( CONCAT( 'idx_', p_table_name, '_', @given_columns2 ) );

    SELECT
        COUNT(1) INTO @index_exists
    FROM
        INFORMATION_SCHEMA.STATISTICS S
    WHERE
        S.table_schema = @p_db_name
    AND S.table_name   = p_table_name
    AND S.index_name   = @given_index;

    IF @index_exists = 0 THEN
    BEGIN

        SET @sqlstmt := CONCAT
        (
            'CREATE INDEX ', @given_index, ' ON ', @p_db_name, '.', p_table_name, ' (',p_given_columns,')'
        );

        PREPARE st FROM @sqlstmt;

        EXECUTE st;

        DEALLOCATE PREPARE st;

    END;
    ELSE
    BEGIN

        SELECT CONCAT( 'Index ', @given_index, ' already exists on Table ', @p_db_name,'.', p_table_name ) CreateindexErrorMessage;

    END;
    END IF;

END