CREATE TABLE IF NOT EXISTS registrations (
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, event_id)
)