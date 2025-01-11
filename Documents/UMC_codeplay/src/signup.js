function createSignupModal() {
    const container = document.createElement('div');
    container.style.cssText = `
      background: white;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
      padding: 40px 30px;
      position: relative;
      font-family: 'Pretendard', sans-serif;
    `;
  
    const closeButton = document.createElement('img');
    closeButton.src = 'images/close_button.svg';
    closeButton.alt = 'Close';
    closeButton.style.cssText = `
      width: 16px;
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
    `;
    closeButton.addEventListener('click', () => container.remove());
    container.appendChild(closeButton);
  
    const title = document.createElement('h2');
    title.textContent = '코드플레이 시작하기';
    title.style.cssText = `
      font-size: 24px;
      font-weight: bold;
      color: #000; /* 검정색 */
      text-align: center;
      margin-bottom: 20px;
    `;
    container.appendChild(title);
  
    const form = document.createElement('form');
    form.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: center;
    `;
  
    // Nickname
    const nicknameLabel = document.createElement('label');
    nicknameLabel.textContent = '닉네임';
    nicknameLabel.style.cssText = `
      width: 100%; 
      max-width: 300px; 
      font-size: 14px; 
      color: #333; 
      text-align: left; 
      margin-bottom: 5px;
    `;
    form.appendChild(nicknameLabel);
  
    const nicknameInput = document.createElement('input');
    nicknameInput.type = 'text';
    nicknameInput.placeholder = '사용하실 닉네임을 입력해주세요.';
    nicknameInput.style.cssText = `
      width: calc(100% - 40px);
      max-width: 300px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 25px;
      font-size: 14px;
    `;
    form.appendChild(nicknameInput);
  
    // Email
    const emailLabel = document.createElement('label');
    emailLabel.textContent = '이메일';
    emailLabel.style.cssText = nicknameLabel.style.cssText;
    form.appendChild(emailLabel);
  
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = '이메일을 입력해주세요.';
    emailInput.style.cssText = nicknameInput.style.cssText;
    form.appendChild(emailInput);
  
    // Password
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = '비밀번호';
    passwordLabel.style.cssText = nicknameLabel.style.cssText;
    form.appendChild(passwordLabel);
  
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = '비밀번호를 입력해주세요.';
    passwordInput.style.cssText = nicknameInput.style.cssText;
    form.appendChild(passwordInput);
  
    // Confirm Password
    const confirmPasswordLabel = document.createElement('label');
    confirmPasswordLabel.textContent = '비밀번호 확인';
    confirmPasswordLabel.style.cssText = nicknameLabel.style.cssText;
    form.appendChild(confirmPasswordLabel);
  
    const confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.type = 'password';
    confirmPasswordInput.placeholder = '비밀번호를 다시 입력해주세요.';
    confirmPasswordInput.style.cssText = nicknameInput.style.cssText;
    form.appendChild(confirmPasswordInput);
  
    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = '회원가입';
    submitButton.style.cssText = `
      width: calc(100% - 40px);
      max-width: 300px;
      padding: 15px;
      background: #6a4cb3;
      color: white;
      border: none;
      border-radius: 25px;
      font-size: 14px;
      cursor: pointer;
    `;
    form.appendChild(submitButton);
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('회원가입 성공!');
    });
  
    container.appendChild(form);
  
    const footer = document.createElement('div');
    footer.style.cssText = `
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #666;
    `;
  
    const footerText = document.createElement('span');
    footerText.textContent = '이미 계정이 있으신가요? ';
    footer.appendChild(footerText);
  
    const loginLink = document.createElement('a');
    loginLink.href = '#';
    loginLink.textContent = 'Log In';
    loginLink.style.cssText = 'color: #6a4cb3; text-decoration: none;';
    footer.appendChild(loginLink);
  
    container.appendChild(footer);
  
    document.body.style.cssText = `
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(to bottom, #f3f4f8, #eaecee);
    `;
    document.body.appendChild(container);
  }
  
  createSignupModal();
  