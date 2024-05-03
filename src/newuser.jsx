import React, { useState } from 'react';
import './newuser.css';

function NewUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const addUser = async () => {
    const userName = username.trim();
    const passwordValue = password.trim();
    const emailValue = email.trim();

    if (userName && passwordValue && emailValue) {
      try {
        const response = await fetch(`/api/users/createUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 0, 
            userName,
            password: passwordValue,
            email: emailValue,
          }),
        });
        if (response.ok) {
          setSuccessMessage('用戶創建成功！');
        } else {
          setSuccessMessage('用戶創建失敗');
        }
      } catch (error) {
        console.error('Error adding user:', error);
        setSuccessMessage('用戶創建失敗');
      }
    }
  };

  const BackToLoginPage = () => {
    window.location.href = `http://localhost:8080/login.html`;
  };

  return (
    <>
      <div className='center-container'>
        <div className='login-container'>
          <form id='login-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='username'>用戶名</label>
              <input
                type='text'
                id='username'
                placeholder='輸入您的帳號名稱'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>密碼</label>
              <input
                type='password'
                id='password'
                placeholder='輸入您的密碼'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                id='email'
                placeholder='輸入您的Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type='button' onClick={addUser}>
              創建用戶
            </button>
            <button type='button' onClick={BackToLoginPage}>
              回登入頁面
            </button>
            {successMessage && <p>{successMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default NewUser;
