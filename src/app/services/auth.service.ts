import { UserComponent } from './../user/user.component';

export class AuthService{

    users = [
        {
            id : 1,
            name : 'Simon',
            email : 'simon@gmail.com',
            password : 'dkr'
        },
        {
            id : 2,
            name : 'Samerlipopette',
            email : 'sam@gmail.com',
            password : 'dkr2'
        }
    ];

    LoginAcceptation = false; 
    LoginStatue = false; 
    
    addUser(name: string, email: string, password: string) {
        const UserObject = {
          id: 0,
          name: '',
          email : '',
          password : ''
        };
        UserObject.name = name;
        UserObject.email = email;
        UserObject.id = this.users[(this.users.length - 1)].id + 1;
        UserObject.password = password;
        this.users.push(UserObject);
      }

    logUser(email: string, password: string){
        const UserObject = {
            email : '',
            password : ''
          };

        UserObject.email = email;
        UserObject.password = password;

        for (let user in this.users)
        {
            console.log(this.users);
            console.log(user);

            if(UserObject.email == this.users[user].email && UserObject.password == this.users[user].password){
                
                console.log("CONNECTION GOOD");
                this.LoginAcceptation = true;
                console.log(this.LoginAcceptation); 
                this.LoginStatue = true;
                return this.LoginAcceptation;
                
            } 
            else
            {
                console.log("CONNECTION NOT GOOD");
                this.LoginAcceptation = false; 
                console.log(this.LoginAcceptation);
            }
             
        }
    }

    unlogUser()
    {
        this.LoginStatue = false;
    }
    
    }