/* eslint-disable @typescript-eslint/comma-dangle */
import { openDb } from '../database';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export function getUserById(id: number): Promise<User | undefined> {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.get<User>('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function updateUser(id: number, username: string, email: string, phone: string): Promise<void> {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?',
      [username, email, phone, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}
