from database.db import get_db_connection


def create_shelter(name, location, capacity):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO shelters (name, location, capacity, occupied, status)
        VALUES (?, ?, ?, 0, 'Available')
    """, (name, location, capacity))

    conn.commit()
    conn.close()


def get_all_shelters():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM shelters")

    shelters = cursor.fetchall()

    conn.close()

    return shelters


def update_occupancy(shelter_id, occupied):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE shelters
        SET occupied = ?
        WHERE id = ?
    """, (occupied, shelter_id))

    conn.commit()
    conn.close()