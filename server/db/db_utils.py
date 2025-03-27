import psycopg2
import os
import dotenv
import json
from datetime import datetime, timedelta
from flask import Flask, jsonify, request

def main():
    dotenv.load_dotenv(".env")


def connect():
    try:
        return psycopg2.connect(
            host=os.getenv("DB_HOST"), 
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"), 
            dbname=os.getenv("DB_NAME"), 
            port=os.getenv("DB_PORT")
        )
    except psycopg2.Error as e:
        print("Database error:" + str(e))
        return None


def exec_sql_file(path):
    full_path = os.path.join(os.path.dirname(__file__), f'../../{path}')
    conn = connect()
    cur = conn.cursor()
    with open(full_path, 'r') as file:
        cur.execute(file.read())
    conn.commit()
    if(conn is not None):
        conn.close()


def exec_get_one(sql, args={}):
    conn = connect()
    cur = conn.cursor()
    cur.execute(sql, args)
    one = cur.fetchone()
    if(conn is not None):
        conn.close()
    return one


def exec_get_all(sql, args={}):
    conn = connect()
    cur = conn.cursor()
    cur.execute(sql, args)
    # https://www.psycopg.org/docs/cursor.html#cursor.fetchall

    list_of_tuples = cur.fetchall()
    if(conn is not None):
        conn.close()
    return list_of_tuples

    
def exec_get_many(sql, args={}):
    conn = connect()
    cur = conn.cursor()
    cur.executemany(sql, args)
    list_of_tuples = cur.fetchall()
    if(conn is not None):
        conn.close()
    return list_of_tuples


def exec_commit(sql, args={}):
    conn = connect()
    cur = conn.cursor()
    result = cur.execute(sql, args)
    conn.commit()
    if(conn is not None):
        conn.close()
    return result


def exec_insert_returning(sql, args={}):
    conn = connect()
    cur = conn.cursor()
    cur.execute(sql, args)
    postgresql_returning = cur.fetchone()[0]
    conn.commit()
    conn.close()
    return postgresql_returning

def format_directives(cards):
    formated_directives = {"urgent": [], "high": [], "medium": [], "low": []}
    for card in cards:
        formated_directives[card[2]].append({
            "name": card[0],
            "description": card[1],
            "link": card[3],
            "id": card[4]
        })
    return json.dumps(formated_directives)