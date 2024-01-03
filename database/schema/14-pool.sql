CREATE TABLE pool
(
    id                           INTEGER   NOT NULL PRIMARY KEY,
    name                         TEXT      NOT NULL UNIQUE,
    runtime                      TEXT      NOT NULL,
    logo                         TEXT      NOT NULL,
    config                       TEXT      NOT NULL,
    start_key                    TEXT      NOT NULL,
    current_key                  TEXT      NOT NULL,
    current_summary              TEXT      NOT NULL,
    current_index                TEXT      NOT NULL,
    total_bundles                TEXT      NOT NULL,
    upload_interval              TEXT      NOT NULL,
    inflation_share_weight       TEXT      NOT NULL,
    min_delegation               TEXT      NOT NULL,
    max_bundle_size              TEXT      NOT NULL,
    disabled                     BOOLEAN   NOT NULL,
    protocol                     JSONB     NOT NULL,
    upgrade_plan                 JSONB     NOT NULL,
    current_storage_provider_id  TEXT      NOT NULL,
    current_compression_id       TEXT      NOT NULL,
    height                       BIGINT    NOT NULL
);