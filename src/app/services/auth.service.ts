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
    
    addUser(name: string, email: string, password: string) {
        const appareilObject = {
          id: 0,
          name: '',
          email : '',
          password : ''
        };
        appareilObject.name = name;
        appareilObject.email = email;
        appareilObject.id = this.users[(this.users.length - 1)].id + 1;
        appareilObject.password = password;
        this.users.push(appareilObject);
      }
    
    }