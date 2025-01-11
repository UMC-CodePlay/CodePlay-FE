function createLoginModal() {
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

  const header = document.createElement('div');
header.style.cssText = `
  display: flex;
  flex-direction: row; /* 가로 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 전체 가운데 정렬 */
  margin-bottom: 20px;
  gap: 10px; /* 로고와 텍스트 간격 */
`;

const logo = document.createElement('img');
logo.src = 'images/Codeplay_logo.svg';
logo.alt = 'Codeplay Logo';
logo.style.cssText = `
  width: 50px;
`;
header.appendChild(logo);

const codeplayText = document.createElement('span');
codeplayText.textContent = 'CODEPLAY';
codeplayText.style.cssText = `
  font-size: 24px;
  font-weight: bold;
  color: #4c358a;
`;
header.appendChild(codeplayText);

  container.appendChild(header);

  const title = document.createElement('h2');
  title.textContent = 'LOG IN';
  title.style.cssText = `
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-align: left; /* 왼쪽 정렬 */
    margin-bottom: 25px;
    padding-left: 20px; /* 입력창 시작 부분과 일치 */
  `;
  container.appendChild(title);

  const form = document.createElement('form');
  form.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center; /* 입력창과 버튼 가운데 정렬 */
  `;

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = '이메일을 입력해주세요.';
  emailInput.style.cssText = `
    width: calc(100% - 40px);
    max-width: 300px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 25px;
    font-size: 14px;
  `;
  form.appendChild(emailInput);

  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.placeholder = '비밀번호를 입력해주세요.';
  passwordInput.style.cssText = emailInput.style.cssText;
  form.appendChild(passwordInput);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = '로그인';
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
    alert('로그인 성공!');
  });

  container.appendChild(form);

  const socialLogin = document.createElement('div');
  socialLogin.style.cssText = `
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  `;

  const googleLogin = document.createElement('img');
  googleLogin.src = 'images/login_google.svg';
  googleLogin.alt = 'Google Login';
  googleLogin.style.cssText = 'width: 40px; height: 40px; cursor: pointer;';
  socialLogin.appendChild(googleLogin);

  const kakaoLogin = document.createElement('img');
  kakaoLogin.src = 'images/login_kakaotalk.svg';
  kakaoLogin.alt = 'Kakao Login';
  kakaoLogin.style.cssText = 'width: 40px; height: 40px; cursor: pointer;';
  socialLogin.appendChild(kakaoLogin);

  container.appendChild(socialLogin);

  const footer = document.createElement('div');
  footer.style.cssText = `
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    color: #666;
  `;

  const footerText = document.createElement('span');
  footerText.textContent = '아직 회원이 아니신가요? ';
  footer.appendChild(footerText);

  const signUpLink = document.createElement('a');
  signUpLink.href = '#';
  signUpLink.textContent = 'Sign Up';
  signUpLink.style.cssText = 'color: #6a4cb3; text-decoration: none;';
  footer.appendChild(signUpLink);

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

createLoginModal();
