import React from 'react'
import "./UserManagement.css"
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [check, setCheck] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:8000/user')
            .then((response) => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const handleBlock = (i) => {
        let newUsers = [...users];
        newUsers[i].manage = false;
        axios.patch(`http://localhost:8000/user/${newUsers[i].id}`, { manage: false })
            .then(response => {
                console.log(response.data);
                setCheck(!check);
            })
            .catch(error => {
                console.error(error);
            });
    };
    const handleUnlock = (i) => {
        let newUsers = [...users];
        newUsers[i].manage = true;
        axios.patch(`http://localhost:8000/user/${newUsers[i].id}`, { manage: true })
            .then(response => {
                console.log(response.data);
                setCheck(!check);
            })
            .catch(error => {
                console.error(error);
            });
    }
    let displayedIndex = 1;
    return (
        <div className='userManagement'>
            <h2>Quản lý người dùng</h2>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tài khoản đăng nhập</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Quốc tịch</th>
                        <th>Ngày sinh</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((e, i) =>
                    (
                        users[i].manage &&
                        <tr key={i} >
                            <td>{displayedIndex++}</td>
                            <td>{e.username}</td>
                            <td>{e.fullname}</td>
                            <td>{e.email}</td>
                            <td>{e.nationality}</td>
                            <td>{e.birthday}</td>
                            <td>
                                <button className='btn_lock' onClick={() => handleBlock(i)}>Chặn</button>
                            </td>
                        </tr>
                    ))}
                    {users.map((e, i) => (
                        !users[i].manage &&
                        <tr key={i} >
                            <td>{displayedIndex++}</td>
                            <td>{e.username}</td>
                            <td>{e.fullname}</td>
                            <td>{e.email}</td>
                            <td>{e.nationality}</td>
                            <td>{e.birthday}</td>
                            <td>
                                <button className='btn_open' onClick={() => handleUnlock(i)}>Bỏ chặn</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserManagement