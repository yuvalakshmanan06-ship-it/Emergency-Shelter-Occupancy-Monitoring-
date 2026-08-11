from database.db import get_db_connection


def create_notification(user_id, message):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO notifications (user_id, message)
        VALUES (?, ?)
    """, (user_id, message))

    conn.commit()
    conn.close()


def get_notifications(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM notifications
        WHERE user_id = ?
        ORDER BY id DESC
    """, (user_id,))

    notifications = cursor.fetchall()

    conn.close()

    return notifications