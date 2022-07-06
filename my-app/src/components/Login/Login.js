import React from 'react'



import './Login.css'
import logo from '../../img/logo.PNG'



const Login = () => {
  return (

    <div>

    <div className='login-right'>

        <form>
         <div className='login-logo'>
            <img src={logo} alt='logo'/>
         </div>   

         <div className='login-form'>

         <input type="text" placeholder="نام کاربری" name="uname"  required />

         <input type="password" placeholder="کلمه عبور" name="psw" required/>

         <div className="login-psw"><a href='#'>فراموشی رمز عبور</a></div>

          <button type="submit">
            ورود
          </button>
         </div>
        </form>
        </div>

        


         <div className='login-left'>
    <div className='login-welcome'>
        <h3>به سامانه نگارحامی بیمه خوش آمدید</h3>
    </div>
    
    <div className='login-intro'>
        <h3>ارایه دهنده خدمات</h3>
    </div>
    
    <div className='login-list'>
        <ul className='login-list-ul'>
            <li style={{marginLeft:'-96px'}}>شارژ حساب و مشاهده صورت حساب  ✓</li> 

            <li style={{marginLeft:'10px'}} >مدیریت کاربران ✓</li> 
            
            <li style={{marginLeft:'-56px'}}>مشاهده طرح ها و عقد قرارداد ✓</li>

            <li style={{marginLeft:'-16px'}}>ارسال و دریافت تیکت ✓</li>
        </ul>
    </div>

    <div className='login-second-intro'>
        <h3>می باشد</h3>
    </div>

    <div className='login-footer'>
    <p>تمامی حقوق برای شرکت سامانه نگار حامی بیمه محفوظ می باشد</p>
 </div>
 </div>

    </div>
  )
}

export default Login