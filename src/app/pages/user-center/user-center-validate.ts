import { AbstractControl } from'@angular/forms';

export class UserCenterValidate{
    static IsSamePassword(){
        return (control:AbstractControl)=>{
            const confirmpassword = control.value;
            let password = '';
            let form = control.parent;
            if(form && form.controls && form.controls['password']){
                password =  form.controls['password'].value;
            }
            if(confirmpassword != password){
                return {
                    'IsSameForPassword':{
                        hasError:true,
                        message:'两次输入的密码不一致'
                    }
                }
            }else{
                return null;
            }
        }
    }
}