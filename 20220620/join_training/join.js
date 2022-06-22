

idTest = new RegExp(/[^a-z0-9]/g)
passwordTest = new RegExp(/(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]/)
nameTest = new RegExp(/[^가-힣]/g)
numTest = new RegExp(/[^0-9]/g)
emailTest = new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
let link = 'https://naver.com'


let a
finishBtn.onclick = function () {
    _id = inputId.value
    _password = inputPassword.value
    _passwordRe = inputPasswordRe.value
    _name = inputName.value
    _num1 = inputNum1.value
    _num2 = inputNum2.value
    _num3 = inputNum3.value
    _email = inputEmail.value
    let count = 0

    if (_id.length == 0) {

        idWarn.innerHTML = "입력하세요."
    }
    else {
        idWarn.innerHTML = ""
        if (idTest.test(_id)) {

            idWarn.innerHTML = "영소문자 혹은 숫자만 쓰세요."
        }
        else {
            if (_id.length < 4 || _id.length > 16) {

                idWarn.innerHTML = "4~16자로 쓰세요."
            }
            else {
                count++
            }
        }
    }



    //패스워드
    if (_password.length == 0) {

        passwordWarn.innerHTML = "입력하세요."
    }
    else {
        if (passwordTest.test(_password)) {
            if (_password.length < 8 || _password.length > 16) {

                passwordWarn.innerHTML = "Password를 8~16자 사이로 쓰세요."
            }
            else {
                passwordWarn.innerHTML = ""
                count++
            }
        }
        else {

            passwordWarn.innerHTML = "Password형식이 틀렸습니다."
        }
    }

    //패스워드 확인
    if (_passwordRe.length == 0) {

        passwordConfirmWarn.innerHTML = "입력하세요."
    }
    else {
        if (!(_password == _passwordRe)) {

            passwordConfirmWarn.innerHTML = "비밀번호랑 같게 쓰세요."
        }
        else {
            passwordConfirmWarn.innerHTML = ""
            count++
        }
    }

    //이름
    if (_name.length == 0) {

        nameWarn.innerHTML = "입력하세요."
    }
    else {
        if (nameTest.test(_name)) {

            nameWarn.innerHTML = "한글 글자만 넣어주세요."
        }
        else {
            nameWarn.innerHTML = ""
            count++
        }
    }

    //번호
    if (_num2.length == 0 || _num3.length == 0) {

        mobileWarn.innerHTML = "빠짐없이 입력해주세요."
    }
    else {
        mobileWarn.innerHTML = ""
        if ((numTest.test(_num2)) || (numTest.test(_num3))) {

            mobileWarn.innerHTML = "숫자만 입력하세요."
        }
        else {
            if (_num2.length < 3 || _num2.length > 4) {

                mobileWarn.innerHTML += " 2번째칸 3~4자리수로 넣으세요."
            }
            else {
                count++
            }
            if (!(_num3.length == 4)) {

                mobileWarn.innerHTML += " 3번째칸 4자리수로 넣으세요."
            }
            else {
                count++
            }
        }
    }

    //이메일
    if (_email.length == 0) {

        emailWarn.innerHTML = "입력하세요."

    }
    else {
        emailTest.innerHTML = ""
        if (emailTest.test(_email)) {
            emailWarn.innerHTML = ""

            count++
        }
        else {
            emailWarn.innerHTML = "이메일 형식이 틀렸습니다."

        }
    }

    //회원가입 성공
    if (count == 7) {
        alert("회원가입 성공")
        location.replace(link)
    }
}






